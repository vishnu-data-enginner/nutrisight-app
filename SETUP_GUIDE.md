# 🚀 NutriSight Full-Stack SaaS Setup Guide

Transform your NutriSight MVP into a complete SaaS product with Supabase auth, Stripe payments, and user dashboards.

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- Supabase account
- Stripe account

## 🗄️ 1. Supabase Setup

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key

### Database Tables
Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'yearly')),
  scans_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Analyses table
CREATE TABLE analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  image_url TEXT,
  ingredients TEXT[],
  health_score INTEGER,
  health_risks JSONB,
  recommendations TEXT[],
  tags TEXT[],
  analysis_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for analyses
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Policy for analyses
CREATE POLICY "Users can view own analyses" ON analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_type TEXT CHECK (plan_type IN ('pro', 'yearly')),
  status TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy for subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);
```

### Enable Authentication
1. Go to Authentication > Settings in Supabase
2. Enable Email authentication
3. Enable Google OAuth (optional)
4. Configure site URL: `http://localhost:5173`

## 💳 2. Stripe Setup

### Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Get your publishable and secret keys from the dashboard

### Create Products and Prices
1. Go to Products in Stripe dashboard
2. Create two products:
   - **Pro Plan**: $10/month recurring
   - **Yearly Plan**: $100/year recurring
3. Note the price IDs (start with `price_`)

### Webhook Setup
1. Go to Webhooks in Stripe dashboard
2. Add endpoint: `http://localhost:8000/stripe-webhook`
3. Select events: `checkout.session.completed`
4. Note the webhook secret

## 🔧 3. Environment Variables

### Frontend (.env)
```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_STRIPE_PRO_PRICE_ID=price_your_pro_price_id
VITE_STRIPE_YEARLY_PRICE_ID=price_your_yearly_price_id

# Backend API
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```bash
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PRO_PRICE_ID=price_your_pro_price_id
STRIPE_YEARLY_PRICE_ID=price_your_yearly_price_id
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## 🚀 4. Installation & Running

### Backend
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🎯 5. Features Included

### ✅ Authentication
- Email/password signup and login
- Google OAuth integration
- Magic link authentication
- Protected routes and user sessions

### ✅ User Dashboard
- Personal health score overview
- Scan history and statistics
- Plan usage tracking
- Upgrade prompts for free users

### ✅ Payment Integration
- Stripe checkout for subscriptions
- Pro ($10/month) and Yearly ($100/year) plans
- Webhook handling for subscription updates
- Plan-based feature access

### ✅ Enhanced UI/UX
- Modern gradient design with glassmorphism
- Smooth animations with Framer Motion
- Responsive mobile-first design
- Animated health score components

### ✅ Plan Limits
- Free users: 50 scans
- Pro users: Unlimited scans
- Automatic upgrade prompts
- Usage tracking and analytics

## 🔄 6. User Flow

1. **Landing Page** → Modern, conversion-focused design
2. **Sign Up** → Email/password or Google OAuth
3. **Dashboard** → Personal health insights and scan history
4. **Scan Product** → AI-powered ingredient analysis
5. **Upgrade Prompt** → When approaching free scan limit
6. **Stripe Checkout** → Seamless subscription upgrade
7. **Pro Features** → Unlimited scans and advanced insights

## 🎨 7. Design System

### Colors
- Primary: Emerald/Teal gradients
- Success: Green
- Warning: Yellow/Orange
- Error: Red
- Background: Soft gradients with glassmorphism

### Typography
- Headers: Bold, large sizes
- Body: Clean, readable
- CTAs: Prominent, action-oriented

### Components
- Animated health scores
- Gradient buttons with hover effects
- Glassmorphism cards
- Smooth page transitions

## 🚀 8. Next Steps

1. **Set up your Supabase project** with the provided SQL
2. **Configure Stripe** with your products and webhooks
3. **Add environment variables** to both frontend and backend
4. **Test the complete flow** from signup to payment
5. **Customize branding** and add your own content
6. **Deploy to production** (Vercel + Railway/Render)

## 💡 Pro Tips

- Test with Stripe test mode first
- Use Supabase's built-in auth UI for quick setup
- Monitor user analytics in Stripe dashboard
- Set up proper error handling and logging
- Consider adding email notifications for upgrades

Your NutriSight app is now a complete SaaS product ready for users! 🎉


