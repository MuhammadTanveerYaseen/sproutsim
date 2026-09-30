# SPROUTSIM - Stay Connected Anywhere

Simple Pakistan eSIM connectivity for travelers and locals. Built with Next.js, Tailwind CSS, and Hostinger Business Email.

## Features
- **Pakistan 4G LTE eSIM Plans**: Jazz 4G, Zong Super 4G, Telenor & Ufone packages.
- **Pricing in PKR & USD**: Real-time currency switcher (PKR, USD, EUR, GBP, AED).
- **Brand Kit Aesthetics**: Flat solid color palette (`#123C2A` Forest Green, `#2FBF71` Sprout Green, `#A7E8C1` Mint, `#F5F7F2` Off White).
- **Hostinger Business Email Integration**: Automated order dispatch with SM-DP+ code and QR instructions.
- **Mobile First**: 2-column, 2-row (`2x2`) responsive grid layout on mobile viewports.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure Hostinger Business Email in `.env.local`:
```env
HOSTINGER_SMTP_HOST=smtp.hostinger.com
HOSTINGER_SMTP_PORT=465
HOSTINGER_SMTP_SECURE=true
HOSTINGER_SMTP_USER=your-email@yourdomain.com
HOSTINGER_SMTP_PASS=your-password
HOSTINGER_FROM_NAME="SproutSIM Pakistan"
HOSTINGER_FROM_EMAIL=your-email@yourdomain.com
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
