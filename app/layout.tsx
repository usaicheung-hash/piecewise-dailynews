import type { Metadata } from "next";
import { Inter, Noto_Sans_HK } from "next/font/google";
import "./globals.css";
import { Nav } from "./ui/nav";
import { PwaRegister } from "./ui/pwa-register";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto = Noto_Sans_HK({ subsets: ["latin"], weight: ["400","500","700","900"], variable: "--font-noto" });

export const metadata: Metadata = {
  title: "PieceWise AI — 香港 AI Intelligence Hub",
  description: "香港人逢星期二、四、六睇 AI 必去：AI 新聞、香港 AI、Model 排行、價錢、Skills、MCP 與 Codex/Hermes 教學。",
  manifest: "/manifest.webmanifest",
  applicationName: "PieceWise AI",
  appleWebApp: { capable: true, title: "PieceWise AI", statusBarStyle: "black-translucent" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: { title: "PieceWise AI", description: "香港人逢星期二、四、六睇 AI 必去嘅 Intelligence Hub", type: "website" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-Hant-HK" suppressHydrationWarning><body className={`${inter.variable} ${noto.variable}`}><PwaRegister /><Nav />{children}</body></html>;
}
