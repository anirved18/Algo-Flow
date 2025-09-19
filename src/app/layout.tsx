import Navbar from "@/components/ui/navbar"; 
import "./globals.css";

export const metadata = {
  title: "AlgoFlow",
  description: "Algorithm visualizer and flowcharts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
