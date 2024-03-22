import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../../firebase.config";
import StoreProvider from "./providers/StoreProvider";
import AuthProvider from "./providers/AuthProvider";
import APIProvider from "./providers/ApiProvider";
import { Toaster } from "react-hot-toast";
import DataProvider from "./providers/DataProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export default function RootLayout({ children, locale }: RootLayoutProps) {
  return (
    <html lang={locale} dir="rtl">
      <body className={`${inter.className}`}>
        <StoreProvider>
          <AuthProvider>
            <APIProvider>
              <DataProvider>
                <div className="p-4">{children}</div>
              </DataProvider>
            </APIProvider>
            <Toaster />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
