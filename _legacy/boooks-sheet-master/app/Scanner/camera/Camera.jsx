// import useTFJS from "./useTFJS";
// const { tfReady } = useTFJS(cameraRef, isActive);

// import OverlayCanvas from "./OverlayCanvas";
// import { useMLCoordinator } from "../ml/useMLCoordinator";
// import { useRef } from "react";

// // inside component:
// const overlayRef = useRef(null);

// const { mlState, captureHighRes } = useMLCoordinator({
//   videoRef: cameraRef,
//   overlayRef,
//   enabled: isActive, // only after video is live
// });


// import { runScanPipeline } from "../pipeline/scanPipeline";
// import { createLocalIndex } from "../identity/index/localIndex";

// // you’ll keep these somewhere global/store:
// const localIndex = createLocalIndex();

// async function onShutter() {
//   const parts = /* get from ML coordinator state: spine/front/back quads */;
//   const result = await runScanPipeline({
//     videoEl: cameraRef.current,
//     parts,
//     localIndex,
//     draftsStore: yourDraftStore,
//     verifiedStore: yourVerifiedStore,
//     opts: {
//       spineSize: { w: 512, h: 1024 },
//       coverSize: { w: 1024, h: 1024 },
//     },
//   });

//   console.log(result);
// }



const tfReady = true;

import { useEffect, useRef, useState } from "react";

import Header from "../ui/Header";
import Status from "../ui/Status";
import ScannedView from './../ui/ScannedView'

import UploadFile from "../ui/UploadFile";
import Torch from "../ui/Torch";

const TEACHING_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const STORAGE_KEY = "camera_permission_granted";
const SEEN_CAMERA_KEY = "camera_has_opened_once";

// ⚠️ DO NOT TOUCH — battle-tested camera overlay

export default function Camera({ onClose }) {
  const cameraRef = useRef(null);

  // 1. Load initial state from LocalStorage
  const [permission, setPermission] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === "true" ? "requesting" : "idle";
  });

  const showTeachingVideo =
    permission !== "granted" &&
    localStorage.getItem(SEEN_CAMERA_KEY) !== "true";

  const [stream, setStream] = useState(null);
  const [isActive, setIsActive] = useState(false); // Controls the Scale/Fade animation
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  /* THIS useEffect is for dbug only! - when no phone nor camera */
  useEffect(() => {
    setIsActive(true);
    setIsOpen(true);
  }, []);

  // 2. The Core Request Logic
  async function requestCamera() {
    try {
      setPermission("requesting");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });

      setStream(mediaStream);
      setPermission("granted");
      localStorage.setItem(STORAGE_KEY, "true"); // Save for next visit
    } catch (err) {
      console.error("Camera error:", err);
      setPermission("denied");
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // 3. Auto-trigger if already saved
  useEffect(() => {
    if (permission === "requesting" && !stream) {
      requestCamera();
    }
  }, []);

  // 4. Sync Stream to Video Element (Fixes Black Screen)
  useEffect(() => {
    const video = cameraRef.current;
    if (stream && video) {
      video.srcObject = stream;

      // When the video actually starts pumping frames, trigger the animation
      video.onloadedmetadata = () => {
        video.play().then(() => {
          // Delaying the "active" state slightly ensures the first frame is ready
          setTimeout(() => setIsActive(true), 100);
        });
      };
    }
  }, [stream]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  }, []);

  useEffect(() => {
    if (isActive) {
      localStorage.setItem(SEEN_CAMERA_KEY, "true");
    }
  }, [isActive]);

  function handleClose() {
    if (isClosing) return;
    setIsClosing(true);

    setIsOpen(false);
    setTimeout(onClose, 350);
  }

  return (
    <div style={containerStyle}>
      <div style={openAnimationStyle(isOpen)}>
        {/* <OverlayCanvas
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9,
          }}
          ref={overlayRef}
        /> */}
        
        <Header handleClose={handleClose} />
        {/* BACKGROUND / TUTORIAL */}
        {showTeachingVideo && (
          <video
            src={TEACHING_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            style={fullScreenStyle}
          />
        )}

        {/* ACTUAL CAMERA FEED */}
        <video
          ref={cameraRef}
          autoPlay
          playsInline
          muted
          style={{
            ...fullScreenStyle,
            opacity: isActive ? 1 : 0,
            transform: isActive ? "scale(1)" : "scale(0.95)",
            transition:
              "opacity 0.6s ease-out, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
            background: "black",
          }}
        />

        {/* <Torch /> */}
        {/* <UploadFile /> */}

        <ScannedView/>

        <Status tfReady={tfReady} />

{/* Move this to enable btn! */}
        {/* UI: CTA BUTTON (Only if idle/denied) */}
        {(permission === "idle" || permission === "denied") && (
          <div style={centerUIStyle}>
            <button
              onClick={requestCamera}
              style={primaryBtnStyle}
              className="shadow-lg active:scale-90 transition-transform"
            >
              {permission === "denied" ? "Try Again" : "Allow camera"}
            </button>
            {permission === "denied" && (
              <p style={errorTextStyle}>Camera access blocked.</p>
            )}
          </div>
        )}

{/* Move this to enable snapBtn! */}
        {/* UI: SHUTTER (Only when active) */}
        {isActive && (
          <div style={bottomBarStyle}>
            <button
              style={shutterBtnStyle}
              onClick={() => console.log("Capture!")}
              className="shadow-lg active:scale-90 transition-transform"
            >
              <div style={shutterInnerStyle} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** STYLES **/
const containerStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background: "none",
  overflow: "hidden",
  fontFamily: "sans-serif",
  transform: "translateZ(0)",
};
const fullScreenStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
const topBarStyle = {
  position: "absolute",
  top: 0,
  width: "100%",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 10,
};
const centerUIStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  zIndex: 10,
};
const bottomBarStyle = {
  position: "absolute",
  bottom: 150,
  right: 30,
  // width: "100%",
  // display: "flex",
  // justifyContent: "center",
  zIndex: 10,
};

const primaryBtnStyle = {
  padding: "12px 24px",
  background: "rgba(0,0,0,.7)",
  color: "#fff",
  border: "2px solid #fff",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  cursor: "pointer",
};
const iconBtnStyle = {
  background: "rgba(0,0,0,0.4)",
  color: "white",
  border: "none",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  fontSize: "20px",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
};
const shutterBtnStyle = {
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  border: "4px solid #D91B24",
  background: "transparent",
  padding: "4px",
  cursor: "pointer",
};
const shutterInnerStyle = {
  width: "100%",
  height: "100%",
  // background: "white",
  borderRadius: "50%",
};
const errorTextStyle = {
  color: "white",
  marginTop: "12px",
  fontSize: "14px",
  opacity: 0.8,
};
const openAnimationStyle = (open) => ({
  position: "absolute",
  inset: 0,
  transform: open ? "scale(1)" : "scale(0.95)",
  opacity: open ? 1 : 0,
  pointerEvents: open ? "auto" : "none", // 🔑
  transition:
    "transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 350ms ease-out",
});

const statusDotStyle = (perm) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background:
    perm === "granted"
      ? "#4CAF50"
      : perm === "requesting"
      ? "#FFC107"
      : "#F44336",
  boxShadow: `0 0 10px ${perm === "granted" ? "#4CAF50" : "#FFC107"}`,
});
