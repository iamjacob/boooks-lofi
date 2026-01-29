"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthorPanel from "../../components/AuthorPanel";

export default function AuthorRoutePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => router.back(), 400);
  }

  return (
    <AuthorPanel
      isVisible={isVisible}
      onClose={handleClose}
    />
  );
}
