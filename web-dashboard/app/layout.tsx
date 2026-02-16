// i18n.locale: pt-BR
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Call Monitor | Dashboard Centralizado",
  description: "Sistema inteligente de monitoramento e log de chamadas WhatsApp em tempo real. Dashboard otimizado para produtividade empresarial.",
  keywords: ["WhatsApp Call Log", "Monitoramento de Chamadas", "Gestão de Atendimento", "Relatório de WhatsApp", "Produtividade de Vendas"],
  authors: [{ name: "Antigravity Team" }],
  category: "Tecnologia",
  classification: "Enterprise Software",
  openGraph: {
    title: "WhatsApp Call Monitor - Gestão de Atendimento",
    description: "Acompanhe suas chamadas WhatsApp de forma organizada e gere relatórios automáticos.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Call Monitor",
    description: "Monitoramento inteligente de chamadas para times de alta performance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased selection:bg-teal-100 selection:text-teal-900">
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
        {/* Accessible Layout: Utiliza ARIA-labels e semântica correta em componentes filhos */}
        {children}
      </body>
    </html>
  );
}
