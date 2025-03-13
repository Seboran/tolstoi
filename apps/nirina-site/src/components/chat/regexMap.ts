export const regexMap: { pattern: RegExp; href: string }[] = [
  // Manifest IA
  {
    pattern: /manifest|manifest|ia|intelligence artificielle/,
    href: '/ai',
  },
  // Demander le dernier article ou les nouveautés
  {
    pattern: /dernier|récents?|latest|nouveau|nouveautés|actualités/,
    href: '/blog/dernier-article',
  },

  // Accéder à tous les articles ou au blog
  { pattern: /articles?|blog|posts?|contenus?/, href: '/blog' },

  // Demande de contact, email ou prise de contact
  {
    pattern:
      /contact|email|e-mail|appel|message|joindre|écris-moi|me contacter|envoyer un message|me trouver/,
    href: '/contact',
  },

  // Questions générales
  {
    pattern: /questions?|poser une question|faq|réponses?|demandes?|besoin d'aide/,
    href: '/a-propos',
  },

  // Conférences, présentations ou balades (événements, activités)
  {
    pattern:
      /présentations?|conférences?|balades?|événements?|talks?|meetups?|ateliers?|workshops?/,
    href: '/presentations',
  },

  // À propos de vous, bio, CV ou parcours
  {
    pattern: /parler de toi|présentation|présenter|bio|à propos|cv|parcours|expérience|histoire/,
    href: '/a-propos',
  },

  // Questions liées aux projets ou portefolio
  {
    pattern: /projets?|portfolio|travail|réalisations?|mes créations?|mes travaux?/,
    href: '/projets',
  },

  // Recherche ou navigation libre
  {
    pattern: /recherche|explorer|balade|je me balade|naviguer|exploration|parcourir|curiosité/,
    href: '/projets',
  },

  // Sujets liés au blog ou conférences
  {
    pattern: /sujets?|thèmes?|articles spécifiques|catégories?|intérêts?|centres d'intérêt/,
    href: '/presentations',
  },

  // À propos de mon chat
  {
    pattern: /peppers?|chat(?!bot)|animal|animaux/,
    href: '/chat',
  },

  // Par défaut, redirige vers le blog si rien ne correspond
  { pattern: /.*/, href: '/blog' },
]
