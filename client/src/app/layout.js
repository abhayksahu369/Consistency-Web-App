
// import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body >
        <Navbar />
        {children}</body>
      {/* <Toaster/> */}
    </html>
  );
}
