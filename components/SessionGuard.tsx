"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "portfolio_access";
const PUBLIC_PATHS = ["/gate"];

export default function SessionGuard({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  const pathname = usePathname();
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (isAdmin || PUBLIC_PATHS.includes(pathname)) {
      setGranted(true);
      return;
    }

    // Token was just redeemed — store in sessionStorage and clean the URL
    const params = new URLSearchParams(window.location.search);
    if (params.get("_access") === "1") {
      sessionStorage.setItem(STORAGE_KEY, "granted");
      params.delete("_access");
      const clean = window.location.pathname + (params.size ? "?" + params : "");
      window.history.replaceState({}, "", clean);
      setGranted(true);
      return;
    }

    if (sessionStorage.getItem(STORAGE_KEY) === "granted") {
      setGranted(true);
    } else {
      window.location.replace("/gate");
    }
  }, [isAdmin, pathname]);

  // Render nothing until auth is confirmed — prevents any content flash
  if (!granted) return null;
  return <>{children}</>;
}
