'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Warehouse, Package, Truck, CheckCircle, Clock, AlertCircle, Search, Filter } from 'lucide-react'

interface Order {
  id: string
  customerName: string
  orderDate: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  priority: 'low' | 'medium' | 'high'
  items: OrderItem[]
  totalAmount: number
  shippingAddress: string
}

interface OrderItem {
  id: string
  partName: string
  quality: 'budget' | 'premium' | 'refurbished'
  quantity: number
  price: number
  picked: boolean
}

const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    orderDate: '2024-01-15',
    status: 'pending',
    priority: 'high',
    items: [
      { id: '1', partName: 'Screen Assembly', quality: 'premium', quantity: 1, price: 149.99, picked: false },
      { id: '2', partName: 'Battery', quality: 'budget', quantity: 1, price: 24.99, picked: false },
    ],
    totalAmount: 174.98,
    shippingAddress: '123 Main St, Anytown, USA 12345'
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Johnson',
    orderDate: '2024-01-15',
    status: 'processing',
    priority: 'medium',
    items: [
      { id: '3', partName: 'Camera Module', quality: 'refurbished', quantity: 1, price: 44.99, picked: true },
    ],
    totalAmount: 44.99,
    shippingAddress: '456 Oak Ave, Somewhere, USA 67890'
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Wilson',
    orderDate: '2024-01-14',
    status: 'shipped',
    priority: 'low',
    items: [
      { id: '4', partName: 'Logic Board', quality: 'premium', quantity: 1, price: 299.99, picked: true },
      { id: '5', partName: 'Battery', quality: 'premium', quantity: 1, price: 39.99, picked: true },
    ],
    totalAmount: 339.98,
    shippingAddress: '789 Pine Rd, Elsewhere, USA 11111'
  }
]

export default function WarehouseDashboard() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handlePickItem = (orderId: string, itemId: string) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map(item => 
            item.id === itemId ? { ...item, picked: !item.picked } : item
          )
        }
      }
      return order
    }))
  }

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'processing': return <Package className="w-4 h-4" />
      case 'shipped': return <Truck className="w-4 h-4" />
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Warehouse Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Orders:</span> {orders.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {orders.filter(o => o.status === 'pending').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Processing</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {orders.filter(o => o.status === 'processing').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Shipped</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {orders.filter(o => o.status === 'shipped').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Delivered</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {orders.filter(o => o.status === 'delivered').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders by customer name or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <div key={order.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-500">{order.customerName}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                      <span className="capitalize">{order.priority}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">${order.totalAmount}</p>
                    <p className="text-sm text-gray-500">{order.orderDate}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={item.picked}
                            onChange={() => handlePickItem(order.id, item.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-900">{item.partName}</span>
                          <span className="text-sm text-gray-500 capitalize">({item.quality})</span>
                          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Shipping Address:</h4>
                  <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {order.items.filter(item => item.picked).length} of {order.items.length} items picked
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'processing')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        Start Processing
                      </button>
                    )}
                    {order.status === 'processing' && order.items.every(item => item.picked) && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'shipped')}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
                      >
                        Mark Shipped
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'delivered')}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                      >
                        Mark Delivered
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Order Details - {selectedOrder.id}</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Customer Information</h4>
                  <p className="text-gray-600">{selectedOrder.customerName}</p>
                  <p className="text-gray-600">{selectedOrder.shippingAddress}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Order Summary</h4>
                  <p className="text-gray-600">Date: {selectedOrder.orderDate}</p>
                  <p className="text-gray-600">Total: ${selectedOrder.totalAmount}</p>
                  <p className="text-gray-600">Status: <span className="capitalize">{selectedOrder.status}</span></p>
                  <p className="text-gray-600">Priority: <span className="capitalize">{selectedOrder.priority}</span></p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                        <div>
                          <span className="font-medium">{item.partName}</span>
                          <span className="text-gray-500 ml-2 capitalize">({item.quality})</span>
                          <span className="text-gray-500 ml-2">Qty: {item.quantity}</span>
                        </div>
                        <span className="font-medium">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
