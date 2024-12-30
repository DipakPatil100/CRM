import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
// import "./page.module.css";
import ClientWrapper from "@/components/clientWrapper/ClientWrapper";
import { Chicle } from "next/font/google";
import StoreProvider from "./storeProvider/storeProvider";
import { Suspense } from "react";
import { Box, Skeleton } from "@mui/material";
import SkeletonDashboard from "./(DashboardLayout)/layout/dashboardSkeleton";
import "../app/globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const APP_NAME = "PWA-Dashboard App";
const APP_DEFAULT_TITLE = "Real Estate CRM";
const APP_TITLE_TEMPLATE = "%s - CRM App";
const APP_DESCRIPTION = "Best CRM app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: "default",
  //   title: APP_DEFAULT_TITLE,
  //   // startUpImage: [],
  // },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  
  return (
    <html lang="en">
      <head />
      <body>
        <div>
        <ClientWrapper>
          <StoreProvider>
           {children}
          </StoreProvider>
        </ClientWrapper>
        </div>
      </body>
    </html>
  );
}
