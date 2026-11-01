import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import WishlistProvider from "@/components/WishlistProvider";

export const metadata = {
  title: "StudioSpace — Book Creative Studios",
  description:
    "Peer-to-peer marketplace for photo studios, sound stages, podcast rooms and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WishlistProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster richColors position="top-right" />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
