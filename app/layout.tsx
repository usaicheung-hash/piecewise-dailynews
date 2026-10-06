import type { Metadata } from "next";
import { Inter, Noto_Sans_HK } from "next/font/google";
import "./globals.css";
import { Nav } from "./ui/nav";
import { PwaRegister } from "./ui/pwa-register";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto = Noto_Sans_HK({ subsets: ["latin"], weight: ["400","500","700","900"], variable: "--font-noto" });

export const metadata: Metadata = {
  title: "PieceWise AI — 香港 AI Intelligence Hub",
  description: "香港 AI 情報與學習站。新聞來源、模型比較、API 成本計算、Skills、MCP 同 Codex/Hermes 實作教學，一塊一塊學識 AI。",
  manifest: "/manifest.webmanifest",
  applicationName: "PieceWise AI",
  appleWebApp: { capable: true, title: "PieceWise AI", statusBarStyle: "black-translucent" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: { title: "PieceWise AI · AI, piece by piece", description: "香港 AI 情報、工具比較與實作教學。一塊一塊，學識佢。", type: "website" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-Hant-HK" suppressHydrationWarning><body className={`${inter.variable} ${noto.variable}`}><PwaRegister /><Nav />{children}</body></html>;
}
