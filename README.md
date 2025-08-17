# Tech Trader - Electronic Device Trading Platform

A comprehensive platform for buying, selling, and repairing electronic devices with real-time pricing, parts sourcing, and professional tools.

## Features

### 🏠 **Landing Page**
- Modern, responsive design with clear navigation
- Role-based dashboard access (User, Admin, Warehouse)
- Call-to-action for new users

### 👤 **User Dashboard**
- Device assessment and valuation
- Defect selection and impact calculation
- Parts selection with quality options (Budget, Premium, Refurbished)
- Real-time profit margin calculations
- Order placement and tracking

### ⚙️ **Admin Dashboard**
- Device pricing management
- Parts inventory and pricing control
- Bulk CSV import/export functionality
- Price history tracking
- Stock management

### 🏭 **Warehouse Dashboard**
- Order processing and management
- Pick lists and shipping preparation
- Order status updates
- Priority-based workflow

### 🔐 **Authentication System**
- User registration and login
- Role-based access control
- Secure dashboard access

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **State Management**: React Context + Hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd tech-trader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase project:

   **Users Table:**
   ```sql
   CREATE TABLE users (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     email TEXT NOT NULL,
     full_name TEXT NOT NULL,
     role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'warehouse')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **Devices Table:**
   ```sql
   CREATE TABLE devices (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     brand TEXT NOT NULL,
     model TEXT NOT NULL,
     category TEXT NOT NULL CHECK (category IN ('iPhone', 'iPad', 'MacBook')),
     base_price DECIMAL(10,2) NOT NULL,
     release_year INTEGER NOT NULL,
     discontinued BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **Parts Table:**
   ```sql
   CREATE TABLE parts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     category TEXT NOT NULL,
     compatible_devices TEXT[] NOT NULL,
     budget_price DECIMAL(10,2) NOT NULL,
     premium_price DECIMAL(10,2) NOT NULL,
     refurbished_price DECIMAL(10,2) NOT NULL,
     stock_quantity INTEGER NOT NULL DEFAULT 0,
     out_of_stock BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **Price History Table:**
   ```sql
   CREATE TABLE price_history (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     item_type TEXT NOT NULL CHECK (item_type IN ('device', 'part')),
     item_id UUID NOT NULL,
     old_price DECIMAL(10,2) NOT NULL,
     new_price DECIMAL(10,2) NOT NULL,
     changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     changed_by UUID REFERENCES users(id)
   );
   ```

   **Orders Table:**
   ```sql
   CREATE TABLE orders (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES users(id) NOT NULL,
     status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered')),
     priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
     total_amount DECIMAL(10,2) NOT NULL,
     shipping_address TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **Order Items Table:**
   ```sql
   CREATE TABLE order_items (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     order_id UUID REFERENCES orders(id) NOT NULL,
     part_id UUID REFERENCES parts(id) NOT NULL,
     quality TEXT NOT NULL CHECK (quality IN ('budget', 'premium', 'refurbished')),
     quantity INTEGER NOT NULL DEFAULT 1,
     unit_price DECIMAL(10,2) NOT NULL,
     picked BOOLEAN DEFAULT FALSE
   );
   ```

5. **Set up Row Level Security (RLS)**
   ```sql
   -- Enable RLS on all tables
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
   ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
   ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
   ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

   -- Users can only see their own data
   CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

   -- Devices are publicly readable
   CREATE POLICY "Devices are publicly viewable" ON devices FOR SELECT USING (true);

   -- Parts are publicly readable
   CREATE POLICY "Parts are publicly viewable" ON parts FOR SELECT USING (true);

   -- Users can only see their own orders
   CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

   -- Order items follow order permissions
   CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
     EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid())
   );

   -- Admin policies (you'll need to set up admin users manually)
   CREATE POLICY "Admins can manage all data" ON devices FOR ALL USING (
     EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
   );
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### For Users
1. Register an account
2. Access the User Dashboard
3. Select a device and assess its value
4. Choose repair parts and calculate costs
5. Place orders for parts

### For Admins
1. Access the Admin Dashboard (admin role required)
2. Manage device pricing
3. Update parts inventory and pricing
4. Import/export data via CSV
5. Monitor price history

### For Warehouse Staff
1. Access the Warehouse Dashboard (warehouse role required)
2. Process incoming orders
3. Update order statuses
4. Generate pick lists

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables
Make sure to set these in your production environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Future Enhancements

- [ ] Photo upload for device assessment
- [ ] Advanced analytics and price prediction
- [ ] Mobile app development
- [ ] Integration with shipping providers
- [ ] Automated inventory tracking
- [ ] Multi-language support
- [ ] Advanced reporting and analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@techtrader.com or create an issue in the repository.
