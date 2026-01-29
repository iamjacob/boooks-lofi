"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookDetailsPanel from "../../components/BookDetailsPanel";

export default function BookRoutePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Slide IN on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  function handleClose() {
    setIsVisible(false);

    // wait for animation → go back
    setTimeout(() => {
      router.back();
    }, 400);
  }

  return (
    <BookDetailsPanel
      isVisible={isVisible}
      onClose={handleClose}
    />
  );
}
