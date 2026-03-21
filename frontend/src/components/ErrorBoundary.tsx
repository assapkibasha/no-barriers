'use client'

import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl max-w-md w-full">
            <h1 className="text-2xl font-black text-red-600 mb-2">Something went wrong</h1>
            <p className="text-sm font-medium text-gray-500 mb-6 line-clamp-3">
              {this.state.error?.message || "An unexpected application error occurred."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full rounded-2xl bg-teal-600 px-6 py-3.5 text-sm font-extrabold uppercase text-white hover:bg-teal-700 transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
