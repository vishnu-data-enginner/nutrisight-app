# 🚀 NutriSight Quick Setup Guide

## Your Supabase Project Details
- **URL**: `https://wbhvqovehnlcjodbmcul.supabase.co`
- **Database**: `postgres`
- **Host**: `db.wbhvqovehnlcjodbmcul.supabase.co`
- **Port**: `5432`

## 📋 Step-by-Step Setup

### 1. Set Up Supabase Database

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/wbhvqovehnlcjodbmcul
2. **Navigate to SQL Editor** (left sidebar)
3. **Copy and paste** the contents of `supabase_setup.sql` into the editor
4. **Click "Run"** to create all tables and policies

### 2. Get Your Supabase Keys

1. **Go to Settings > API** in your Supabase dashboard
2. **Copy these values**:
   - `anon public` key (for frontend)
   - `service_role` key (for backend)

### 3. Configure Environment Variables

#### Frontend (`frontend/env.local`)
```bash
# Replace with your actual Supabase anon key
VITE_SUPABASE_URL=https://wbhvqovehnlcjodbmcul.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Your actual anon key

# Add your Stripe keys when ready
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_PRO_PRICE_ID=price_...
VITE_STRIPE_YEARLY_PRICE_ID=price_...

VITE_API_URL=http://localhost:8000
```

#### Backend (`backend/env.local`)
```bash
# Add your OpenAI API key
OPENAI_API_KEY=sk-...

# Supabase keys
SUPABASE_URL=https://wbhvqovehnlcjodbmcul.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Your anon key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Your service role key

# Database connection
DATABASE_URL=postgresql://postgres:L$yVux#wTgaf6$r@db.wbhvqovehnlcjodbmcul.supabase.co:5432/postgres

# Stripe keys (add when ready)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_YEARLY_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

FRONTEND_URL=http://localhost:5173
```

### 4. Enable Authentication

1. **Go to Authentication > Settings** in Supabase
2. **Enable Email authentication**
3. **Set Site URL**: `http://localhost:5173`
4. **Add Redirect URLs**:
   - `http://localhost:5173/dashboard`
   - `http://localhost:5173/auth/callback`

### 5. Test the Setup

1. **Start the backend**:
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Start the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test the flow**:
   - Go to `http://localhost:5173`
   - Click "Get Started" to register
   - Try signing up with email
   - Check your Supabase dashboard to see the user created

### 6. Optional: Set Up Stripe (for payments)

1. **Create Stripe account** at https://stripe.com
2. **Create products**:
   - Pro Plan: $10/month
   - Yearly Plan: $100/year
3. **Get price IDs** and add to environment variables
4. **Set up webhook** pointing to `http://localhost:8000/stripe-webhook`

## 🎯 What You'll Have

After setup, your app will have:

✅ **User Authentication** - Sign up, login, Google OAuth  
✅ **User Dashboard** - Personal health insights and scan history  
✅ **Plan Management** - Free (50 scans) vs Pro (unlimited)  
✅ **Modern UI** - Glassmorphism design with animations  
✅ **Database** - User profiles, scan history, subscriptions  
✅ **Payment Ready** - Stripe integration for upgrades  

## 🚨 Important Notes

- **Keep your database password secure**: `L$yVux#wTgaf6$r`
- **Never commit** `.env` files to git
- **Use test keys** for Stripe during development
- **Test thoroughly** before going to production

## 🆘 Troubleshooting

### Database Connection Issues
- Check if your Supabase project is active
- Verify the connection string format
- Ensure your IP is whitelisted (if using IP restrictions)

### Authentication Issues
- Verify your Supabase anon key is correct
- Check that email auth is enabled
- Ensure redirect URLs are configured

### Frontend Not Loading
- Check that all environment variables are set
- Verify the backend is running on port 8000
- Check browser console for errors

Your NutriSight app is now ready to become a full SaaS product! 🎉


