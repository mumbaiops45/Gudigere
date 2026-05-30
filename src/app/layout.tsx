import "./globals.css";
import { Toaster } from "sonner";
import LayoutWrapper from "../components/layout/LayoutWrapper";

export const metadata = {
  title: "Goodie Gear – Toy Marketplace",
  description: "India's most loved toy store. Shop LEGO, RC cars, soft toys & more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
