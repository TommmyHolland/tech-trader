'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator, Smartphone, Package, BarChart3, Settings, User, Bell, Download, Upload, TrendingUp, DollarSign, Target, Zap } from 'lucide-react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'

interface Device {
  id: string
  brand: string
  model: string
  category: string
}

interface Defect {
  id: string
  name: string
  severity: 'low' | 'medium' | 'high'
  costImpact: number
}

interface Part {
  id: string
  name: string
  quality: 'budget' | 'premium' | 'refurbished'
  price: number
  availability: boolean
}

const sampleDevices: Device[] = [
  { id: '1', brand: 'Apple', model: 'iPhone 14 Pro', category: 'Smartphone' },
  { id: '2', brand: 'Apple', model: 'iPhone 13', category: 'Smartphone' },
  { id: '3', brand: 'Apple', model: 'iPad Pro 12.9"', category: 'Tablet' },
  { id: '4', brand: 'Apple', model: 'MacBook Pro 14"', category: 'Laptop' },
  { id: '5', brand: 'Samsung', model: 'Galaxy S23 Ultra', category: 'Smartphone' },
]

const sampleDefects: Defect[] = [
  { id: '1', name: 'Cracked Screen', severity: 'high', costImpact: 0.4 },
  { id: '2', name: 'Water Damage', severity: 'high', costImpact: 0.6 },
  { id: '3', name: 'Broken Camera', severity: 'medium', costImpact: 0.2 },
  { id: '4', name: 'Battery Issues', severity: 'medium', costImpact: 0.15 },
  { id: '5', name: 'Scratches', severity: 'low', costImpact: 0.05 },
  { id: '6', name: 'Broken Home Button', severity: 'medium', costImpact: 0.1 },
]

const sampleParts: Part[] = [
  { id: '1', name: 'Screen Assembly', quality: 'budget', price: 89.99, availability: true },
  { id: '2', name: 'Screen Assembly', quality: 'premium', price: 149.99, availability: true },
  { id: '3', name: 'Screen Assembly', quality: 'refurbished', price: 119.99, availability: true },
  { id: '4', name: 'Battery', quality: 'budget', price: 24.99, availability: true },
  { id: '5', name: 'Battery', quality: 'premium', price: 39.99, availability: true },
  { id: '6', name: 'Camera Module', quality: 'budget', price: 34.99, availability: true },
]

