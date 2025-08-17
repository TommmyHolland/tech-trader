'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin' | 'warehouse'
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading, isAdmin, isWarehouse } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole) {
        let hasAccess = false
        
        switch (requiredRole) {
          case 'admin':
            hasAccess = isAdmin
            break
          case 'warehouse':
            hasAccess = isWarehouse
            break
          case 'user':
            hasAccess = true // Any authenticated user
            break
        }

        if (!hasAccess) {
          router.push('/')
          return
        }
      }
    }
  }, [user, loading, requiredRole, redirectTo, router, isAdmin, isWarehouse])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole) {
    let hasAccess = false
    
    switch (requiredRole) {
      case 'admin':
        hasAccess = isAdmin
        break
      case 'warehouse':
        hasAccess = isWarehouse
        break
      case 'user':
        hasAccess = true
        break
    }

    if (!hasAccess) {
      return null
    }
  }

  return <>{children}</>
}
