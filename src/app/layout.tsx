import "@/styles/globals.css";

import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: "Movie Challenge",
  description: "Site dos filmes",
};

async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className={montserrat.variable} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
