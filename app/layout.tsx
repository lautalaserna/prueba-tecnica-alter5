import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
});

export const metadata: Metadata = {
  title: "Lista de Productos",
  description: "Prueba Técnica de Lauti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`} >
        {children}
        <footer className="h-[100px] flex items-center justify-center">
          <span>Hecho con amor por Lauti ❤️</span>
        </footer>
      </body>
    </html>
  );
}
