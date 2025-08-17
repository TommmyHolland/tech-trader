'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator, Smartphone, Package, BarChart3, Settings, User, Bell, Download, Upload } from 'lucide-react'
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
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{user?.full_name}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Parts Ordered</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Profit</p>
                  <p className="text-2xl font-bold text-gray-900">$2,847</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Devices Assessed</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('assessment')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === 'assessment'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Calculator className="w-5 h-5" />
                    <span className="font-medium">Device Assessment</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === 'history'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="font-medium">Assessment History</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === 'settings'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'assessment' && (
                <div className="space-y-6">
                  {/* Device Assessment Panel */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                        <Smartphone className="w-6 h-6 mr-3 text-blue-600" />
                        Device Assessment
                      </h2>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Device Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Device
                      </label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Device Condition
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {(['excellent', 'good', 'fair', 'poor'] as const).map(condition => (
                            <button
                              key={condition}
                              onClick={() => setDeviceCondition(condition)}
                              className={`p-3 rounded-lg border text-sm font-medium capitalize transition-colors ${
                                deviceCondition === condition
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {condition}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Defect Selection */}
                    {selectedDevice && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Defects
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {sampleDefects.map(defect => (
                            <label key={defect.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
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
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700 capitalize">
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
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-green-600" />
                        Select Repair Parts
                      </h3>
                      <div className="space-y-4">
                        {['Screen Assembly', 'Battery', 'Camera Module'].map(partName => {
                          const partOptions = sampleParts.filter(p => p.name === partName)
                          return (
                            <div key={partName} className="border border-gray-200 rounded-lg p-4">
                              <h4 className="font-medium text-gray-900 mb-3">{partName}</h4>
                              <div className="grid grid-cols-3 gap-3">
                                {partOptions.map(part => (
                                  <button
                                    key={part.id}
                                    onClick={() => handlePartSelection(part)}
                                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                                      selectedParts.some(p => p.name === part.name && p.quality === part.quality)
                                        ? 'border-green-500 bg-green-50 text-green-700'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className="capitalize">{part.quality}</div>
                                    <div className="font-bold">${part.price}</div>
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Assessment History</h2>
                  <p className="text-gray-600">Your previous device assessments will appear here.</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h2>
                  <p className="text-gray-600">Manage your account preferences and settings here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel - Fixed Position */}
          {selectedDevice && (
            <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-purple-600" />
                Assessment Results
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-600 font-medium">Device Value</div>
                  <div className="text-2xl font-bold text-blue-900">
                    ${calculateDeviceValue()}
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-sm text-red-600 font-medium">Repair Cost</div>
                  <div className="text-2xl font-bold text-red-900">
                    ${calculateRepairCost()}
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-green-600 font-medium">Potential Profit</div>
                  <div className="text-2xl font-bold text-green-900">
                    ${calculateProfit()}
                  </div>
                </div>
                
                {selectedParts.length > 0 && (
                  <button
                    onClick={handlePurchaseParts}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Package className="w-5 h-5" />
                    <span>Purchase Parts</span>
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
