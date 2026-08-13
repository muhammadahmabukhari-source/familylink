# 🛡️ FamilyLink — Real-Time Family Safety App

A complete family safety web app with **real-time GPS location sharing**, group chat, SOS alerts, safe zones, check-ins, and group calling — deployable on GitHub Pages in minutes.

---

## 🚀 Quick Deploy to GitHub Pages

1. **Fork or upload** this repo to GitHub
2. Go to **Settings → Pages → Source → Deploy from branch → main**
3. Your app is live at `https://yourusername.github.io/familylink`

---

## 🔧 Setup (5 steps)

### Step 1 — Create Firebase Project
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project** → name it `familylink`
3. Disable Google Analytics (optional) → **Create Project**

### Step 2 — Enable Authentication
1. In Firebase Console → **Authentication → Get Started**
2. Enable **Email/Password** provider ✓
3. Enable **Google** provider ✓ (add your domain when prompted)

### Step 3 — Enable Firestore Database
1. **Firestore Database → Create Database**
2. Choose **Production mode** → pick your region (e.g. `asia-south1` for Pakistan)
3. Paste these **Security Rules**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /groups/{groupId} {
      allow read, write: if request.auth != null;
      match /{subcollection}/{docId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

### Step 4 — Enable Realtime Database (for GPS)
1. **Realtime Database → Create Database**
2. Choose your region → **Start in test mode**
3. Paste these **Rules**:

```json
{
  "rules": {
    "locations": {
      "$groupId": {
        ".read": "auth != null",
        "$uid": {
          ".write": "auth.uid == $uid"
        }
      }
    }
  }
}
```

### Step 5 — Add Your Keys to index.html
Open `index.html` and find this block near line 320:

```js
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

Replace with your actual config from:  
**Firebase Console → Project Settings (⚙️) → Your Apps → Config**

---

## 🗺️ Google Maps Setup (for real GPS map)

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Enable **Maps JavaScript API** and **Geocoding API**
3. Create an **API Key** → restrict it to your GitHub Pages domain
4. In `index.html`, replace `YOUR_GOOGLE_MAPS_KEY`:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_KEY&libraries=places" defer></script>
```

> **Note:** Google Maps has a free tier of $200/month (≈28,000 map loads). For a family app this is essentially free.

---

## 📱 Features

| Feature | How it works |
|---|---|
| 🔐 Login / Sign Up | Firebase Authentication (Email + Google) |
| 📍 Real-time location | Browser GPS → Firebase Realtime Database → Google Maps |
| 💬 Family group chat | Firestore real-time listener |
| 📢 Broadcast messages | Firestore + activity feed |
| 🆘 SOS alert | Writes to Firestore, triggers group call |
| ✅ Check-in | Firestore, shows in activity feed |
| 🔔 Safe zones | Geofencing via Haversine formula + Firestore |
| 👨‍👩‍👧 Member invites | Family group code system |
| 📞 Group call | UI ready — connect Agora SDK for audio |

---

## 📞 Add Real Audio Calls (Agora)

1. Sign up free at [https://www.agora.io](https://www.agora.io)
2. Create an app → get **App ID**
3. Add to `index.html` before `</body>`:
```html
<script src="https://download.agora.io/sdk/release/AgoraRTC_N.js"></script>
```
4. Replace `joinCall()` function with Agora channel join logic

---

## 🏗️ Project Structure

```
familylink/
├── index.html       ← Complete single-file app
├── README.md        ← This file
└── firebase.json    ← Firebase Hosting config (optional)
```

---

## 🌍 Add to Home Screen (PWA)

For the full app-like experience on phones:
1. Open in Chrome on Android → tap **⋮ → Add to Home Screen**
2. On iPhone Safari → tap **Share → Add to Home Screen**

---

## 💡 Tips

- **Family Group Code**: Each user gets a code like `AHMED-X7K2P`. Share it so family members can join the same group.
- **Location Privacy**: Members can toggle location sharing OFF in Settings at any time.
- **Battery Saver**: Enable in Settings to reduce GPS updates from every 30s to every 5 mins.
- **Pakistan Emergency Numbers**: Police 15 · Rescue 1122 · Fire 16 · WAPDA 118

---

## 📄 License
MIT — free to use, modify, and deploy for personal family use.
