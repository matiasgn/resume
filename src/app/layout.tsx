import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume | Matias Guerrero",
  description: "Portafolio y currículum profesional de Matias Guerrero. Desarrollador Full Stack, experiencia en la nube, integración de hardware y software, y proyectos creativos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#f8fafc] to-[#e0f7fa] dark:from-[#181A1B] dark:to-[#23272f]`}>
        {/* Líneas LED neón animadas en el fondo */}
        <div className="pointer-events-none fixed inset-0 z-0">
          {/* Línea horizontal superior */}
          <div className="absolute top-24 left-1/4 w-1/2 h-1.5 rounded-full bg-miku/80 blur-[2px] animate-pulse-neon dark:bg-white/60 dark:animate-pulse-neon-dark" style={{ animationDelay: '0s' }} />
          {/* Línea diagonal principal */}
          <div className="absolute bottom-32 left-0 w-2/3 h-1.5 rounded-full bg-accent/70 blur-[2px] rotate-[-8deg] animate-pulse-neon dark:bg-white/40 dark:animate-pulse-neon-dark" style={{ animationDelay: '1s' }} />
          {/* Línea vertical derecha */}
          <div className="absolute top-1/3 right-12 w-1.5 h-1/3 rounded-full bg-miku/60 blur-[2px] animate-pulse-neon dark:bg-white/30 dark:animate-pulse-neon-dark" style={{ animationDelay: '2s' }} />
          {/* Línea horizontal inferior */}
          <div className="absolute bottom-16 left-1/3 w-1/3 h-1.5 rounded-full bg-[#00fff7]/70 blur-[2px] animate-pulse-neon dark:bg-white/40 dark:animate-pulse-neon-dark" style={{ animationDelay: '2.5s' }} />
          {/* Línea diagonal secundaria */}
          <div className="absolute top-1/2 left-0 w-1/2 h-1.5 rounded-full bg-[#FF69B4]/60 blur-[2px] rotate-[12deg] animate-pulse-neon dark:bg-white/30 dark:animate-pulse-neon-dark" style={{ animationDelay: '1.5s' }} />
          {/* Línea vertical izquierda */}
          <div className="absolute top-1/4 left-8 w-1.5 h-1/4 rounded-full bg-miku/50 blur-[2px] animate-pulse-neon dark:bg-white/20 dark:animate-pulse-neon-dark" style={{ animationDelay: '3s' }} />
        </div>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
