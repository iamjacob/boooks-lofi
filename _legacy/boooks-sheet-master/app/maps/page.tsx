"use client";
import { useState, useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { StoryMap } from "./story-map";
import Header from "./../components/nav/Header";
import Menu from "./../components/nav/menu/Menu";
import AuthDialog from "../components/auth/AuthDialog";
import LocationPrompt from "./ui/LocationPrompt";
import Tornadoes from "./components/Tornadoes";

const Maplibre = () => {
  useEffect(() => {
    const splash = document.getElementById("splash");

    if (splash) {
      splash.classList.add("fade-out");
      setTimeout(() => splash.remove(), 800);
    }
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  // Open function
  const openLogin = () => setIsAuthOpen(true);
  // Close function
  const closeLogin = () => setIsAuthOpen(false);

  //Login
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <div className="w-screen h-screen touch-auto absolute top-0 right-0">
        <Header
          onMenuToggle={() => setMenuOpen((v) => !v)}
          backBtn
          // onAppsToggle={toggleApps}
        />

        <Menu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onOpenLogin={openLogin}
        />

        {/* backdrop */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-[1002]"
            aria-hidden="true"
          />
        )}

        {isAuthOpen && <AuthDialog initialView="login" onClose={closeLogin} />}

        <StoryMap
          //start position == users town++
          latitude={55.707813}
          longitude={9.55368}
          zoom={16}
          pitch={54}
          bearing={-16}
          canvas={{ gl: { logarithmicDepthBuffer: true, antialias: true } }}
          // canvas={{ frameloop: 'demand' }}
        >
          {/* <Character /> */}

          {/* fix light! */}
          <hemisphereLight
            args={["#ffffff", "#60666C"]}
            position={[1, 4.5, 3]}
            intensity={Math.PI}
          />

          <Tornadoes />
        </StoryMap>

        <LocationPrompt />
      </div>
    </>
  );
};

export default Maplibre;
