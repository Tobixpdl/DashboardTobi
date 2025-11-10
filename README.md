Tobi Finance Dashboard - PWA Setup Guide
📱 Progressive Web App Features
This finance dashboard is a fully functional PWA that can be installed on any device and works offline!

🚀 Quick Start
Upload all files to your web server or GitHub Pages:
index.html
styles.css
script.js
manifest.json
service-worker.js
icon-192.png
icon-512.png
Create App Icons: You need to create two icon files. Use any of these methods: Option A: Use an online generator
Go to https://favicon.io/favicon-generator/
Create an icon with the 💸 emoji or text "TF"
Background: 
#bfe3d0 (mint green)
Download and rename files to icon-192.png and icon-512.png
Option B: Use image editing software
Create a 512x512px image with the 💸 emoji
Save as icon-512.png
Resize to 192x192px and save as icon-192.png
Option C: Simple solid color icons
Use any online tool to create solid color square images
192x192px with 
#a7c7e7 background
512x512px with 
#a7c7e7 background
Test the PWA:
Open the app in Chrome/Edge/Safari
Check if the install prompt appears
On mobile: Look for "Add to Home Screen" option
The app should work offline after first load
💡 Key Features
Expense Management
Add expenses with detailed information (name, place, amount, category)
Credit card payments - Split purchases across multiple months
Automatic calculations - Monthly expenses include installment payments
Delete expenses - Remove unwanted entries
Persistent storage - All data saved locally
Financial Tracking
Total Balance - Editable via Settings
Monthly Expenses - Automatically calculated from current month + installments
Savings Rate - Dynamic calculation based on balance and expenses
Recent Expenses List - View all transactions with categories
PWA Capabilities
✅ Install to home screen on Android/iOS
✅ Works offline after first load
✅ Standalone mode (no browser UI)
✅ Fast loading via service worker caching
✅ Responsive design works on all devices
📂 File Structure
finance-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # App logic and PWA registration
├── manifest.json       # PWA configuration
├── service-worker.js   # Offline caching
├── icon-192.png        # App icon (192x192)
├── icon-512.png        # App icon (512x512)
└── README.md          # This file
🎯 How It Works
Monthly Expenses Calculation
The app intelligently calculates monthly expenses:

Cash/Debit purchases - Count only in purchase month
Credit purchases - Spread across payment months
Example: $300 purchase in 6 payments
Shows $50/month for 6 consecutive months
Local Storage
All data is stored in browser's localStorage:

financeExpenses - Array of all expense records
financeTotalBalance - Current total balance
Offline Support
The service worker caches:

HTML, CSS, and JavaScript files
Google Fonts
App icons and manifest
🔧 Customization
Change Colors
Edit CSS variables in styles.css:

css
:root {
  --primary: #a7c7e7;  /* Main theme color */
  --mint: #bfe3d0;     /* Accent color */
  --beige: #f6ebd9;    /* Secondary accent */
}
Add Categories
Edit the category options in index.html line ~150

Modify Calculations
Edit calculation logic in script.js functions:

calculateMonthlyExpenses()
calculateSavingsRate()
📱 Installation Instructions for Users
Android (Chrome)
Open the app in Chrome
Tap the menu (⋮) → "Install app" or "Add to Home Screen"
The app icon will appear on your home screen
iOS (Safari)
Open the app in Safari
Tap the Share button
Scroll down and tap "Add to Home Screen"
Tap "Add"
Desktop (Chrome/Edge)
Open the app
Look for the install icon (⊕) in the address bar
Click "Install"
🐛 Troubleshooting
PWA not installing?

Check that all files are served over HTTPS
Verify manifest.json is accessible
Check browser console for errors
Offline mode not working?

Visit the app online at least once
Check if service worker registered (Dev Tools → Application → Service Workers)
Clear cache and reload
Data not persisting?

Check if localStorage is enabled in browser
Verify you're not in private/incognito mode
📊 Future Enhancements
Consider adding:

Charts and graphs for spending analytics
Budget limits and alerts
Income tracking
Recurring expenses
Export to CSV
Multiple currency support
Cloud sync (requires backend)
📄 License
Free to use and modify for personal or commercial projects.

Enjoy your offline-first finance dashboard! 💸

