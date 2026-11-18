import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.axivers.com';

export const viewport: Viewport = {
  themeColor: '#060606',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Axivers | Premium Everyday Essentials — Sri Lanka',
    template: '%s | Axivers',
  },
  description:
    'Discover Axivers, a Sri Lankan premium lifestyle apparel brand focused on minimalist design, refined everyday comfort, and considered craftsmanship.',
  keywords: [
    'Axivers',
    'Axivers Clothing',
    'Sri Lanka luxury apparel',
    'athletic luxury',
    'mercerized cotton t-shirt',
    'elevated essentials',
    'minimalist menswear',
    'Colombo fashion',
    'Own Your Axis',
  ],
  authors: [{ name: 'Axivers Clothing (Pvt) Ltd' }],
  creator: 'Axivers Clothing (Pvt) Ltd',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Axivers',
    title: 'Axivers | Premium Everyday Essentials — Sri Lanka',
    description:
      'Discover Axivers, a Sri Lankan premium lifestyle apparel brand focused on minimalist design, refined everyday comfort, and considered craftsmanship.',
    images: [
      {
        url: '/images/editorial-men-black.jpg',
        width: 1200,
        height: 630,
        alt: 'Axivers Elevated Essentials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axivers | Premium Everyday Essentials — Sri Lanka',
    description:
      'Discover Axivers, a Sri Lankan premium lifestyle apparel brand focused on minimalist design, refined everyday comfort, and considered craftsmanship.',
    images: ['/images/editorial-men-black.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-brand-dark text-brand-light flex flex-col transition-colors duration-300 antialiased selection:bg-white selection:text-black">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
