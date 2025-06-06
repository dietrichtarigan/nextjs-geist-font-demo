# Deployment Guide for Next.js Project on Vercel

This guide explains how to deploy your Next.js project to Vercel.

## Prerequisites

- Node.js and npm installed
- Vercel account (https://vercel.com/signup)

## Steps to Deploy

1. **Install Vercel CLI (if not installed):**

```bash
npm install -g vercel
```

2. **Login to Vercel:**

```bash
vercel login
```

Follow the prompts to authenticate.

3. **Deploy the Project:**

From the root of your project directory, run:

```bash
vercel
```

This will deploy your project and provide a deployment URL.

4. **Subsequent Deployments:**

To redeploy after changes, run:

```bash
vercel --prod
```

to deploy to production.

## Additional Notes

- You can also connect your GitHub repository to Vercel for automatic deployments on push.
- Configure environment variables in the Vercel dashboard if your project requires them.
- For more details, visit the [Vercel Documentation](https://vercel.com/docs).

---

If you encounter any issues, please let me know.
