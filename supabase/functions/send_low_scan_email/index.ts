import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailPayload {
  user_id: string
  scans_left: number
  total_used: number
  user_email: string
  user_name?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { user_id, scans_left, total_used, user_email, user_name }: EmailPayload = await req.json()

    if (!user_id || !user_email) {
      throw new Error('Missing required fields: user_id, user_email')
    }

    console.log(`Sending low scan email to ${user_email} - ${scans_left} scans left`)

    // Get user's first name
    const displayName = user_name || user_email.split('@')[0]

    // Create email content based on scan count
    const emailContent = createEmailContent(displayName, scans_left, total_used)
    
    // Send email using Supabase's built-in email service
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: user_email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text
      }
    })

    if (error) {
      console.error('Error sending email:', error)
      // Fallback: Log to database for manual follow-up
      await supabase
        .from('email_logs')
        .insert({
          user_id,
          email_type: 'low_scans',
          scans_left,
          status: 'failed',
          error_message: error.message
        })
    } else {
      console.log('Email sent successfully to:', user_email)
      
      // Log successful email
      await supabase
        .from('email_logs')
        .insert({
          user_id,
          email_type: 'low_scans',
          scans_left,
          status: 'sent'
        })
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email processed' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in send_low_scan_email function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

function createEmailContent(name: string, scansLeft: number, totalUsed: number) {
  const upgradeUrl = `${Deno.env.get('FRONTEND_URL')}/pricing?utm_source=email&utm_medium=low_scans&utm_campaign=upgrade`
  
  let subject: string
  let urgency: string
  let ctaText: string
  let ctaColor: string

  if (scansLeft === 0) {
    subject = "🚨 Your NutriSight scans have run out!"
    urgency = "critical"
    ctaText = "Upgrade Now - No Scans Left"
    ctaColor = "#dc2626" // red
  } else if (scansLeft <= 5) {
    subject = "⚠️ Only a few scans left on NutriSight!"
    urgency = "high"
    ctaText = "Upgrade Before You Run Out"
    ctaColor = "#ea580c" // orange
  } else {
    subject = "📊 You're running low on NutriSight scans"
    urgency = "medium"
    ctaText = "Upgrade to Pro"
    ctaColor = "#059669" // emerald
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; margin: 0; padding: 0; background-color: #f9fafb; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .scan-counter { background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 2px solid #bbf7d0; border-radius: 16px; padding: 30px; text-align: center; margin: 30px 0; }
    .scan-number { font-size: 48px; font-weight: 800; color: ${ctaColor}; margin: 0; }
    .scan-label { font-size: 18px; color: #374151; margin: 10px 0 0 0; }
    .progress-bar { background-color: #e5e7eb; border-radius: 10px; height: 8px; margin: 20px 0; overflow: hidden; }
    .progress-fill { background: linear-gradient(90deg, ${ctaColor} 0%, ${ctaColor}dd 100%); height: 100%; border-radius: 10px; width: ${(scansLeft / 50) * 100}%; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, ${ctaColor} 0%, ${ctaColor}dd 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 18px; margin: 20px 0; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0; }
    .feature { background-color: #f8fafc; border-radius: 12px; padding: 20px; text-align: center; }
    .feature-icon { font-size: 32px; margin-bottom: 10px; }
    .footer { background-color: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
    .social-proof { background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 12px; padding: 20px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🍎 NutriSight</h1>
    </div>
    
    <div class="content">
      <h2>Hi ${name}! 👋</h2>
      
      <p>You've been making great progress with your nutrition journey! You've already scanned <strong>${totalUsed} products</strong> and gained valuable insights about your food choices.</p>
      
      <div class="scan-counter">
        <div class="scan-number">${scansLeft}</div>
        <div class="scan-label">scans remaining</div>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <p style="margin: 0; color: #6b7280;">You've used ${totalUsed} of your 50 free scans</p>
      </div>
      
      ${scansLeft === 0 ? `
        <div style="background-color: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #dc2626; margin: 0 0 10px 0;">🚨 No scans remaining!</h3>
          <p style="margin: 0; color: #374151;">Don't let your health journey stop here. Upgrade to Pro for unlimited scans and advanced features.</p>
        </div>
      ` : `
        <p>${scansLeft <= 5 ? '⚠️ You\'re almost out of free scans!' : '📊 You\'re running low on free scans.'} Don't let your health journey stop here.</p>
      `}
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${upgradeUrl}" class="cta-button">${ctaText}</a>
      </div>
      
      <div class="features">
        <div class="feature">
          <div class="feature-icon">♾️</div>
          <h3>Unlimited Scans</h3>
          <p>Scan as many products as you want, whenever you want.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🧠</div>
          <h3>Advanced AI Insights</h3>
          <p>Get deeper analysis with personalized recommendations.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">📊</div>
          <h3>Health Analytics</h3>
          <p>Track your nutrition trends and health improvements.</p>
        </div>
      </div>
      
      <div class="social-proof">
        <h3 style="margin: 0 0 10px 0; color: #92400e;">⭐ Join 50,000+ health-conscious users</h3>
        <p style="margin: 0; color: #374151;">"NutriSight changed how I shop for groceries. I can't imagine going back!" - Sarah M.</p>
      </div>
      
      <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
        Questions? Reply to this email and we'll help you out!<br>
        <a href="${Deno.env.get('FRONTEND_URL')}/unsubscribe?email=${encodeURIComponent(user_email)}" style="color: #6b7280;">Unsubscribe</a> | 
        <a href="${Deno.env.get('FRONTEND_URL')}/privacy" style="color: #6b7280;">Privacy Policy</a>
      </p>
    </div>
    
    <div class="footer">
      <p>© 2024 NutriSight. All rights reserved.</p>
      <p>Making nutrition make sense, one scan at a time.</p>
    </div>
  </div>
</body>
</html>
  `

  const text = `
Hi ${name}!

You've been making great progress with your nutrition journey! You've already scanned ${totalUsed} products and gained valuable insights about your food choices.

SCAN STATUS: ${scansLeft} scans remaining (${totalUsed} of 50 used)

${scansLeft === 0 ? 
  '🚨 NO SCANS REMAINING! Don\'t let your health journey stop here.' : 
  scansLeft <= 5 ? 
  '⚠️ You\'re almost out of free scans!' : 
  '📊 You\'re running low on free scans.'
}

Upgrade to NutriSight Pro for:
• Unlimited scans
• Advanced AI insights  
• Health analytics dashboard
• Priority support

Upgrade now: ${upgradeUrl}

Questions? Reply to this email and we'll help you out!

Best regards,
The NutriSight Team

---
© 2024 NutriSight. All rights reserved.
Unsubscribe: ${Deno.env.get('FRONTEND_URL')}/unsubscribe?email=${encodeURIComponent(user_email)}
  `

  return { subject, html, text }
}


