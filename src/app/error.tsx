"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Something Went Wrong
        </h1>
        <p className="text-gray-500 mb-6">
          An unexpected error occurred. Our team has been notified.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-600 mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        <NeonButton onClick={reset}>
          <RefreshCw className="h-4 w-4" />
          Try Again
        </NeonButton>
      </motion.div>
    </div>
  );
}
