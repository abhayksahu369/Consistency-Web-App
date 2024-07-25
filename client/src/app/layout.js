
// import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-900 relative flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
        {children}
        </div>
        
        <Footer/>
        </body>
      {/* <Toaster/> */}
    </html>
  );
}
