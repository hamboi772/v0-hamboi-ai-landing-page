# How to Connect hamboi.ng to Your Vercel Website

## Step 1: Buy hamboi.ng Domain

**Recommended Nigerian Registrars:**
- **Qservers.ng** - https://qservers.ng
- **Whogohost.com** - https://whogohost.com
- **Web4Africa.com** - https://web4africa.com

**Cost:** ₦5,000 - ₦10,000 per year

**What to do:**
1. Go to any registrar above
2. Search for "hamboi.ng"
3. Add to cart and complete purchase
4. You'll receive login details via email

---

## Step 2: Get DNS Settings from Vercel

1. Go to **vercel.com/dashboard**
2. Click your **Hamboi project**
3. Go to **Settings** tab
4. Click **Domains** in the sidebar
5. Click **"Add Domain"**
6. Type: `hamboi.ng`
7. Click **"Add"**

**Vercel will show you DNS records like this:**

\`\`\`
Type: A
Name: @
Value: 76.76.21.21
\`\`\`

\`\`\`
Type: CNAME
Name: www
Value: cname.vercel-dns.com
\`\`\`

**Copy these values - you'll need them in Step 3**

---

## Step 3: Add DNS Records to Your Domain

1. Log in to your domain registrar (Qservers, Whogohost, etc.)
2. Find **DNS Management** or **DNS Settings**
3. Look for **"Add Record"** or **"Manage DNS"**
4. Add the records Vercel gave you:

**Record 1:**
- Type: `A`
- Host/Name: `@` (or leave blank)
- Value: `76.76.21.21` (use the IP Vercel gave you)
- TTL: `3600` (or Auto)

**Record 2:**
- Type: `CNAME`
- Host/Name: `www`
- Value: `cname.vercel-dns.com` (use what Vercel gave you)
- TTL: `3600` (or Auto)

5. Click **"Save"** or **"Add Record"**

---

## Step 4: Wait for DNS Propagation

**Time:** 1-48 hours (usually 2-6 hours)

**What happens:**
- DNS servers worldwide update with your new settings
- Your domain starts pointing to your Vercel website

**Check if it's working:**
- Visit https://hamboi.ng in your browser
- If you see your Hamboi MindCare website, it's working!
- If not, wait a few more hours

---

## Step 5: Verify in Vercel

1. Go back to **Vercel Dashboard** → **Domains**
2. Your domain should show a **green checkmark ✓**
3. If it shows orange/pending, DNS is still propagating - wait longer
4. If it shows red/error, double-check your DNS records

---

## Troubleshooting

**Problem: Domain not connecting after 24 hours**
- Check DNS records match exactly what Vercel provided
- Remove any extra spaces in the values
- Contact your registrar's support

**Problem: "Invalid Configuration"**
- Make sure you added BOTH A and CNAME records
- The A record should point to @ or root
- The CNAME should point to www

**Problem: Certificate/SSL Error**
- Wait 24 hours for Vercel to generate SSL certificate
- It happens automatically, no action needed

---

## After Setup is Complete

**Your website will be accessible at:**
- https://hamboi.ng (main domain)
- https://www.hamboi.ng (www version)
- Old URL still works: https://v0-hamboi-ai-landing-page-7e7t-ge0ebg3mq.vercel.app

**Next steps:**
- Share your new professional domain everywhere
- Update your social media links
- Update your QR code if needed (I can help with this)

---

## Need Help?

If you get stuck, send me:
1. Screenshot of your DNS records
2. Screenshot of Vercel domain settings
3. Any error messages you see

I'll help you troubleshoot!
