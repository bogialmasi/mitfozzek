import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import { MyBackToTopButton } from "@/components/backtotop";

import { UserAuthenticationProvider } from "./context/authenticationContext";
import { MyLogoutAlert } from "@/components/login_check/alert_loggedout";
/**
 * <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
 */

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <UserAuthenticationProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col min-h-screen">
            <MyLogoutAlert />
              <Navbar />
              <main className="flex-grow">
              
                {children}
                <MyBackToTopButton />
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <Footer />
              </footer>
            </div>
          </Providers>
        </UserAuthenticationProvider>
      </body>
    </html>
  );
}