export default function UserDashboard() {
  const { user } = useAuth()
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [selectedDefects, setSelectedDefects] = useState<string[]>([])
  const [selectedParts, setSelectedParts] = useState<Part[]>([])
  const [deviceCondition, setDeviceCondition] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good')
  const [activeTab, setActiveTab] = useState<'assessment' | 'history' | 'settings'>('assessment')

  const calculateDeviceValue = () => {
    if (!selectedDevice) return 0
    
    // Base values (in USD) - these would come from admin database
    const baseValues: { [key: string]: number } = {
      'iPhone 14 Pro': 899,
      'iPhone 13': 699,
      'iPad Pro 12.9"': 1099,
      'MacBook Pro 14"': 1999,
      'Galaxy S23 Ultra': 1199,
    }
    
    const baseValue = baseValues[selectedDevice.model] || 500
    
    // Apply defect impact
    const defectImpact = selectedDefects.reduce((total, defectId) => {
      const defect = sampleDefects.find(d => d.id === defectId)
      return total + (defect ? defect.costImpact : 0)
    }, 0)
    
    // Apply condition modifier
    const conditionModifiers = { excellent: 1.1, good: 1.0, fair: 0.8, poor: 0.6 }
    
    return Math.round(baseValue * (1 - defectImpact) * conditionModifiers[deviceCondition])
  }

  const calculateRepairCost = () => {
    return selectedParts.reduce((total, part) => total + part.price, 0)
  }

  const calculateProfit = () => {
    const deviceValue = calculateDeviceValue()
    const repairCost = calculateRepairCost()
    return deviceValue - repairCost
  }

  const handlePartSelection = (part: Part) => {
    const existingPartIndex = selectedParts.findIndex(p => p.name === part.name)
    
    if (existingPartIndex >= 0) {
      // Replace existing part with new quality
      const newParts = [...selectedParts]
      newParts[existingPartIndex] = part
      setSelectedParts(newParts)
    } else {
      // Add new part
      setSelectedParts([...selectedParts, part])
    }
  }

  const handlePurchaseParts = () => {
    // This would integrate with warehouse system
    alert('Order submitted to warehouse! You will receive confirmation shortly.')
  }

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        {/* Top Navigation */}
        <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 flex items-center space-x-2 transition-all duration-300 hover:bg-gray-100/50 px-3 py-2 rounded-lg backdrop-blur-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </Link>
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  User Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-3 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:bg-gray-100/50 rounded-xl backdrop-blur-sm group">
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
                <div className="flex items-center space-x-3 text-sm text-gray-600 bg-gradient-to-r from-blue-100/50 to-purple-100/50 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-200/50">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user?.full_name}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                  <p className="text-3xl font-black text-gray-900">24</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Parts Ordered</p>
                  <p className="text-3xl font-black text-gray-900">12</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Profit</p>
                  <p className="text-3xl font-black text-gray-900">$2,847</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Devices Assessed</p>
                  <p className="text-3xl font-black text-gray-900">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 sticky top-24">
                <nav className="space-y-3">
                  <button
                    onClick={() => setActiveTab('assessment')}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-left transition-all duration-300 group ${
                      activeTab === 'assessment'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                    }`}
                  >
                    <Calculator className={`w-5 h-5 group-hover:scale-110 transition-transform duration-300 ${
                      activeTab === 'assessment' ? 'text-white' : 'text-blue-600'
                    }`} />
                    <span className="font-semibold">Device Assessment</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-left transition-all duration-300 group ${
                      activeTab === 'history'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                    }`}
                  >
                    <BarChart3 className={`w-5 h-5 group-hover:scale-110 transition-transform duration-300 ${
                      activeTab === 'history' ? 'text-white' : 'text-purple-600'
                    }`} />
                    <span className="font-semibold">Assessment History</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-left transition-all duration-300 group ${
                      activeTab === 'settings'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                    }`}
                  >
                    <Settings className={`w-5 h-5 group-hover:scale-110 transition-transform duration-300 ${
                      activeTab === 'settings' ? 'text-white' : 'text-gray-600'
                    }`} />
                    <span className="font-semibold">Settings</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'assessment' && (
                <div className="space-y-8">
                  {/* Device Assessment Panel */}
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-black text-gray-900 flex items-center">
                        <Smartphone className="w-8 h-8 mr-4 text-blue-600" />
                        Device Assessment
                      </h2>
                      <div className="flex items-center space-x-3">
                        <button className="p-3 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:bg-gray-100/50 rounded-xl backdrop-blur-sm group">
                          <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        </button>
                        <button className="p-3 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:bg-gray-100/50 rounded-xl backdrop-blur-sm group">
                          <Upload className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Device Selection */}
                    <div className="mb-8">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Device
                      </label>
                      <select
                        className="w-full p-4 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        value={selectedDevice?.id || ''}
                        onChange={(e) => {
                          const device = sampleDevices.find(d => d.id === e.target.value)
                          setSelectedDevice(device || null)
                        }}
                      >
                        <option value="">Choose a device...</option>
                        {sampleDevices.map(device => (
                          <option key={device.id} value={device.id}>
                            {device.brand} {device.model}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Device Condition */}
                    {selectedDevice && (
                      <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Device Condition
                        </label>
                        <div className="grid grid-cols-4 gap-4">
                          {(['excellent', 'good', 'fair', 'poor'] as const).map(condition => (
                            <button
                              key={condition}
                              onClick={() => setDeviceCondition(condition)}
                              className={`p-4 rounded-xl border-2 text-sm font-semibold capitalize transition-all duration-300 group ${
                                deviceCondition === condition
                                  ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                                  : 'border-gray-200/50 text-gray-700 hover:border-gray-300/50 hover:bg-gray-50/50 hover:scale-105'
                              }`}
                            >
                              <span className="group-hover:scale-110 transition-transform duration-300 inline-block">
                                {condition}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Defect Selection */}
                    {selectedDevice && (
                      <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Select Defects
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {sampleDefects.map(defect => (
                            <label key={defect.id} className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200/50 hover:bg-gray-50/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-md">
                              <input
                                type="checkbox"
                                checked={selectedDefects.includes(defect.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedDefects([...selectedDefects, defect.id])
                                  } else {
                                    setSelectedDefects(selectedDefects.filter(id => id !== defect.id))
                                  }
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-5 h-5"
                              />
                              <span className="text-sm text-gray-700 capitalize font-medium group-hover:text-gray-900">
                                {defect.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Parts Selection */}
                  {selectedDevice && (
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-8">
                      <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                        <Package className="w-6 h-6 mr-3 text-green-600" />
                        Select Repair Parts
                      </h3>
                      <div className="space-y-6">
                        {['Screen Assembly', 'Battery', 'Camera Module'].map(partName => {
                          const partOptions = sampleParts.filter(p => p.name === partName)
                          return (
                            <div key={partName} className="border border-gray-200/50 rounded-xl p-6 bg-white/30 backdrop-blur-sm">
                              <h4 className="font-bold text-gray-900 mb-4 text-lg">{partName}</h4>
                              <div className="grid grid-cols-3 gap-4">
                                {partOptions.map(part => (
                                  <button
                                    key={part.id}
                                    onClick={() => handlePartSelection(part)}
                                    className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-300 group hover:scale-105 ${
                                      selectedParts.some(p => p.name === part.name && p.quality === part.quality)
                                        ? 'border-green-500 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                                        : 'border-gray-200/50 text-gray-700 hover:border-gray-300/50 hover:bg-gray-50/50'
                                    }`}
                                  >
                                    <div className="capitalize mb-2">{part.quality}</div>
                                    <div className="font-black text-lg">${part.price}</div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                    <BarChart3 className="w-8 h-8 mr-4 text-purple-600" />
                    Assessment History
                  </h2>
                  <div className="text-center py-16">
                    <BarChart3 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <p className="text-xl text-gray-600 font-medium">Your previous device assessments will appear here.</p>
                    <p className="text-gray-500 mt-2">Start assessing devices to build your history!</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                    <Settings className="w-8 h-8 mr-4 text-gray-600" />
                    Settings
                  </h2>
                  <div className="text-center py-16">
                    <Settings className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <p className="text-xl text-gray-600 font-medium">Manage your account preferences and settings here.</p>
                    <p className="text-gray-500 mt-2">Customize your Tech Trader experience!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel - Fixed Position */}
          {selectedDevice && (
            <div className="fixed bottom-8 right-8 w-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 z-50">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-purple-600" />
                Assessment Results
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200/50">
                  <div className="text-sm text-blue-700 font-semibold mb-1">Device Value</div>
                  <div className="text-3xl font-black text-blue-900">
                    ${calculateDeviceValue()}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border border-red-200/50">
                  <div className="text-sm text-red-700 font-semibold mb-1">Repair Cost</div>
                  <div className="text-3xl font-black text-red-900">
                    ${calculateRepairCost()}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200/50">
                  <div className="text-sm text-green-700 font-semibold mb-1">Potential Profit</div>
                  <div className="text-3xl font-black text-green-900">
                    ${calculateProfit()}
                  </div>
                </div>
                
                {selectedParts.length > 0 && (
                  <button
                    onClick={handlePurchaseParts}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 group"
                  >
                    <Package className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Purchase Parts</span>
                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
