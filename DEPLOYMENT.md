# 🚀 Deployment Guide

This guide covers how to deploy **thom.chat** to various platforms. Currently supported:

- [Vercel](#vercel-deployment) (Recommended)

---

## Vercel Deployment

### Prerequisites

- A [Vercel](https://vercel.com) account
- A [Convex](https://convex.dev) account
- GitHub/Google OAuth credentials (optional, for authentication)
- API keys for AI providers (OpenRouter, Groq, or Gemini)

### Step 1: Fork and Clone the Repository

1. Fork this repository to your GitHub account
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/thom-chat.git
   cd thom-chat
   ```

### Step 2: Set Up Convex Backend

1. Install Convex CLI globally:
   ```bash
   npm install -g convex
   ```

2. Log in to Convex:
   ```bash
   npx convex login
   ```

3. Initialize Convex for your project:
   ```bash
   npx convex dev
   ```
   
   This will:
   - Create a new Convex project (or connect to an existing one)
   - Generate a `CONVEX_DEPLOYMENT` URL
   - Set up the database schema

4. Note down your Convex deployment URL (format: `https://your-project.convex.cloud`)

### Step 3: Set Up OAuth (Optional)

If you want to enable GitHub or Google authentication:

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: thom.chat (or your preferred name)
   - **Homepage URL**: `https://your-app.vercel.app` (you'll get this after deploying)
   - **Authorization callback URL**: `https://your-app.vercel.app/api/auth/callback/github`
4. Save your `Client ID` and `Client Secret`

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure:
   - **Application type**: Web application
   - **Authorized redirect URIs**: `https://your-app.vercel.app/api/auth/callback/google`
6. Save your `Client ID` and `Client Secret`

### Step 4: Deploy to Vercel

#### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your deployment

#### Option B: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click "Import Project"
3. Import your GitHub repository
4. Vercel will auto-detect the SvelteKit framework

### Step 5: Configure Environment Variables

In your Vercel project dashboard, go to **Settings** → **Environment Variables** and add the following:

#### Required Variables

```bash
# Convex Configuration
CONVEX_DEPLOYMENT=https://your-project.convex.cloud
PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Site URL (your Vercel deployment URL)
CONVEX_SITE_URL=https://your-app.vercel.app

# Authentication Secret (generate a random string)
BETTER_AUTH_SECRET=your-random-secret-key-here
```

**How to generate `BETTER_AUTH_SECRET`:**
```bash
openssl rand -base64 32
```

#### OAuth Variables (Optional)

```bash
# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### AI Provider Keys (Optional)

Add at least one to enable AI chat features:

```bash
# OpenRouter (recommended - supports 400+ models)
OPENROUTER_FREE_KEY=sk-or-v1-your-key-here

# Groq (optional - ultra-fast inference)
GROQ_API_KEY=gsk_your-key-here

# Google Gemini (optional)
GEMINI_API_KEY=AIza-your-key-here
```

**Where to get API keys:**
- **OpenRouter**: [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
- **Groq**: [console.groq.com/keys](https://console.groq.com/keys)
- **Gemini**: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### Step 6: Update Convex Site URL

After deploying to Vercel, update your Convex configuration:

1. Go to your Convex dashboard
2. Navigate to your project settings
3. Update the **Site URL** to your Vercel deployment URL:
   ```
   https://your-app.vercel.app
   ```

### Step 7: Redeploy

After configuring environment variables:

1. Go to your Vercel project dashboard
2. Click **Deployments** tab
3. Click the **Redeploy** button on your latest deployment

Alternatively, push a new commit to your repository to trigger a deployment:
```bash
git commit --allow-empty -m "Trigger Vercel deployment"
git push
```

### Step 8: Verify Deployment

1. Visit your deployed URL: `https://your-app.vercel.app`
2. Test authentication (if configured)
3. Test AI chat functionality with your configured providers

---

## Build Commands for Vercel

Vercel should auto-detect these, but if you need to configure manually:

- **Framework Preset**: SvelteKit
- **Build Command**: `npm run build` (or `pnpm build`)
- **Output Directory**: `.svelte-kit` (auto-detected)
- **Install Command**: `npm install` (or `pnpm install`)
- **Development Command**: `npm run dev`

---

## Troubleshooting

### Convex Connection Issues

If you see "Failed to connect to Convex":
1. Verify `CONVEX_DEPLOYMENT` and `PUBLIC_CONVEX_URL` are identical
2. Ensure the URL includes `https://` and ends with `.convex.cloud`
3. Check that Convex project is active in your dashboard

### Authentication Errors

If OAuth isn't working:
1. Verify callback URLs match exactly (including `https://`)
2. Check that client IDs and secrets are correct
3. Ensure `BETTER_AUTH_SECRET` is set and is a secure random string

### Build Failures

If builds fail on Vercel:
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Try clearing build cache: **Settings** → **General** → **Clear Build Cache**

### Missing AI Providers

If Groq/Gemini aren't showing up:
1. Verify you've added the respective API keys in Vercel
2. Clear your browser cache and reload
3. Check API key validity on the provider's dashboard

---

## Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `CONVEX_DEPLOYMENT` | ✅ Yes | Convex project URL |
| `PUBLIC_CONVEX_URL` | ✅ Yes | Same as CONVEX_DEPLOYMENT |
| `CONVEX_SITE_URL` | ✅ Yes | Your Vercel deployment URL |
| `BETTER_AUTH_SECRET` | ✅ Yes | Random secret key for auth |
| `GITHUB_CLIENT_ID` | ⚪ Optional | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | ⚪ Optional | GitHub OAuth secret |
| `GOOGLE_CLIENT_ID` | ⚪ Optional | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ⚪ Optional | Google OAuth secret |
| `OPENROUTER_FREE_KEY` | ⚪ Optional | OpenRouter API key |
| `GROQ_API_KEY` | ⚪ Optional | Groq API key |
| `GEMINI_API_KEY` | ⚪ Optional | Gemini API key |

---

## Monitoring and Logs

- **Vercel Logs**: Available in your project dashboard under **Deployments** → Click deployment → **Logs**
- **Convex Logs**: Available in Convex dashboard under your project → **Logs**

---

## Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel dashboard → **Settings** → **Domains**
2. Add your domain
3. Update DNS records as instructed by Vercel
4. Update OAuth callback URLs to use your custom domain
5. Update `CONVEX_SITE_URL` to your custom domain

---

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Open an Issue](https://github.com/tglide/thom-chat/issues)
