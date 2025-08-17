import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name: string
  role: 'user' | 'admin' | 'warehouse'
  created_at: string
}

export interface Device {
  id: string
  brand: string
  model: string
  category: 'iPhone' | 'iPad' | 'MacBook'
  base_price: number
  release_year: number
  discontinued: boolean
  created_at: string
  updated_at: string
}

export interface Part {
  id: string
  name: string
  category: string
  compatible_devices: string[] // Array of device IDs
  budget_price: number
  premium_price: number
  refurbished_price: number
  stock_quantity: number
  out_of_stock: boolean
  created_at: string
  updated_at: string
}

export interface PriceHistory {
  id: string
  item_type: 'device' | 'part'
  item_id: string
  old_price: number
  new_price: number
  changed_at: string
  changed_by: string
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  priority: 'low' | 'medium' | 'high'
  total_amount: number
  shipping_address: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  part_id: string
  quality: 'budget' | 'premium' | 'refurbished'
  quantity: number
  unit_price: number
  picked: boolean
}
