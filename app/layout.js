import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "N-finity",
  description: "Site E-commerce Belfort Harrach , Alger , Algérie",
  openGraph: {
    title: "N-finity",
    description: "Site E-commerce Belfort Harrach , Alger , Algérie",
    images: ["/logo2.png"],
  },
  verification: {
    google: "Lx1BtB0-ANJfM7wHL4GCgqdPsJy187ymjGL5ZLQHlI0",
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
