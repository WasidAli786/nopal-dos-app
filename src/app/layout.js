import { Manrope } from "next/font/google";
import Layout from "@/components/layout/Layout";
import ReactQueryProvider from "@/config/provider/ReactQueryProvider";
import NextUIThemeProvider from "@/config/provider/NextUIThemeProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "Nopal Dos | Best restaurant in USA",
  description: "best restaurant in USA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <ReactQueryProvider>
          <NextUIThemeProvider>
            <Layout>{children}</Layout>
          </NextUIThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
