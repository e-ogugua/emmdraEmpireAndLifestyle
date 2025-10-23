# Emmdra Empire - E-commerce and Lifestyle Platform

A comprehensive e-commerce and lifestyle platform built with Next.js, featuring a complete shopping cart system, admin dashboard, email notifications, and mobile-responsive design.

## Features

### Complete Shopping Experience
- **Product Catalog** - Browse and search products with filtering
- **Shopping Cart** - Add, remove, and manage cart items with persistent storage
- **Secure Checkout** - Professional checkout flow with customer information collection
- **Order Management** - Complete order processing with database storage
- **Email Notifications** - Automated emails to customers and admins

### Admin Dashboard
- **Order Management** - View and manage all customer orders
- **Product Management** - Add, edit, and manage product inventory
- **Analytics Dashboard** - Track site performance and user engagement
- **Content Management** - Manage blog posts, workshops, and DIY tutorials
- **User Management** - Handle consultations, bookings, and contact messages

### Mobile-First Design
- **Responsive Layout** - Perfect experience on all devices
- **Touch-Optimized** - Mobile-friendly interactions and touch targets
- **Progressive Enhancement** - Enhanced experience on larger screens
- **Performance Optimized** - Fast loading and smooth animations

### Security and Professional Features
- **Email Integration** - Gmail SMTP for order notifications
- **Database Integration** - Supabase for data persistence
- **Form Validation** - Comprehensive input validation and error handling
- **Admin Authentication** - Secure admin panel access
- **Order Tracking** - Complete order lifecycle management

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for database)
- Gmail account (for email notifications)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/e-ogugua/emmdraEmpireAndLifestyle.git
cd emmdraEmpireAndLifestyle
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin Access
NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

4. **Start development server**
```bash
npm run dev
```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── diy/               # DIY tutorials
│   ├── shop/              # Product catalog
│   └── ...                # Other pages
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
│   ├── cart-context.tsx   # Shopping cart state management
│   ├── supabase.ts        # Database client
│   └── email.ts           # Email utilities
└── ...
```

## Key Features Implemented

### Shopping Cart System
- **Persistent Cart** - Cart items saved to localStorage
- **Real-time Updates** - Cart count updates in navigation
- **Quantity Management** - Add, remove, update item quantities
- **Mobile Optimized** - Touch-friendly cart interface

### Email Notification System
- **Customer Confirmations** - Order confirmation emails
- **Admin Notifications** - New order alerts to admin emails
- **Professional Templates** - HTML email templates with branding
- **SMTP Integration** - Gmail SMTP for reliable delivery

### Admin Dashboard
- **Order Management** - View, track, and manage orders
- **Customer Communication** - Direct email replies to customers
- **Analytics Tracking** - Page views and user engagement
- **Content Management** - Blog, workshops, and product management

### Mobile Responsiveness
- **Mobile-First Design** - Optimized for mobile devices
- **Touch Targets** - 44px minimum for accessibility
- **Responsive Typography** - Scales perfectly across devices
- **Progressive Enhancement** - Enhanced experience on larger screens

## Technical Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Email:** Nodemailer with Gmail SMTP
- **State Management:** React Context API
- **Deployment:** Vercel (optimized)

## Production Ready

This application is production-ready with:
- Error handling and validation
- Security measures and authentication
- Performance optimization
- Mobile responsiveness
- SEO optimization
- Professional email system
- Complete admin dashboard

## Support

For support or questions:
- **Email:** emmdraempire@gmail.com
- **Admin Panel:** `/admin` (login required)

## License

This project is private and proprietary to Emmdra Empire - Developed by CEO (Chukwuka Emmanuel Ogugua).

---

**Emmdra Empire - Developed by CEO (Chukwuka Emmanuel Ogugua)**
