/**
 * FUENTE ÚNICA DE PRECIOS — Yassin Fennir
 * =======================================
 * Estos son los MISMOS precios que están publicados en https://fennir.ch
 * Si cambias un precio, cámbialo AQUÍ y en fennir.ch: nada más en este repo
 * escribe un precio a mano. Después ejecuta:  node verificar-precios.mjs
 *
 * Todos los precios son en CHF, sin IVA (el precio que se ve es el que se paga).
 */
window.FENNIR_PRICING = {
  source: "https://fennir.ch",
  updated: "2026-09-22",
  currency: "CHF",
  whatsapp: "41764963369",

  note: {
    es: "Todos los precios en CHF. Sin IVA — el precio que ves es el precio que pagas. Precio fijo acordado antes de empezar: nunca una factura sorpresa.",
    de: "Alle Preise in CHF. Keine MwSt. — der Preis, den Sie sehen, ist der Preis, den Sie zahlen. Festpreis vor Projektbeginn: nie eine Überraschungsrechnung."
  },

  /* Proyectos — pago único */
  services: [
    {
      id: "telefon-assistentin",
      icon: "📞",
      featured: true,
      badge: { es: "El producto estrella", de: "Das Kernprodukt" },
      name: { es: "Asistente telefónica IA", de: "Telefon-Assistentin" },
      desc: {
        es: "Una asistente de IA que contesta el teléfono del negocio, responde a las preguntas de tus clientes y agenda las citas — 24/7, también de noche y en fin de semana. No vuelves a perder una llamada, ni cuando estás atendiendo a otro cliente.",
        de: "Eine KI-Assistentin, die ans Geschäftstelefon geht, Kundenfragen beantwortet und Termine erfasst — rund um die Uhr, auch nachts und am Wochenende. Sie verpassen keinen Anruf mehr, auch wenn Sie gerade am Kunden sind."
      },
      price: 1900,
      schemaName: "AI phone assistant (Telefon-Assistentin), setup",
      setupLabel: { es: "instalación", de: "Einrichtung" },
      monthly: 369,
      monthlySchemaName: "AI phone assistant, monthly service"
    },
    {
      id: "landingpage",
      icon: "⚡",
      name: { es: "Landing page", de: "Landingpage" },
      desc: {
        es: "Una página clara y rápida que convierte visitas en clientes. Ideal para empezar a que te encuentren.",
        de: "Eine klare, schnelle Seite, die Besucher zu Kunden macht. Ideal, um gefunden zu werden."
      },
      price: 1900,
      schemaName: "Landing Page"
    },
    {
      id: "website",
      icon: "🌐",
      name: { es: "Web completa", de: "Komplette Website" },
      desc: {
        es: "Varias páginas, tu marca, formularios de contacto, lista para Google y para los asistentes de IA.",
        de: "Mehrere Seiten, Ihre Marke, Kontaktformulare, bereit für Google und für KI-Assistenten."
      },
      price: 3900,
      schemaName: "Complete Website"
    },
    {
      id: "webapp",
      icon: "🔧",
      name: { es: "Web App", de: "Web App" },
      desc: {
        es: "Un producto online de verdad: login, base de datos, pagos. Crece contigo.",
        de: "Ein echtes Online-Produkt: Login, Datenbank, Zahlungen. Wächst mit Ihnen mit."
      },
      price: 9900,
      schemaName: "Web App"
    },
    {
      id: "automation",
      icon: "🤖",
      name: { es: "Automatización", de: "Automation" },
      desc: {
        es: "Conecto tus herramientas para que el trabajo repetitivo se haga solo — y ganes horas cada semana.",
        de: "Ich verbinde Ihre Werkzeuge, damit die immer gleiche Arbeit von selbst läuft — und Sie jede Woche Stunden gewinnen."
      },
      price: 4900,
      schemaName: "Automation"
    },
    {
      id: "chatbot",
      icon: "💬",
      name: { es: "Chatbot", de: "Chatbot" },
      desc: {
        es: "Un asistente de chat en tu web que responde preguntas y agenda citas — también fuera del horario de oficina.",
        de: "Ein Chat-Assistent auf Ihrer Website, der Kundenfragen beantwortet und Termine erfasst — auch ausserhalb der Bürozeiten."
      },
      price: 2400,
      schemaName: "Chatbot"
    }
  ],

  /* Servicios recurrentes — mensuales, cancelables */
  retainers: [
    {
      id: "care",
      name: { es: "Website Care", de: "Website Care" },
      desc: {
        es: "Hosting, actualizaciones, seguridad, uptime y cambios pequeños. Cancelable cada mes.",
        de: "Hosting, Updates, Sicherheit, Uptime und kleine Änderungen. Monatlich kündbar."
      },
      price: 199,
      from: false,
      meta: { es: "Sin contrato · Cancelas cuando quieras", de: "Kein Vertrag · Jederzeit kündbar" },
      cta: { es: "Empezar Care", de: "Care starten" },
      schemaName: "Monthly Care"
    },
    {
      id: "partner",
      name: { es: "Partner técnico", de: "Technischer Partner" },
      desc: {
        es: "10 horas fijas al mes para desarrollo y mejoras continuas. Tu socio técnico, no un proveedor de una sola vez.",
        de: "10 feste Stunden pro Monat für laufende Entwicklung und Verbesserungen. Ihr Technikpartner, kein einmaliger Dienstleister."
      },
      price: 1500,
      from: true,
      meta: { es: "10 h/mes incluidas · Soporte prioritario", de: "10 Std./Monat inklusive · Bevorzugter Support" },
      cta: { es: "Solicitar partnership", de: "Partnerschaft anfragen" },
      schemaName: "Technical Partner, monthly"
    }
  ]
};
