'use client'

import Link from 'next/link'
import { Smartphone, Settings, Warehouse, User, LogOut, LogIn, UserPlus, Calculator, Package, TrendingUp, Shield, Zap, Globe, Users } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const { user, signOut, isAdmin, isWarehouse } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tech Trader
                </h1>
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
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  {isWarehouse && (
                    <Link
                      href="/warehouse"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Warehouse
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium flex items-center space-x-1 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Get Started</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                The Ultimate Platform for
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Tech Trading
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Transform your electronic device business with our comprehensive platform. 
                Assess device values, source quality parts, and maximize profits with real-time pricing and professional tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {!user ? (
                  <>
                    <Link
                      href="/register"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      Start Trading Today
                    </Link>
                    <Link
                      href="/login"
                      className="bg-white text-gray-900 px-8 py-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/user"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What Does Tech Trader Do?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We&apos;re revolutionizing the electronic device trading industry with cutting-edge tools and real-time data.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Device Valuation</h3>
                <p className="text-gray-600">
                  Get instant, accurate valuations for any electronic device based on condition, defects, and market data.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Parts Sourcing</h3>
                <p className="text-gray-600">
                  Source high-quality replacement parts with three quality tiers: Budget, Premium, and Refurbished.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Profit Optimization</h3>
                <p className="text-gray-600">
                  Calculate repair costs, profit margins, and make informed decisions to maximize your returns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Tech Trader?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform is designed for professionals who demand accuracy, efficiency, and results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600">Get instant valuations and quotes in seconds, not minutes.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
                <p className="text-gray-600">Enterprise-grade security with 99.9% uptime guarantee.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
                <p className="text-gray-600">Access markets worldwide with our comprehensive database.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
                <p className="text-gray-600">Join thousands of successful tech traders worldwide.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Powerful Dashboards
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access professional tools designed for every role in the tech trading ecosystem.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* User Dashboard */}
              <Link href={user ? "/user" : "/register"} className="group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-700 transition-colors">
                    <Smartphone className="w-8 h-8 text-white" />
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
              <div className={`group ${!isAdmin ? 'opacity-50' : ''}`}>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-700 transition-colors">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Admin Dashboard</h3>
                  <p className="text-gray-600 mb-6">
                    Manage pricing, add new parts, and update device resale values in real-time.
                  </p>
                  <div className="text-green-600 font-medium group-hover:text-green-700">
                    {isAdmin ? 'Manage System →' : 'Admin Access Only'}
                  </div>
                </div>
              </div>

              {/* Warehouse Dashboard */}
              <div className={`group ${!isWarehouse ? 'opacity-50' : ''}`}>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-700 transition-colors">
                    <Warehouse className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Warehouse Dashboard</h3>
                  <p className="text-gray-600 mb-6">
                    Process orders, manage inventory, and ship parts efficiently to customers.
                  </p>
                  <div className="text-purple-600 font-medium group-hover:text-purple-700">
                    {isWarehouse ? 'Process Orders →' : 'Warehouse Access Only'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Trusted by Tech Traders Worldwide
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Join thousands of successful professionals who trust Tech Trader for their business needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-lg opacity-90">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$50M+</div>
                <div className="text-lg opacity-90">Devices Valued</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-lg opacity-90">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Tech Trading?
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Join thousands of successful tech traders who are already maximizing their profits with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Start Trading Today
                </Link>
                <Link
                  href="/login"
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Tech Trader
              </h3>
              <p className="text-gray-400">
                The ultimate platform for electronic device trading and repair business management.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/user" className="hover:text-white transition-colors">User Dashboard</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
                <li><Link href="/warehouse" className="hover:text-white transition-colors">Warehouse Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Tech Trader. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
