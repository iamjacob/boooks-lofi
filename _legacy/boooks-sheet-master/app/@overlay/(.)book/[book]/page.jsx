"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import BookDetailsPanel from "../../../components/BookDetailsPanel";
import BookView from "../../../components/BookView";

export default function BookOverlayPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  // 👇 THIS is the key
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      requestAnimationFrame(() => setVisible(true));
    } else {
      // already animated → just show instantly
      setVisible(true);
    }
  }, []);

  function close() {
    setVisible(false);
    setTimeout(() => router.back(), 400);
  }

  return (
    <BookDetailsPanel isVisible={visible} onClose={close}>
      <BookView />
    </BookDetailsPanel>
  );
}

