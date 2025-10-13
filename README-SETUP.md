# Emmdra Empire & Lifestyle - Setup Guide

A comprehensive Nigerian lifestyle platform built with Next.js 15, featuring e-commerce functionality, content management, and community engagement tools.

## 🌟 About Emmdra Empire

Emmdra Empire is Nigeria's premier lifestyle destination, empowering women through:

- **Authentic Fashion** - Curated Nigerian designers and contemporary styles
- **Natural Beauty Solutions** - DIY beauty recipes and premium skincare
- **Creative Workshops** - Hands-on crafting and styling sessions
- **Inspiring Content** - Fashion tips, beauty tutorials, and lifestyle stories
- **Community Building** - Connecting creative women across Nigeria

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for database)
- Gmail account (for email notifications)

### Installation

1. **Clone and setup**
```bash
git clone https://github.com/e-ogugua/emmdraEmpireAndLifestyle.git
cd emmdraEmpireAndLifestyle
npm install
```

2. **Environment Configuration**
```bash
cp .env.example .env.local
```

Configure your `.env.local`:
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password

# Admin Access
NEXT_PUBLIC_ADMIN_EMAILS=admin@emmdraempire.com,manager@emmdraempire.com
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Access Your Site**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## 📋 Key Features Implemented

### 🛒 **E-Commerce Platform**
- **Product Catalog** - Fashion, beauty, and lifestyle products
- **Shopping Cart** - Persistent cart with real-time updates
- **Secure Checkout** - Customer information collection
- **Order Management** - Complete order lifecycle tracking
- **Email Notifications** - Automated customer confirmations

### 🎛️ **Admin Dashboard**
- **Order Management** - View and process all orders
- **Product Management** - Add/edit inventory
- **Content Management** - Blog posts and DIY tutorials
- **Customer Communication** - Direct email responses
- **Analytics Tracking** - User engagement metrics

### 📱 **Mobile-First Design**
- **Responsive Layout** - Optimized for all devices
- **Touch-Friendly** - 44px minimum touch targets
- **Progressive Enhancement** - Enhanced desktop experience
- **Performance Optimized** - Fast loading and smooth animations

### 🔐 **Professional Features**
- **Email Integration** - Gmail SMTP for reliability
- **Database Integration** - Supabase PostgreSQL
- **Form Validation** - Comprehensive input validation
- **SEO Optimization** - Meta tags and Open Graph
- **Security Headers** - Production-ready security

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard (/admin/*)
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout process
│   ├── diy/               # DIY tutorials
│   ├── shop/              # Product catalog
│   ├── blog/              # Lifestyle blog
│   └── ...                # Additional pages
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Site footer
│   ├── HeroCarousel.tsx   # Homepage carousel
│   └── admin/             # Admin components
└── lib/                   # Utilities
    ├── cart-context.tsx   # Shopping cart state
    ├── supabase.ts        # Database client
    └── email.ts           # Email utilities
```

## 🎯 Technical Stack

- **Framework:** Next.js 15 with App Router & Turbopack
- **Language:** TypeScript for type safety
- **Styling:** Tailwind CSS with custom design system
- **Database:** Supabase (PostgreSQL)
- **Email:** Nodemailer with Gmail SMTP
- **State Management:** React Context API
- **Deployment:** Vercel (optimized for performance)

## 🔧 Configuration

### Database Setup (Supabase)
1. Create a new project at [supabase.com](https://supabase.com)
2. Run the provided SQL migrations for tables
3. Update your environment variables

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an [app password](https://support.google.com/accounts/answer/185833)
3. Use the app password in your SMTP_PASS environment variable

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with zero configuration

### Manual Deployment
```bash
npm run build
npm run start
```

## 📞 Support & Contact

**Emmdra Empire Support:**
- Email: support@emmdraempire.com
- Admin Panel: `/admin` (login required)
- Business Hours: Monday - Saturday, 9 AM - 6 PM WAT

## 📄 License

© 2024 Emmdra Empire & Lifestyle. All rights reserved.

---

*Built with ❤️ for the modern Nigerian woman*
