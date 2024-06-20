import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
// import Footer from "../components/footer";  // de vazut
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cft roadmap website",
  description: "developed with heart and soul by chef theo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"flex" + montserrat.className}>
        {children}
      
        {/* <Footer /> */}
      </body>
    </html>
  );
}
