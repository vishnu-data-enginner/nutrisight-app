# 🚀 NutriSight Supabase Setup Guide

## **Step 1: Run Database Tables Setup**

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/wbhvqovehnlcjodbmcul
2. **Click on "SQL Editor"** in the left sidebar
3. **Copy and paste the contents of `supabase_tables_only.sql`** into the editor
4. **Click "Run"** to create the tables

## **Step 2: Get Your Supabase Keys**

1. **In your Supabase Dashboard**, click on **"Settings"** (gear icon)
2. **Click on "API"** in the settings menu
3. **Copy these two keys**:
   - **`anon public`** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **`service_role`** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## **Step 3: Update Environment Variables**

1. **Open `frontend/.env`** in your code editor
2. **Replace `YOUR_ANON_KEY_HERE`** with your actual anon key from Step 2
3. **Save the file**

## **Step 4: Deploy Edge Function (Optional - for automatic profile creation)**

### **Option A: Use Supabase CLI (Recommended)**

1. **Install Supabase CLI**:
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link your project**:
   ```bash
   supabase link --project-ref wbhvqovehnlcjodbmcul
   ```

4. **Deploy the Edge Function**:
   ```bash
   supabase functions deploy create-profile
   ```

### **Option B: Manual Profile Creation (Simpler)**

If you don't want to set up Edge Functions, you can manually create profiles when users sign up by calling the backend API.

## **Step 5: Configure Auth Webhook (If using Edge Function)**

1. **In your Supabase Dashboard**, go to **"Authentication"** → **"Settings"**
2. **Scroll down to "Webhooks"**
3. **Add a new webhook**:
   - **URL**: `https://wbhvqovehnlcjodbmcul.supabase.co/functions/v1/create-profile`
   - **Events**: Select "User created"
   - **HTTP Method**: POST
4. **Save the webhook**

## **Step 6: Test the Setup**

1. **Restart your frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Try creating an account** on your app
3. **Check your Supabase Dashboard** → **"Table Editor"** → **"profiles"** to see if the profile was created

## **Troubleshooting**

### **"Failed to fetch" Error**
- Make sure your `VITE_SUPABASE_ANON_KEY` is correct
- Check that your Supabase URL is correct
- Restart your frontend after updating `.env`

### **Profile Not Created**
- If using Edge Function: Check the function logs in Supabase Dashboard
- If not using Edge Function: The profile will be created when the user first uses the app

### **Database Connection Issues**
- Verify your Supabase project is active
- Check that the tables were created successfully in the SQL Editor

## **Next Steps**

Once this is working:
1. ✅ Users can sign up and sign in
2. ✅ Profiles are automatically created
3. ✅ Users can scan ingredients
4. ✅ Data is saved to Supabase
5. 🔄 Add Stripe integration for payments
6. 🔄 Add more advanced features

## **Quick Test Commands**

```bash
# Check if frontend is running
curl http://localhost:5173

# Check if backend is running  
curl http://localhost:8000

# Check Supabase connection (replace YOUR_ANON_KEY)
curl -H "apikey: YOUR_ANON_KEY" https://wbhvqovehnlcjodbmcul.supabase.co/rest/v1/profiles
```


