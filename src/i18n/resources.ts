export const BRAND = "FunFactory" as const;
export const DEFAULT_LANG = "ro" as const;
export const SUPPORTED_LANGS = ["ro", "en"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const resources = {
  ro: {
    translation: {
      brand: BRAND,
      nav: {
        playZones: "Zone de joacă",
        parties: "Petreceri",
        cafe: "Cafenea",
        safety: "Siguranță",
        contact: "Contact",
        bookNow: "Rezervă acum",
        language: "Limbă",
      },
      packages: {
        basic: "Distracție Basic",
        premium: "Bucurie Premium",
        vip: "Utopie VIP",
      },
      booking: {
        title: "Rezervă sesiunea ta de bucurie",
        subtitle: "Alege o dată și un pachet — noi ne ocupăm de restul",
        selectDate: "Alege o dată",
        yourDetails: "Datele tale",
        firstName: "Prenume",
        lastName: "Nume",
        email: "Adresă de email",
        phone: "Telefon",
        choosePackage: "Alege pachetul",
        selectStartTime: "Alege ora de început",
        selectDateToSeeTimes: "Alege o dată pentru a vedea orele disponibile.",
        payDeposit: "Plătește avansul de 10% și confirmă",
        preparingPayment: "Pregătim plata...",
        processingPayment: "Procesăm plata...",
        completePayment: "Finalizează plata",
        vipAllDay: "Acces toată ziua",
        vipUnavailable: "Indisponibil",
        vipAvailableWholeDay: "Disponibil (toată ziua)",
      },
      success: {
        title: "Plata a fost efectuată!",
        subtitle: "Avansul de 10% a fost încasat. Rezervarea ta este confirmată.",
        backHome: "Înapoi la pagina principală",
        emailSent: "Un email de confirmare a fost trimis în inbox.",
        paymentNotCompleted: "Plata nu a fost finalizată",
        paymentIssue: "A apărut o problemă la plată.",
        cancellationPolicy:
          "Politică anulare: poți anula cu cel puțin 2 zile înainte pentru a primi banii înapoi. În caz contrar, avansul nu se returnează.",
      },
      reservation: {
        confirmed: "Rezervare confirmată",
        heading: `Ne vedem la ${BRAND}`,
        save: "Salvează această pagină — o poți deschide oricând înainte de petrecere.",
        package: "Pachet",
        date: "Data",
        time: "Ora",
        guests: "Număr invitați incluși",
        zone: "Zonă",
        ref: "Ref.",
        backHome: "Înapoi acasă",
        wholeDay: "Toată ziua (acces VIP)",
      },
      admin: {
        title: "Admin",
        reservations: "Rezervări",
        tzNote: "Orele sunt afișate în ora București.",
        latest: "cele mai recente",
        when: "Când",
        package: "Pachet",
        guests: "Invitați",
        email: "Email",
        status: "Status",
        payment: "Plată",
        deposit: "Avans",
        bookingId: "ID rezervare",
        created: "Creat",
        paid: "plătit",
        notPaid: "neplătit",
        noReservations: "Nu există rezervări încă.",
      },
      email: {
        confirmationPreview:
          "Rezervarea ta FunFactory este confirmată — vezi detaliile",
        booked: "Rezervarea ta e confirmată,",
        lede:
          "Avansul a fost achitat. Salvează linkul de mai jos — îl poți deschide oricând înainte de petrecere.",
        saveLink: "Salvează linkul de mai jos",
        viewReservation: "Vezi rezervarea →",
        package: "Pachet",
        date: "Data",
        time: "Ora",
        guests: "Invitați incluși",
        reference: "Referință",
        footerLeft: "Bucurie sofisticată",
        footerRight: BRAND,
      },
      errors: {
        startPaymentFailed: "Nu am putut porni plata. Încearcă din nou.",
        paymentFailed: "Plata a eșuat",
        confirmationFailed: "Plata a reușit, dar confirmarea a eșuat.",
      },
      toasts: {
        paymentSuccess: "Plata a reușit! Rezervarea ta este confirmată.",
      },
      home: {
        explore: "Explorează lumea noastră",
        heroTitleLine1: "Zone de",
        heroTitleEmphasis: "Bucurie Pură.",
        heroBody:
          "Conceput pentru joacă rafinată. Fiecare zonă este un spațiu atent curatat care îmbină activitatea fizică energică cu descoperirea creativă.",
        infinityTitle: "Piscina infinită cu bile",
        infinityBody:
          "Un ocean de 50.000 de perle antimicrobiene. Un peisaj senzorial creat pentru plutire și încântare tactilă.",
        ages: "Vârste 3–12",
        toddlerTitleLine1: "Sanctuar",
        toddlerTitleLine2: "pentru cei mici",
        toddlerBody:
          "Margini moi, forme organice și panouri senzoriale blânde pentru cei mai mici exploratori.",
        toddlerBullet1: "Suprafețe complet capitonate",
        toddlerBullet2: "Panouri senzoriale interactive",
        jungleTitle: "Junglă suspendată",
        jungleBody:
          "Un labirint arhitectural pe mai multe niveluri, din lemn sustenabil și punți de frânghie.",
        jungleTag1: "Agilitate",
        jungleTag2: "Inspirat din natură",
        climbTitleLine1: "Cățărare",
        climbTitleLine2: "la înălțime",
        climbBody:
          "Prize geometrice turnate și sisteme auto-belay pentru distracție sigură, fără griji.",
        climbCta: "Învață tehnici",
        artTitle: "Atelier de artă",
        artBody:
          "Acolo unde micii Picasso își găsesc pânza digitală și fizică.",
        safetyBannerTitle: "Siguranța pe primul loc, mereu.",
        safetyBannerBody:
          "Curățat din oră în oră cu dezinfectanți eco-certificați. Supravegheat complet de \"Joy Guides\".",
        safetyBannerCta: "Vezi protocolul de siguranță",
      },
      footer: {
        about:
          "Redefinim experiența locului de joacă indoor prin prisma bucuriei sofisticate și a arhitecturii spectaculoase.",
        explore: "Explorează",
        privacy: "Politica de confidențialitate",
        terms: "Termeni și condiții",
        safety: "Reguli de siguranță",
        connect: "Conectează-te",
        contact: "Contact",
        newsletter: "Abonează-te la newsletter",
        stay: "Rămâi la curent",
        stayBody:
          "Primește invitații la evenimente și tips & tricks de joacă, direct pe email.",
        emailPlaceholder: "Adresă de email",
        subscribe: "Abonează-te",
        copyright:
          "© 2026 FunFactory. Toate drepturile rezervate. Creat pentru bucurie sofisticată.",
      },
      privacyPage: {
        title: "Politica de confidențialitate",
        updated: "Ultima actualizare: 5 mai 2026",
        intro:
          "Respectăm confidențialitatea ta. Această pagină explică ce date colectăm, de ce le folosim și ce opțiuni ai.",
        sections: {
          s1t: "Ce colectăm",
          s1b:
            "Putem colecta date de contact (ex. email) atunci când faci o rezervare sau te abonezi la newsletter, plus date tehnice minime pentru funcționarea site-ului.",
          s2t: "Cum folosim datele",
          s2b:
            "Folosim datele pentru a confirma rezervări, a trimite comunicări relevante (ex. confirmări), a îmbunătăți experiența și pentru obligații legale.",
          s3t: "Drepturile tale",
          s3b:
            "Poți solicita acces, rectificare sau ștergere, ori te poți dezabona oricând de la comunicări. Scrie-ne din pagina de contact.",
        },
      },
      termsPage: {
        title: "Termeni și condiții",
        updated: "Ultima actualizare: 5 mai 2026",
        intro:
          "Prin utilizarea FunFactory, ești de acord cu termenii de mai jos. Aceștia descriu regulile de utilizare și condițiile de rezervare.",
        sections: {
          s1t: "Rezervări și plăți",
          s1b:
            "Rezervările se confirmă după plata avansului. Detaliile rezervării (data/ora/pachet) sunt afișate în linkul de confirmare primit pe email.",
          s2t: "Reguli de siguranță",
          s2b:
            "Te rugăm să respecți regulile de siguranță și indicațiile personalului. Pentru detalii complete, vezi pagina de Siguranță.",
          s3t: "Modificări",
          s3b:
            "Putem actualiza acești termeni periodic. Versiunea curentă este publicată pe această pagină.",
        },
      },
      cafe: {
        badge: "Oază pentru părinți",
        heroTitleLine1: "Cafeneaua confortabilă,",
        heroTitleLine2: "unde părinții respiră.",
        heroBody:
          "Cafea premium, patiserie proaspătă și o priveliște perfectă către zonele de joacă. Relaxează-te cât timp copiii explorează.",
        roastedTitle: "Prăjit proaspăt zilnic",
        roastedSubtitle: "Organic • Local • Opțiuni pentru copii",
        menuTitle: "Meniul de azi",
        coffeeTitle: "Cafea & băuturi",
        pastriesTitle: "Patiserie proaspătă",
        kidsTitle: "Gustări pentru cei mici",
        kidsNote:
          "Toate produsele pentru copii vin cu un biscuit zâmbăreț gratuit 🍪",
        whyTitle: "De ce iubesc părinții cafeneaua noastră",
        why1: "Vedere completă către toate zonele de joacă",
        why2: "Organic & din surse locale",
        why3: "Deschis zilnic 9:00 – 18:00",
        footerAbout:
          "Creăm experiențe de joacă premium pentru următoarea generație de exploratori.",
        quickLinks: "Linkuri rapide",
        stay: "Rămâi la curent",
        emailPlaceholder: "Adresă de email",
      },
      parties: {
        badge: "Sărbătorește cu noi",
        heroTitleLine1: "Petreceri magice,",
        heroTitleLine2: "fără stres.",
        heroBody:
          "De la disco neon la ceaiuri cozy pentru cei mici, noi facem curățenia — tu creezi amintirile.",
        heroCta: "Începe aventura",
        heroAlt:
          "Cameră vibrantă pentru petrecere, cu baloane colorate și masă decorată într-un loc de joacă indoor modern",
        topRated: "Locație de top 2024!",
        chooseTitle: "Alege-ți sărbătoarea",
        chooseBody:
          "Trei niveluri de bucurie, gândite pentru orice grup și orice temă de vis.",
        selectBasic: "Alege Distracție Basic",
        mostPopular: "CEL MAI POPULAR",
        giftBags: "Punguțe cadou FunFactory pentru fiecare copil",
        packages: {
          basic: {
            alt: "Decor pentru petrecere Distracție Basic",
            priceMeta: "/ până la 10 copii • 2 ore",
            blurb:
              "Perfect pentru sărbători mici și simple, cu toate elementele esențiale.",
            f1: "2 ore de joacă",
            f2: "Cameră de petrecere privată",
            f3: "Decor basic (baloane & panglici)",
            f4: "10 copii incluși",
          },
          premium: {
            alt: "Petrecere Bucurie Premium",
            priceMeta: "/ până la 15 copii • 3 ore",
            blurb:
              "Echilibrul perfect între distracție și confort — cel mai ales pachet.",
            f1: "3 ore de joacă",
            f2: "Decorațiuni complet tematice",
            f3: "Pizza, suc & gustări",
            f4: "15 copii incluși",
            select: "Alege Bucurie Premium",
          },
          vip: {
            alt: "Petrecere Utopie VIP",
            priceMeta: "/ până la 20 copii • Nelimitat",
            blurb:
              "Experiența supremă — totul la superlativ pentru o zi de neuitat.",
            f1: "Joacă nelimitată",
            f2: "Gazdă dedicată pentru petrecere",
            f3: "Meniu catering gourmet",
            f4: "Fotograf profesionist",
            f5: "Punguțe cadou + kit de activități",
            f6: "Acces exclusiv la lounge VIP",
            select: "Alege Utopie VIP",
          },
        },
      },
      contactPage: {
        heroTitle1: "Bucurie pură,",
        heroTitle2: "surprinsă.",
        heroBody:
          "Intră într-o lume în care fiecare colț e o nouă aventură. Descoperă experiența FunFactory prin galeria noastră.",
        mapAlt:
          "Hartă stilizată care arată locația centrului de joacă FunFactory într-un cartier urban modern",
        talkTitle1: "Hai să vorbim",
        talkTitle2: "joacă.",
        talkBody:
          "Ai întrebări despre facilități, pachete de petrecere sau protocoale de siguranță? Echipa noastră te ajută să planifici vizita perfectă.",
        inquiryType: "Tip solicitare",
        inquiry: {
          general: "Întrebare generală",
          party: "Solicitare rezervare petrecere",
          group: "Tarife pentru grupuri",
          safety: "Siguranță & accesibilitate",
          feedback: "Feedback",
        },
        message: "Mesajul tău",
        messagePlaceholder: "Cu ce te putem ajuta?",
        send: "Trimite solicitarea",
      },
      safetyPage: {
        promise: "Promisiunea noastră",
        heroTitle: "Siguranța copilului tău este regula noastră #1",
        heroBody:
          "Am construit o lume în care imaginația prinde aripi, iar siguranța rămâne fermă. Descoperă protocoalele noastre pentru liniște deplină.",
        heroCta: "Planifică vizita",
        certifiedSafe: "Siguranță certificată",
        dailyInspections: "Inspecții zilnice",
        heroAlt:
          "Loc de joacă indoor modern, premium, cu pardoseală moale luminoasă și structuri curate în culori pastelate",
        pillarsTitle: "Pilonii siguranței",
        pillarsBody:
          "Standarde fundamentale care fac din FunFactory etalonul pentru joaca indoor.",
        pillar1Title: "„Joy Guides” instruiți",
        pillar1Body:
          "Personal certificat care supraveghează fiecare zonă, pentru o joacă sigură și incluzivă.",
        pillar2Title: "Curățenie de nivel medical",
        pillar2Body:
          "Folosim zilnic igienizare eco-friendly, de nivel medical, pe toate suprafețele.",
        pillar3Title: "Intrare/ieșire securizată",
        pillar3Body:
          "Punct unic de acces, cu urmărire digitală și politici stricte de preluare pe bază de act.",
        pillar4Title: "Siguranța echipamentelor",
        pillar4Body:
          "Toate structurile depășesc standardele internaționale de siguranță pentru impact și durabilitate.",
        staffTitle: "Îngrijire certificată, la nivel de expert",
        staffBody:
          "Fiecare „Joy Guide” FunFactory trece prin verificări riguroase și training înainte de a intra în zona de joacă.",
        badge1: "Certificat prim ajutor",
        badge2: "Instruit CPR",
        badge3: "Verificare antecedente",
        staffImg1Alt:
          "Educatoare zâmbitoare în uniformă colorată, dând high five unui copil într-un centru de joacă sigur",
        staffImg2Alt:
          "Membru al echipei demonstrând o trusă de prim ajutor prietenoasă pentru copii într-o sală de joacă luminoasă",
        cleaningTitle: "Ritmul curățeniei zilnice",
        cleaningSubtitle: "Transparență despre cum păstrăm totul impecabil.",
        cleaningPreOpen: "ÎNAINTE DE DESCHIDERE",
        cleaningHourly: "DIN ORĂ ÎN ORĂ",
        cleaningClosing: "ÎNCHIDERE",
        cleaningDeepTitle: "Igienizare profundă",
        cleaningDeepBody:
          "Pulverizare electrostatică completă a echipamentelor și a zonelor atinse frecvent, cu dezinfectanți non-toxici.",
        cleaningSweepTitle: "Curățare puncte de contact",
        cleaningSweepBody:
          "Ștergere balustrade, mânere, mese din cafenea. Monitorizare igienă grup sanitar.",
        cleaningZoneTitle: "Îngrijire pe zone",
        cleaningZoneBody:
          "Curățenie intensivă pentru piscina cu bile, zonele de toddler și facilitățile de schimbare.",
        faqTitle: "Întrebări frecvente despre siguranță",
        faqQ1: "Care este limita de vârstă pentru piscina cu bile?",
        faqA1:
          "Piscina principală este gândită pentru 4–12 ani. Pentru cei mici există o piscină dedicată în zona Toddler, exclusiv sub 3 ani.",
        faqQ2: "Cât de des sunt inspectate echipamentele?",
        faqA2:
          "Siguranța e dinamică! „Joy Guides” fac verificări structurale în fiecare dimineață, iar ingineri certificați efectuează audit complet trimestrial.",
        faqQ3: "Sunt permise gustările de acasă?",
        faqA3:
          "Pentru un mediu sigur pentru alergii, te rugăm să nu aduci mâncare în zonele de joacă. Cafeneaua oferă opțiuni fără nuci, pregătite controlat.",
        ctaTitle: "Mai ai întrebări?",
        ctaBody:
          "Ofițerii noștri de siguranță sunt disponibili să îți explice protocoalele sau să răspundă preocupărilor specifice.",
        ctaBook: "Rezervă o sesiune de joacă",
        ctaContact: "Contactează ofițerul de siguranță",
        footerTagline: "Împuternicim joaca prin siguranță sofisticată.",
        footerContact: "Contact",
        footerPrivacy: "Politica de confidențialitate",
        footerTerms: "Termeni și condiții",
        footerFaq: "FAQ siguranță",
        footerCopyright: "© 2026 FunFactory Play Centers. Toate drepturile rezervate.",
      },
      gdpr: {
        title: "Cookie-urile fac bucuria să dureze mai mult!",
        body:
          "Folosim cookie-uri ca să poți rezerva sesiuni și să vezi calendarul nostru de disponibilitate. Alege preferințele tale.",
        fullPolicy: "Politica completă de confidențialitate",
        necessary: "Necesar",
        necessaryDesc: "Calendar rezervări, pachete, verificări disponibilitate",
        alwaysOn: "Mereu activ",
        analytics: "Analitice",
        analyticsDesc: "Statistici anonime ca să îmbunătățim experiența",
        marketing: "Marketing",
        marketingDesc: "Oferte speciale & mementouri (opțional)",
        onlyNecessary: "Doar necesare",
        accept: "Accept",
        changeLater:
          "Poți schimba oricând aceste opțiuni ștergând datele site-ului din setările browserului.",
      },
    },
  },
  en: {
    translation: {
      brand: BRAND,
      nav: {
        playZones: "Play Zones",
        parties: "Parties",
        cafe: "Café",
        safety: "Safety",
        contact: "Contact",
        bookNow: "Book Now",
        language: "Language",
      },
      packages: {
        basic: "Basic Fun",
        premium: "Premium Joy",
        vip: "VIP Utopia",
      },
      booking: {
        title: "Book Your Joy Session",
        subtitle: "Choose a date and package — we’ll take care of the rest",
        selectDate: "Select a Date",
        yourDetails: "Your Details",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email address",
        phone: "Phone Number",
        choosePackage: "Choose Package",
        selectStartTime: "Select Start Time",
        selectDateToSeeTimes: "Select a date to see available start times.",
        payDeposit: "Pay 10% Deposit & Confirm",
        preparingPayment: "Preparing payment...",
        processingPayment: "Processing payment...",
        completePayment: "Complete Payment",
        vipAllDay: "All Day Access",
        vipUnavailable: "Unavailable",
        vipAvailableWholeDay: "Available (whole day)",
      },
      success: {
        title: "Payment Successful!",
        subtitle: "Your 10% deposit has been received. Your booking is confirmed.",
        backHome: "Back to home",
        emailSent: "A confirmation email has been sent to your inbox.",
        paymentNotCompleted: "Payment not completed",
        paymentIssue: "Something went wrong with the payment.",
        cancellationPolicy:
          "Cancellation policy: cancel at least 2 days in advance for a refund. Otherwise, the deposit is non-refundable.",
      },
      reservation: {
        confirmed: "Reservation confirmed",
        heading: `See you at ${BRAND}`,
        save: "Save this page — you can open it anytime before your party.",
        package: "Package",
        date: "Date",
        time: "Time",
        guests: "Guests included",
        zone: "Zone",
        ref: "Ref.",
        backHome: "Back to home",
        wholeDay: "Whole day (VIP access)",
      },
      admin: {
        title: "Admin",
        reservations: "Reservations",
        tzNote: "Times shown in Bucharest time.",
        latest: "latest",
        when: "When",
        package: "Package",
        guests: "Guests",
        email: "Email",
        status: "Status",
        payment: "Payment",
        deposit: "Deposit",
        bookingId: "Booking ID",
        created: "Created",
        paid: "paid",
        notPaid: "not paid",
        noReservations: "No reservations yet.",
      },
      email: {
        confirmationPreview:
          "Your FunFactory reservation is confirmed — view your details",
        booked: "You're booked,",
        lede:
          "Your deposit went through. Save the link below — you can open it anytime before your party.",
        saveLink: "Save the link below",
        viewReservation: "View your reservation →",
        package: "Package",
        date: "Date",
        time: "Time",
        guests: "Guests included",
        reference: "Reference",
        footerLeft: "Sophisticated joy",
        footerRight: BRAND,
      },
      errors: {
        startPaymentFailed: "Failed to start payment. Please try again.",
        paymentFailed: "Payment failed",
        confirmationFailed: "Payment succeeded but confirmation failed.",
      },
      toasts: {
        paymentSuccess: "Payment successful! Your booking is confirmed.",
      },
      home: {
        explore: "Explore Our World",
        heroTitleLine1: "Zones of",
        heroTitleEmphasis: "Pure Joy.",
        heroBody:
          "Designed for sophisticated play. Each zone is a carefully curated environment that balances high-energy physical activity with creative discovery.",
        infinityTitle: "The Infinity Ball Pit",
        infinityBody:
          "A sea of 50,000 antimicrobial pearls. Dive into a sensory-rich landscape designed for physical buoyancy and tactile delight.",
        ages: "Ages 3–12",
        toddlerTitleLine1: "Toddler",
        toddlerTitleLine2: "Sanctuary",
        toddlerBody:
          "Soft edges, organic shapes, and gentle sensory panels for our smallest explorers.",
        toddlerBullet1: "Fully Padded Surfaces",
        toddlerBullet2: "Sensory Wall Panels",
        jungleTitle: "Canopy Jungle Gym",
        jungleBody:
          "A multi-level architectural maze of sustainable timber and rope bridges.",
        jungleTag1: "Agility",
        jungleTag2: "Nature-Inspired",
        climbTitleLine1: "Sky-High",
        climbTitleLine2: "Climbing",
        climbBody:
          "Custom-molded geometric holds and auto-belay systems for safe, gravity-defying fun.",
        climbCta: "Learn Techniques",
        artTitle: "Art Atelier",
        artBody: "Where little Picassos find their digital and physical canvas.",
        safetyBannerTitle: "Safety First, Always.",
        safetyBannerBody:
          "Cleaned hourly with eco-certified sanitizers. Fully supervised by trained 'Joy Guides'.",
        safetyBannerCta: "View Safety Protocol",
      },
      footer: {
        about:
          "Redefining the indoor playground experience through the lens of sophisticated joy and architectural wonder.",
        explore: "Explore",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        safety: "Safety Rules",
        connect: "Connect",
        contact: "Contact Us",
        newsletter: "Join Newsletter",
        stay: "Stay in the Loop",
        stayBody: "Get exclusive event invites and play tips delivered to your inbox.",
        emailPlaceholder: "Email Address",
        subscribe: "Subscribe",
        copyright:
          "© 2026 FunFactory. All rights reserved. Designed for Sophisticated Joy.",
      },
      privacyPage: {
        title: "Privacy Policy",
        updated: "Last updated: May 5, 2026",
        intro:
          "We respect your privacy. This page explains what data we collect, why we use it, and the choices you have.",
        sections: {
          s1t: "What we collect",
          s1b:
            "We may collect contact details (e.g. email) when you book or join the newsletter, plus minimal technical data needed to operate the site.",
          s2t: "How we use data",
          s2b:
            "We use data to confirm reservations, send relevant communications (e.g. confirmations), improve the experience, and meet legal obligations.",
          s3t: "Your rights",
          s3b:
            "You can request access, correction, or deletion, or unsubscribe from communications at any time. Reach us from the contact page.",
        },
      },
      termsPage: {
        title: "Terms of Service",
        updated: "Last updated: May 5, 2026",
        intro:
          "By using FunFactory, you agree to the terms below. They describe usage rules and booking conditions.",
        sections: {
          s1t: "Bookings and payments",
          s1b:
            "Bookings are confirmed after the deposit is paid. Your booking details are available in the confirmation link sent by email.",
          s2t: "Safety rules",
          s2b:
            "Please follow our safety rules and staff guidance. For the full details, see the Safety page.",
          s3t: "Changes",
          s3b:
            "We may update these terms from time to time. The current version is published on this page.",
        },
      },
      cafe: {
        badge: "Parent Oasis",
        heroTitleLine1: "The Cozy Café,",
        heroTitleLine2: "Where Parents Breathe.",
        heroBody:
          "Premium coffee, fresh pastries, and a perfect view of the play zones. Relax while your kids explore — we've got the perfect cup waiting.",
        roastedTitle: "Freshly Roasted Daily",
        roastedSubtitle: "Organic • Local • Kid-friendly options",
        menuTitle: "Today's Menu",
        coffeeTitle: "Coffee & Drinks",
        pastriesTitle: "Fresh Pastries",
        kidsTitle: "Little Bites",
        kidsNote: "All kid items come with a free smiley-face cookie 🍪",
        whyTitle: "Why Parents Love Our Café",
        why1: "Full view of all play zones",
        why2: "Organic & locally sourced",
        why3: "Open 9am – 6pm daily",
        footerAbout:
          "Curating elevated play experiences for the next generation of explorers.",
        quickLinks: "Quick Links",
        stay: "Stay in the Loop",
        emailPlaceholder: "Email Address",
      },
      parties: {
        badge: "Celebrate with Us",
        heroTitleLine1: "Magical Parties,",
        heroTitleLine2: "Zero Stress.",
        heroBody:
          "From neon disco bashes to cozy toddler tea parties, we handle the mess while you make the memories.",
        heroCta: "Start Your Adventure",
        heroAlt:
          "Vibrant children's birthday party room with colorful balloons and a decorated table in a modern indoor playground",
        topRated: "Top Rated Venue 2024!",
        chooseTitle: "Choose Your Celebration",
        chooseBody:
          "Three tiers of joy designed to fit every group size and dream theme.",
        selectBasic: "Select Basic Fun",
        mostPopular: "MOST POPULAR",
        giftBags: "FunFactory gift bags for every child",
        packages: {
          basic: {
            alt: "Basic Fun party setup",
            priceMeta: "/ up to 10 kids • 2 hours",
            blurb:
              "Perfect for small, simple celebrations with all the essentials.",
            f1: "2 hours of play time",
            f2: "Private party room",
            f3: "Basic balloon & streamer decor",
            f4: "10 kids included",
          },
          premium: {
            alt: "Premium Joy party",
            priceMeta: "/ up to 15 kids • 3 hours",
            blurb:
              "The perfect balance of fun and convenience — our most chosen package.",
            f1: "3 hours of play time",
            f2: "Fully themed decorations",
            f3: "Pizza, juice & snacks",
            f4: "15 kids included",
            select: "Select Premium Joy",
          },
          vip: {
            alt: "VIP Utopia party",
            priceMeta: "/ up to 20 kids • Unlimited",
            blurb:
              "The ultimate luxury experience — go all out for a truly unforgettable day.",
            f1: "Unlimited play time",
            f2: "Dedicated party host",
            f3: "Gourmet catering menu",
            f4: "Professional photographer",
            f5: "Custom gift bags + take-home activity kit",
            f6: "Exclusive access to VIP lounge",
            select: "Select VIP Utopia",
          },
        },
      },
      contactPage: {
        heroTitle1: "Pure Joy,",
        heroTitle2: "Captured.",
        heroBody:
          "Step into a world where every corner is a new adventure. Explore the FunFactory experience through our gallery.",
        mapAlt:
          "stylized map showing the location of FunFactory play center in a modern urban district",
        talkTitle1: "Let's Talk",
        talkTitle2: "Play.",
        talkBody:
          "Have questions about our facilities, party packages, or safety protocols? Our team is here to help you plan the perfect visit.",
        inquiryType: "Inquiry Type",
        inquiry: {
          general: "General Question",
          party: "Party Booking Inquiry",
          group: "Group Rates",
          safety: "Safety & Accessibility",
          feedback: "Feedback",
        },
        message: "Your Message",
        messagePlaceholder: "How can we help you today?",
        send: "Send Inquiry",
      },
      safetyPage: {
        promise: "Our Promise",
        heroTitle: "Your Child's Safety is Our #1 Play Rule",
        heroBody:
          "We've built a world where imagination runs wild and safety stands firm. Explore our rigorous protocols designed for total peace of mind.",
        heroCta: "Plan Your Visit",
        certifiedSafe: "Certified Safe",
        dailyInspections: "Daily Inspections",
        heroAlt:
          "Modern high-end children indoor playground with bright soft flooring and clean pastel colored play structures in soft daylight",
        pillarsTitle: "Our Safety Pillars",
        pillarsBody:
          "Foundational standards that make FunFactory the gold standard for indoor play.",
        pillar1Title: "Trained 'Joy Guides'",
        pillar1Body:
          "Certified staff supervising every zone, ensuring play remains safe and inclusive.",
        pillar2Title: "Hospital-Grade Cleaning",
        pillar2Body:
          "We use eco-friendly, medical-grade sanitization on all surfaces every single day.",
        pillar3Title: "Secure Entry/Exit",
        pillar3Body:
          "Single point of entry with digital tracking and strict photo ID check-out policies.",
        pillar4Title: "Equipment Safety",
        pillar4Body:
          "All play structures exceed international safety standards for impact and durability.",
        staffTitle: "Expertly Certified Care",
        staffBody:
          "Every FunFactory Joy Guide undergoes rigorous screening and training before ever stepping foot in the play zone.",
        badge1: "First Aid Certified",
        badge2: "CPR Trained",
        badge3: "Background Checked",
        staffImg1Alt:
          "Smiling educator in a colorful uniform giving a high five to a child in a safe play center",
        staffImg2Alt:
          "Professional staff member demonstrating a child-friendly first aid kit in a bright playroom",
        cleaningTitle: "Daily Cleaning Rhythm",
        cleaningSubtitle: "Transparency in how we keep things sparkling.",
        cleaningPreOpen: "PRE-OPEN",
        cleaningHourly: "HOURLY",
        cleaningClosing: "CLOSING",
        cleaningDeepTitle: "Deep Sanitization",
        cleaningDeepBody:
          "Full electrostatic spray of all equipment and high-touch surfaces using non-toxic disinfectants.",
        cleaningSweepTitle: "Touchpoint Sweep",
        cleaningSweepBody:
          "Wiping down railings, door handles, and café tables. Monitoring restroom cleanliness.",
        cleaningZoneTitle: "Zone-Specific Care",
        cleaningZoneBody:
          "Intensive cleaning of ball pits, toddler areas, and changing facilities.",
        faqTitle: "Safety FAQ",
        faqQ1: "What is the age limit for the ball pit?",
        faqA1:
          "Our main ball pit is designed for ages 4-12. For our smaller guests, we have a dedicated Toddler Zone ball pit that is exclusively for children under 3.",
        faqQ2: "How often is the equipment inspected?",
        faqA2:
          "Safety is dynamic! Our Joy Guides perform structural walk-throughs every morning. Additionally, certified third-party safety engineers perform a full audit every quarter.",
        faqQ3: "Are snacks from home allowed?",
        faqA3:
          "To maintain our strict allergy-safe environment, we ask that no outside food be brought into the play areas. Our café offers a range of nut-free, kid-friendly options.",
        ctaTitle: "Still have questions?",
        ctaBody:
          "Our Safety Officers are always available to walk you through our protocols or address specific concerns.",
        ctaBook: "Book a Play Session",
        ctaContact: "Contact Safety Officer",
        footerTagline: "Empowering play through sophisticated safety.",
        footerContact: "Contact Us",
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms of Service",
        footerFaq: "Safety FAQ",
        footerCopyright: "© 2026 FunFactory Play Centers. All rights reserved.",
      },
      gdpr: {
        title: "Cookies make the joy last longer!",
        body:
          "We use cookies so you can book sessions and see our live availability calendar. Choose your preferences.",
        fullPolicy: "Full Privacy Policy",
        necessary: "Necessary",
        necessaryDesc: "Booking calendar, packages, availability checks",
        alwaysOn: "Always on",
        analytics: "Analytics",
        analyticsDesc: "Anonymous stats so we can improve the experience",
        marketing: "Marketing",
        marketingDesc: "Special offers & reminders (optional)",
        onlyNecessary: "Only Necessary",
        accept: "Accept",
        changeLater:
          "You can change these choices anytime by clearing site data in your browser settings.",
      },
    },
  },
} as const;

