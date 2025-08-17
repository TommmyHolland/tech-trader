'use client'

import Link from 'next/link'
import { Smartphone, Settings, Warehouse, User, LogOut, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const { user, signOut, isAdmin, isWarehouse } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-900">Tech Trader</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{user.full_name}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                      {user.role}
                    </span>
                  </div>
                  <Link
                    href="/user"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    User Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {isWarehouse && (
                    <Link
                      href="/warehouse"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Warehouse Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            The Ultimate Platform for
            <span className="text-blue-600"> Tech Trading</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Assess, repair, and trade electronic devices with confidence. Our comprehensive platform 
            provides real-time pricing, parts sourcing, and professional tools for tech enthusiasts and businesses.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {/* User Dashboard */}
          <Link href={user ? "/user" : "/login"} className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">User Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Assess device values, calculate repair costs, and find the best parts for your projects.
              </p>
              <div className="text-blue-600 font-medium group-hover:text-blue-700">
                {user ? 'Access Dashboard →' : 'Get Started →'}
              </div>
            </div>
          </Link>

          {/* Admin Dashboard */}
          <Link href={isAdmin ? "/admin" : "#"} className={`group ${!isAdmin ? 'pointer-events-none opacity-50' : ''}`}>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Settings className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Admin Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Manage pricing, add new parts, and update device resale values in real-time.
              </p>
              <div className="text-green-600 font-medium group-hover:text-green-700">
                {isAdmin ? 'Manage System →' : 'Admin Access Only'}
              </div>
            </div>
          </Link>

          {/* Warehouse Dashboard */}
          <Link href={isWarehouse ? "/warehouse" : "#"} className={`group ${!isWarehouse ? 'pointer-events-none opacity-50' : ''}`}>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Warehouse className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Warehouse Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Process orders, manage inventory, and ship parts efficiently to customers.
              </p>
              <div className="text-purple-600 font-medium group-hover:text-purple-700">
                {isWarehouse ? 'Process Orders →' : 'Warehouse Access Only'}
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Tech Trader?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">$</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Pricing</h3>
              <p className="text-gray-600">Get instant device valuations and parts pricing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Quotes</h3>
              <p className="text-gray-600">Calculate repair costs and profit margins instantly</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">📦</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Parts</h3>
              <p className="text-gray-600">Choose from budget, premium, or refurbished options</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Efficient warehouse processing and delivery</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {!user && (
          <div className="mt-20 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Ready to Start Trading Tech?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of users who are already making smart tech trading decisions with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/login"
                  className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
