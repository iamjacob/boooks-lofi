"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthorPanel from "../../../components/AuthorPanel";
import AuthorView from "../../../components/AuthorView";

export default function AuthorOverlayPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function close() {
    setVisible(false);
    setTimeout(() => router.back(), 400);
  }

  return (
    <AuthorPanel isVisible={visible} onClose={close}>
      <AuthorView />
    </AuthorPanel>
  );
}
