import '../globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='16'>✨</text></svg>"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Primary Meta Tags */}
        <title>Briller - Simulateur de revenus freelance vs salariat</title>
        <meta name="title" content="Briller - Simulateur de revenus freelance vs salariat" />
        <meta
          name="description"
          content="Calculez votre taux journalier idéal en freelance pour maintenir votre niveau de vie actuel. Simulation personnalisée par métier ✨"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freelance-simulateur.netlify.app/" />
        <meta property="og:title" content="Briller - Simulateur de revenus freelance vs salariat" />
        <meta
          property="og:description"
          content="Calculez votre taux journalier idéal en freelance pour maintenir votre niveau de vie actuel. Simulation personnalisée par métier ✨"
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=1200&h=630&fit=crop&auto=format"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://freelance-simulateur.netlify.app/" />
        <meta
          property="twitter:title"
          content="Briller - Simulateur de revenus freelance vs salariat"
        />
        <meta
          property="twitter:description"
          content="Calculez votre taux journalier idéal en freelance pour maintenir votre niveau de vie actuel. Simulation personnalisée par métier ✨"
        />
        <meta
          property="twitter:image"
          content="https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=1200&h=630&fit=crop&auto=format"
        />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#4F46E5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="canonical" href="https://freelance-simulateur.netlify.app/" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
