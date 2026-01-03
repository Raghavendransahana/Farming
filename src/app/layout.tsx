import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { ProductProvider } from '@/contexts/ProductContext';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Native Farm",
  description: "Your Native Farm Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        <MantineProvider>
          <AuthProvider>
            <ProductProvider>
              <OrderProvider>
                <CartProvider>
                  {children}
                </CartProvider>
              </OrderProvider>
            </ProductProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
