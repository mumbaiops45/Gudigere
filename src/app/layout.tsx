// import "./globals.css";
// import { Toaster } from "sonner";
// import LayoutWrapper from "../components/layout/LayoutWrapper";
// import CartoonCursor from "./components/CartoonCursor";
// import RouteLoader from "./components/RouteLoader";

// export const metadata = {
//   title: "Goodie Gear – Toy Marketplace",
//   description: "India's most loved toy store. Shop LEGO, RC cars, soft toys & more.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" data-scroll-behavior="smooth">
//       <body>
//         <CartoonCursor />
//         <RouteLoader />
//         <LayoutWrapper>{children}</LayoutWrapper>
//         <Toaster position="top-right" richColors closeButton />
//       </body>
//     </html>
//   );
// }



import { Suspense } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import CartoonCursor from "./components/CartoonCursor";
import RouteLoader from "./components/RouteLoader";

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
        <CartoonCursor />
        <Suspense fallback={null}>
          <RouteLoader />
        </Suspense>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}