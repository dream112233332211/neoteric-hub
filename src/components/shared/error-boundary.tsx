"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    // In production, send to monitoring service
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              An unexpected error occurred. Our team has been notified and is
              working on a fix.
            </p>
            {this.state.error && (
              <pre className="mb-6 rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-gray-500 text-left overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <NeonButton onClick={this.handleReset} variant="outline">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </NeonButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
