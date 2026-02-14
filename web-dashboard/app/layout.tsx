// i18n.locale: pt-BR
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Call Monitor | Dashboard Centralizado",
  description: "Sistema inteligente de monitoramento e log de chamadas WhatsApp em tempo real.",
  keywords: ["WhatsApp", "Call Log", "Monitoramento", "Dashboard", "Produtividade"],
  authors: [{ name: "Antigravity Team" }],
  openGraph: {
    title: "WhatsApp Call Monitor",
    description: "Acompanhe suas chamadas WhatsApp de forma organizada e centralizada.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <h1 className="sr-only">WhatsApp Call Monitor</h1>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "WhatsApp Call Monitor",
              "operatingSystem": "Web, Android",
              "applicationCategory": "BusinessApplication",
              "description": "Monitoramento centralizado de logs de chamadas WhatsApp."
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
