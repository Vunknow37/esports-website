"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
      <Toaster richColors position="top-right" theme="dark" closeButton />
    </SessionProvider>
  );
}
