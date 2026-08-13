# ⚡ FamilyLink — 10-Minute Setup Guide

Follow these steps in order. Each one takes 2–3 minutes.

---

## STEP 1 — Upload to GitHub (2 min)

1. Go to https://github.com/new
2. Name your repo: `familylink`
3. Set it to **Public**
4. Click **Create repository**
5. Upload all files from this folder (drag & drop in the GitHub UI)
6. Click **Commit changes**

---

## STEP 2 — Enable GitHub Pages (1 min)

1. In your repo → **Settings → Pages**
2. Under **Source** → select **GitHub Actions**
3. The site will auto-deploy every time you push

Your URL will be: `https://YOUR-USERNAME.github.io/familylink`

---

## STEP 3 — Create Firebase Project (3 min)

1. Go to https://console.firebase.google.com
2. **Add project** → name: `familylink` → Continue
3. Disable Google Analytics → **Create Project**
4. Wait ~30 seconds for it to be ready

---

## STEP 4 — Enable Firebase Services (3 min)

### A) Authentication
- Left menu → **Authentication → Get Started**
- Enable **Email/Password** → Save
- Enable **Google** → add your GitHub Pages domain → Save

### B) Firestore Database
- Left menu → **Firestore Database → Create database**
- Choose **Production mode**
- Region: `asia-south1` (closest to Pakistan)
- Go to **Rules** tab → paste contents of `firestore.rules` file → Publish

### C) Realtime Database (for GPS)
- Left menu → **Realtime Database → Create Database**
- Choose region → **Start in locked mode**
- Go to **Rules** tab → paste contents of `database.rules.json` → Publish

---

## STEP 5 — Get Your Firebase Config (1 min)

1. In Firebase Console → click **⚙️ gear icon → Project settings**
2. Scroll down to **Your apps** → click **</>** (Web)
3. Register app name: `familylink-web`
4. Copy the `firebaseConfig` object shown

---

## STEP 6 — Add Config to index.html (2 min)

Open `index.html` and find this section (around line 320):

```javascript
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL:       "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

Replace each `"YOUR_..."` value with your actual Firebase values.

**Important:** Also make sure `databaseURL` matches your actual Realtime Database URL  
(find it in Firebase → Realtime Database — it looks like `https://familylink-xxxxx-default-rtdb.firebaseio.com`)

---

## STEP 7 — Google Maps API (optional but recommended)

1. Go to https://console.cloud.google.com
2. Select your Firebase project → **APIs & Services → Enable APIs**
3. Enable: **Maps JavaScript API** and **Geocoding API**
4. **Credentials → Create API Key**
5. Restrict it: **HTTP referrers → add** `https://YOUR-USERNAME.github.io/*`

In `index.html` find this line:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_KEY&libraries=places" defer></script>
```
Replace `YOUR_GOOGLE_MAPS_KEY` with your key.

**Free tier:** Google gives $200/month free credit = ~28,000 map loads/month. More than enough for a family.

---

## STEP 8 — Push & Go Live

1. Save your edited `index.html`
2. In GitHub → upload the updated file (or use git push)
3. GitHub Actions will auto-deploy in ~30 seconds
4. Open your URL: `https://YOUR-USERNAME.github.io/familylink`

---

## STEP 9 — Add Your Family

1. Open the app → **Sign Up** → create your account
2. Note your **Family Group Code** (shown in Settings)
3. Share the app URL + your Family Group Code with each family member
4. They open the URL → Sign Up → enter your Family Group Code
5. Everyone is now connected in real time! 🎉

---

## 📱 Add to Phone Home Screen (makes it feel like an app)

### Android (Chrome):
Tap **⋮ menu → Add to Home Screen → Add**

### iPhone (Safari):
Tap **Share button → Add to Home Screen → Add**

---

## 🔧 Troubleshooting

| Problem | Solution |
|---|---|
| Map not showing | Check Google Maps API key and billing enabled |
| Location not updating | Allow location permission in browser |
| Can't sign in | Check Firebase Auth domains include your GitHub Pages URL |
| Members not visible | Make sure everyone entered the same Family Group Code |
| Realtime Database error | Check `databaseURL` in firebaseConfig matches exactly |

---

## 💰 Costs

| Service | Free Tier | Cost After |
|---|---|---|
| Firebase Auth | 10,000 sign-ins/month | ~$0.006/user |
| Firestore | 50K reads, 20K writes/day | $0.06/100K reads |
| Realtime Database | 1 GB storage, 10 GB/month | $5/GB storage |
| Google Maps | $200 credit/month | ~$7/1000 loads |

**For a family of 5-10 people: completely FREE** 🎉

