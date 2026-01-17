# Paystack Donation Setup Guide

This guide will help you set up Paystack for accepting donations on your Hamboi Mindcare website.

## Step 1: Create a Paystack Account

1. Go to [paystack.com](https://paystack.com)
2. Click "Sign Up" and create an account
3. Verify your email address
4. Complete your business profile

## Step 2: Get Your API Keys

### For Testing (Use This First)

1. Log in to your Paystack dashboard
2. Go to **Settings** → **API Keys & Webhooks**
3. Copy your **Test Public Key** (starts with `pk_test_`)
4. This allows you to test payments without real money

### For Production (After Testing)

1. Complete your business verification on Paystack
2. Get your **Live Public Key** (starts with `pk_live_`)
3. Use this for real payments from donors

## Step 3: Add API Key to Vercel

### On Your Computer:

1. Go to **vercel.com** and sign in
2. Open your **hamboi-mindcare** project
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key:** `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - **Value:** Your Paystack public key (test or live)
   - **Environment:** Production, Preview, Development (select all)
6. Click **Save**
7. **Redeploy** your site for changes to take effect

### On Your Phone (GitHub App):

If you can't access Vercel on computer:
1. Open GitHub mobile app
2. Go to your repository
3. Navigate to `app/donate/page.tsx`
4. Find line: `publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""`
5. Replace `""` with your actual key: `"pk_test_xxxxx"`
6. Commit the change

**⚠️ Warning:** Adding the key directly to code works but is less secure. Use Vercel environment variables when possible.

## Step 4: Test the Donation Page

1. Visit **hamboimindcare.site/donate**
2. Enter test amount (e.g., ₦1000)
3. Fill in name and email
4. Click "Donate"
5. Use Paystack test card:
   - **Card Number:** 4084084084084081
   - **CVV:** 408
   - **Expiry:** Any future date
   - **PIN:** 0000
   - **OTP:** 123456

If payment succeeds, your setup is working!

## Step 5: Go Live

Once you've tested and everything works:

1. Complete business verification on Paystack
2. Get your **Live Public Key**
3. Update the environment variable in Vercel:
   - Replace test key with live key
   - Redeploy
4. Now you can accept real donations!

## Donation Page Features

Your donation page at **/donate** includes:

- **Online Payment:** Credit/debit cards via Paystack
- **Bank Transfer:** Direct OPay transfer option
- **Custom Amounts:** Donors choose any amount (minimum ₦100)
- **Impact Display:** Shows how donations help teens
- **Mobile-Friendly:** Works on all devices
- **Secure:** Paystack handles all payment security

## Accepting Payments

When someone donates:
1. They fill in amount, name, and email
2. Paystack processes the payment securely
3. Money goes directly to your Paystack account
4. You receive email notification from Paystack
5. Withdraw funds to your bank account via Paystack dashboard

## Fees

Paystack charges:
- **Local cards:** 1.5% + ₦100 (capped at ₦2,000)
- **International cards:** 3.9% + ₦100

Example: ₦5,000 donation = You receive ₦4,825 (₦175 fee)

## Support

If you need help:
- **Paystack Support:** support@paystack.com
- **Paystack Docs:** [paystack.com/docs](https://paystack.com/docs)
- **Test Cards:** [paystack.com/docs/payments/test-payments](https://paystack.com/docs/payments/test-payments)

## Security Notes

- Never share your **Secret Key** publicly
- Only use **Public Key** in your website code
- Test thoroughly before going live
- Monitor donations in Paystack dashboard
- Set up email notifications for new donations
