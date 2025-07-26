'use client'

import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    // 미들웨어에서 리디렉션을 처리하므로 여기는 실행되지 않을 것임
    return null
  }

  return <>{children}</>
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminAuthGuard>
        {children}
      </AdminAuthGuard>
    </SessionProvider>
  )
}