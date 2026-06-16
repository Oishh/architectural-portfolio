"use client";

import { useEffect } from "react";
import { clearViewerSession } from "@/app/actions";

export default function SessionEvictor({ isAdmin }: { isAdmin: boolean }) {
  useEffect(() => {
    if (!isAdmin) clearViewerSession();
  }, [isAdmin]);

  return null;
}
