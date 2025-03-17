# VitalPredict AI

VitalPredict AI is an innovative health monitoring application that uses artificial intelligence to predict health outcomes based on vital signs data. The platform provides personalized health insights and early warning indicators for potential health issues.

## Features

- AI-powered health prediction and monitoring
- Interactive dashboard for tracking vital signs
- Personalized health recommendations
- Secure user authentication and data privacy
- Subscription-based access to premium features
- Mobile-responsive design

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Serverless API routes
- **Database**: Supabase (PostgreSQL)
- **Payment Processing**: Stripe
- **Analytics**: Google Analytics 4
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account
- Stripe account
- Google Analytics account (for production)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Bosses20/VitalPredict-AI.git
   cd VitalPredict-AI
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file with the following variables:
   ```
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PRICE_ID=your_stripe_price_id

   # Google Analytics (for production)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

See the [DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to Vercel.

## Documentation

- [Getting Started Guide](./GETTING_STARTED.md)
- [Next Steps](./NEXT_STEPS.md)
- [Project Timeline](./PROJECT_TIMELINE.md)
- [Analytics Setup](./docs/ANALYTICS_SETUP_GUIDE.md)

## License

This project is proprietary software. All rights reserved.
