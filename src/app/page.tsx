'use client'

import Link from 'next/link'
import { Smartphone, Settings, Warehouse, User, LogOut, LogIn, UserPlus, Calculator, Package, TrendingUp, Shield, Zap, Globe, Users, ArrowRight, CheckCircle, Star, Award, Target, Rocket } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'

export default function Home() {
  const { user, signOut, isAdmin, isWarehouse } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Header */}
      <header className={`bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50 transition-all duration-500 ${scrollY > 100 ? 'bg-white/95 shadow-xl' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                  Tech Trader
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100/50 px-3 py-2 rounded-full backdrop-blur-sm">
                    <User className="w-4 h-4" />
                    <span>{user.full_name}</span>
                    <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full capitalize font-medium">
                      {user.role}
                    </span>
                  </div>
                  <Link
                    href="/user"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-100/50 backdrop-blur-sm"
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-100/50 backdrop-blur-sm"
                    >
                      Admin
                    </Link>
                  )}
                  {isWarehouse && (
                    <Link
                      href="/warehouse"
                      className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-100/50 backdrop-blur-sm"
                    >
                      Warehouse
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-300 hover:bg-gray-100/50 backdrop-blur-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-300 hover:bg-gray-100/50 backdrop-blur-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 text-sm font-medium flex items-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 group"
                  >
                    <UserPlus className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
                <Star className="w-4 h-4" />
                <span>Trusted by 10,000+ Tech Traders Worldwide</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 leading-tight animate-fade-in-up animation-delay-200">
                The Ultimate Platform for
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                  Tech Trading
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
                Transform your electronic device business with our comprehensive platform. 
                Assess device values, source quality parts, and maximize profits with real-time pricing and professional tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-600">
                {!user ? (
                  <>
                    <Link
                      href="/register"
                      className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative flex items-center space-x-3">
                        <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Start Trading Today</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </Link>
                    <Link
                      href="/login"
                      className="bg-white/80 backdrop-blur-xl text-gray-900 px-10 py-5 rounded-2xl border-2 border-gray-200/50 hover:border-gray-300/50 transition-all duration-500 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 group"
                    >
                      <span className="flex items-center space-x-3">
                        <User className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        <span>Sign In</span>
                      </span>
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/user"
                    className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative flex items-center space-x-3">
                      <Target className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      <span>Go to Dashboard</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-32 bg-white/50 backdrop-blur-xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                <span>Industry Leading Features</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
                What Does Tech Trader Do?
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We&apos;re revolutionizing the electronic device trading industry with cutting-edge tools and real-time data.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-blue-50/80 to-blue-100/80 backdrop-blur-xl p-8 rounded-3xl text-center hover:transform hover:-translate-y-3 transition-all duration-500 border border-blue-200/50 hover:border-blue-300/50 hover:shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Device Valuation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get instant, accurate valuations for any electronic device based on condition, defects, and market data.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-green-50/80 to-green-100/80 backdrop-blur-xl p-8 rounded-3xl text-center hover:transform hover:-translate-y-3 transition-all duration-500 border border-green-200/50 hover:border-green-300/50 hover:shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Parts Sourcing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Source high-quality replacement parts with three quality tiers: Budget, Premium, and Refurbished.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50/80 to-purple-100/80 backdrop-blur-xl p-8 rounded-3xl text-center hover:transform hover:-translate-y-3 transition-all duration-500 border border-purple-200/50 hover:border-purple-300/50 hover:shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Profit Optimization</h3>
                <p className="text-gray-600 leading-relaxed">
                  Calculate repair costs, profit margins, and make informed decisions to maximize your returns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4" />
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
                Why Choose Tech Trader?
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Our platform is designed for professionals who demand accuracy, efficiency, and results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600">Get instant valuations and quotes in seconds, not minutes.</p>
              </div>
              
              <div className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
                <p className="text-gray-600">Enterprise-grade security with 99.9% uptime guarantee.</p>
              </div>
              
              <div className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Global Reach</h3>
                <p className="text-gray-600">Access markets worldwide with our comprehensive database.</p>
              </div>
              
              <div className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community Driven</h3>
                <p className="text-gray-600">Join thousands of successful tech traders worldwide.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-32 bg-white/50 backdrop-blur-xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                <span>Professional Tools</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
                Powerful Dashboards
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Access professional tools designed for every role in the tech trading ecosystem.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* User Dashboard */}
              <Link href={user ? "/user" : "/register"} className="group">
                <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border border-blue-200/50 hover:border-blue-300/50 transform hover:-translate-y-2">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">User Dashboard</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Assess device values, calculate repair costs, and find the best parts for your projects.
                  </p>
                  <div className="text-blue-600 font-bold group-hover:text-blue-700 flex items-center justify-center space-x-2">
                    <span>{user ? 'Access Dashboard' : 'Get Started'}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              {/* Admin Dashboard */}
              <div className={`group ${!isAdmin ? 'opacity-50' : ''}`}>
                <div className="bg-gradient-to-br from-green-50/80 to-green-100/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border border-green-200/50 hover:border-green-300/50 transform hover:-translate-y-2">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Settings className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Manage pricing, add new parts, and update device resale values in real-time.
                  </p>
                  <div className="text-green-600 font-bold group-hover:text-green-700 flex items-center justify-center space-x-2">
                    <span>{isAdmin ? 'Manage System' : 'Admin Access Only'}</span>
                    {isAdmin && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
                  </div>
                </div>
              </div>

              {/* Warehouse Dashboard */}
              <div className={`group ${!isWarehouse ? 'opacity-50' : ''}`}>
                <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border border-purple-200/50 hover:border-purple-300/50 transform hover:-translate-y-2">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Warehouse className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Warehouse Dashboard</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Process orders, manage inventory, and ship parts efficiently to customers.
                  </p>
                  <div className="text-purple-600 font-bold group-hover:text-purple-700 flex items-center justify-center space-x-2">
                    <span>{isWarehouse ? 'Process Orders' : 'Warehouse Access Only'}</span>
                    {isWarehouse && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-indigo-600/50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-xl text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>Trusted Worldwide</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8">
                Trusted by Tech Traders Worldwide
              </h2>
              <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
                Join thousands of successful professionals who trust Tech Trader for their business needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">10K+</div>
                <div className="text-lg opacity-90 font-medium">Active Users</div>
              </div>
              <div className="group">
                <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">$50M+</div>
                <div className="text-lg opacity-90 font-medium">Devices Valued</div>
              </div>
              <div className="group">
                <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                <div className="text-lg opacity-90 font-medium">Uptime</div>
              </div>
              <div className="group">
                <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-lg opacity-90 font-medium">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="py-32 bg-white/50 backdrop-blur-xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/50"></div>
            <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Rocket className="w-4 h-4" />
                <span>Ready to Transform?</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
                Ready to Transform Your Tech Trading?
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of successful tech traders who are already maximizing their profits with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/register"
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center space-x-3">
                    <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Start Trading Today</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Link>
                <Link
                  href="/login"
                  className="bg-white/80 backdrop-blur-xl text-gray-900 px-10 py-5 rounded-2xl border-2 border-gray-200/50 hover:border-gray-300/50 transition-all duration-500 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 group"
                >
                  <span className="flex items-center space-x-3">
                    <User className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Sign In</span>
                  </span>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                Tech Trader
              </h3>
              <p className="text-gray-400 leading-relaxed">
                The ultimate platform for electronic device trading and repair business management.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/user" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">User Dashboard</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Admin Dashboard</Link></li>
                <li><Link href="/warehouse" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Warehouse Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Tech Trader. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
