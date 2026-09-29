# OpenAI API Setup (Free Alternative)

When Gemini API is overloaded (503 error), the app automatically falls back to OpenAI's API.

## Get Your Free OpenAI API Key

1. **Go to OpenAI Platform**
   - Visit: https://platform.openai.com/signup
   - Sign up or log in

2. **Get API Key**
   - Click on your profile (top right)
   - Select "API Keys"
   - Click "Create new secret key"
   - Copy the key (starts with `sk-...`)

3. **Add to Your App**
   - Open `.env.local` file
   - Replace `your-openai-api-key-here` with your actual key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   NEXT_PUBLIC_OPENAI_API_KEY=sk-your-actual-key-here
   ```

4. **Restart the dev server**
   ```bash
   npm run dev
   ```

## Free Tier Details

- **$5 free credits** for new accounts
- Uses **GPT-3.5-Turbo** model
- Good for testing and development
- Automatic fallback when Gemini fails

## How It Works

The app automatically tries:
1. **Gemini API first** (if key exists)
2. **OpenAI API as fallback** (if Gemini fails or overloaded)

You'll see console logs showing which API is being used:
- `"Attempting Gemini API..."` → Using Gemini
- `"Gemini is overloaded (503), switching to OpenAI..."` → Falling back
- `"Using OpenAI API..."` → Using OpenAI

## No API Keys? No Problem!

If you don't want to set up any keys yet, you can still use the app's basic features. The AI features will just show placeholder content.

## Security Note

⚠️ Never commit `.env.local` to git - it's already in `.gitignore`
