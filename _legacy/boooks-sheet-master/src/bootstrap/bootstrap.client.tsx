"use client";

import { useEffect } from "react";
import { bootstrapFromIDB, attachPersistence } from "@data/sync";

export function BootstrapClient() {
  useEffect(() => {
    bootstrapFromIDB();
    const detach = attachPersistence();
    return detach;
  }, []);

  return null;
}
