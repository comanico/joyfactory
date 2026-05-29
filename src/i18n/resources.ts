export const BRAND = "FunFactory" as const;
export const DEFAULT_LANG = "ro" as const;
export const SUPPORTED_LANGS = ["ro", "en"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const resources = {
  ro: {
    translation: {
      brand: BRAND,
      seo: {
        siteName: BRAND,
        defaultTitle: `${BRAND} — Loc de joacă indoor premium pentru copii`,
        defaultDescription:
          "FunFactory: petreceri private, zone de joacă moderne, cafenea pentru părinți și rezervări online. Siguranță, distracție și experiențe memorabile pentru copii.",
        keywords:
          "FunFactory, loc de joacă copii, petrecere copii, joacă indoor, petrecere privată, zonă de joacă, cafenea părinți, rezervare petrecere, petrecere aniversare",
        ogImageAlt: `Logo ${BRAND}`,
        pages: {
          home: {
            title: `${BRAND} — Zone de joacă & petreceri pentru copii`,
            description:
              "Descoperă FunFactory: piscină cu bile, cățărare, petreceri FUN BASIC–VIP și rezervare online. Joacă sigură și distracție pentru întreaga familie.",
          },
          parties: {
            title: `Petreceri copii — Pachete FUN BASIC, START, PREMIUM & VIP`,
            description:
              "Organizează petrecerea perfectă la FunFactory: pachete de la 1000 LEI, meniu pentru copii, gazdă dedicată, VR și experiențe VIP. Rezervă acum.",
          },
          cafe: {
            title: `Cafenea ${BRAND} — Cafea & gustări cu vedere la zona de joacă`,
            description:
              "Relaxează-te la cafeneaua FunFactory în timp ce copiii se joacă. Cafea proaspătă, patiserie și produse prietenoase cu copiii.",
          },
          safety: {
            title: `Siguranță ${BRAND} — Protocoale și standarde pentru joacă indoor`,
            description:
              "Află cum FunFactory pune siguranța pe primul loc: personal instruit, curățenie riguroasă, zone securizate și inspecții regulate.",
          },
          contact: {
            title: `Contact ${BRAND} — Întrebări, rezervări & vizite`,
            description:
              "Contactează echipa FunFactory pentru rezervări de petrecere, întrebări despre facilități sau informații despre siguranță și program.",
          },
          privacy: {
            title: `Politica de confidențialitate — ${BRAND}`,
            description:
              "Cum FunFactory colectează, folosește și protejează datele tale personale, inclusiv rezervări și preferințe cookie.",
          },
          terms: {
            title: `Termeni și condiții — ${BRAND}`,
            description:
              "Termenii de utilizare a site-ului și serviciilor FunFactory, inclusiv reguli de rezervare și condiții pentru petreceri.",
          },
          underConstruction: {
            title: `${BRAND} — în construcție`,
            description:
              "Site-ul FunFactory este în construcție. Revino în curând pentru rezervări și noutăți.",
          },
        },
      },
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
        basic: "FUN BASIC",
        start: "FUN START",
        premium: "FUN PREMIUM",
        vip: "FUN VIP EXPERIENCE",
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
        phoneExample: "0767 123 456",
        choosePackage: "Alege pachetul",
        selectStartTime: "Alege ora de început",
        selectDateToSeeTimes: "Alege o dată pentru a vedea orele disponibile.",
        payDeposit: "Plătește avansul de 10% și confirmă",
        payDepositAmount: "Plătește avansul de {{amount}} și confirmă",
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
        name: "Nume",
        phone: "Telefon",
        package: "Pachet",
        zone: "Zonă",
        guests: "Invitați",
        email: "Email",
        status: "Status",
        payment: "Plată",
        amounts: "Sume",
        deposit: "Avans",
        total: "Total",
        stripe: "Stripe",
        paymentIntent: "PaymentIntent",
        session: "Sesiune",
        bookingId: "ID rezervare",
        created: "Creat",
        actions: "Acțiuni",
        delete: "Șterge",
        deleting: "Se șterge...",
        deleteConfirm: "Ștergi această rezervare? Această acțiune o elimină din baza de date.",
        paid: "plătit",
        notPaid: "neplătit",
        unauthorized: "Contul tău nu are acces la această pagină de admin.",
        signedInAs: "Autentificat ca",
        hoursShort: "h",
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
          "Un ocean de 50.000 de perle. Un peisaj senzorial creat pentru plutire și încântare tactilă.",
        ages: "Vârste 3+",
        toddlerTitleLine1: "Sanctuar",
        toddlerTitleLine2: "pentru cei mici",
        toddlerBody:
          "Margini moi, forme organice și panouri senzoriale blânde pentru cei mai mici exploratori.",
        toddlerBullet1: "Suprafețe complet capitonate",
        toddlerBullet2: "Panouri senzoriale interactive",
        jungleTitle: "Tiroliană 8 m",
        jungleBody:
          "Zbor deasupra zonei de joacă pe o tiroliană de 8 metri — senzație de viteză, cu ham și supraveghere din partea echipei.",
        jungleAlt: "Copii pe tiroliană în zona de joacă FunFactory",
        jungleTag1: "8 metri",
        jungleTag2: "Cu ham de siguranță",
        climbTitleLine1: "Cățărare",
        climbTitleLine2: "la înălțime",
        climbBody:
          "Prize geometrice turnate și sisteme auto-belay pentru distracție sigură, fără griji.",
        climbCta: "Învață tehnici",
        gamesVrTitle: "Jocuri video & VR",
        gamesVrBody:
          "Consolă, titluri pentru toate vârstele și experiențe VR captivante — joacă solo sau în echipă, sub supravegherea echipei noastre.",
        safetyBannerTitle: "Siguranța pe primul loc, mereu.",
        safetyBannerBody:
          "După fiecare petrecere, zona este curățată și dezinfectată.",
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
        copyright:
          "© 2026 FunFactory. Toate drepturile rezervate. Creat pentru bucurie sofisticată.",
      },
      privacyPage: {
        title: "Politica de confidențialitate",
        updated: "Ultima actualizare: 5 mai 2026",
        intro:
          "Respectăm confidențialitatea ta. Această politică se aplică site-ului FunFactory și serviciilor oferite de operatorul legal de mai jos.",
        operator: {
          title: "Operatorul datelor și al serviciilor",
          company: "MAVLI JOY S.R.L.",
          cuiLabel: "Înregistrare (CUI):",
          cui: "53949481",
          body: "Site-ul FunFactory, rezervările online și activitățile desfășurate în locație sunt operate de MAVLI JOY S.R.L., înregistrată în România (CUI 53949481).",
        },
        sections: {
          s1t: "Ce colectăm",
          s1b:
            "Putem colecta date de contact (ex. email și telefon) atunci când faci o rezervare sau trimiți formularul de contact, plus date tehnice minime pentru funcționarea site-ului.",
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
          "Prin utilizarea site-ului FunFactory și a serviciilor noastre, ești de acord cu termenii de mai jos. Aceștia descriu regulile de utilizare și condițiile de rezervare.",
        operator: {
          title: "Furnizorul serviciilor",
          company: "MAVLI JOY S.R.L.",
          cuiLabel: "Înregistrare (CUI):",
          cui: "53949481",
          body: "Serviciile FunFactory (loc de joacă, petreceri, rezervări online) sunt furnizate de MAVLI JOY S.R.L., societate înregistrată în România (CUI 53949481).",
        },
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
          "Cafea premium, arome intense și o priveliște perfectă către zonele de joacă. Relaxează-te cât timp copiii explorează.",
        roastedTitle: "Prăjit proaspăt zilnic",
        roastedSubtitle: "Organic • Local • Opțiuni pentru copii",
        menuTitle: "Meniul de azi",
        coffeeTitle: "Cafea & băuturi",
        pastriesTitle: "Patiserie proaspătă",
        kidsTitle: "Gustări pentru cei mici",
        kidsNote:
          "Toate produsele pentru copii vin cu un biscuit zâmbăreț gratuit 🍪",
        menuUnderConstruction: {
          badge: "În curând",
          title: "Meniul este în construcție",
          body: "Lucrăm la meniul nostru. Revino în curând pentru cafea, patiserie și gustări.",
        },
        whyTitle: "De ce iubesc părinții cafeneaua noastră",
        why1: "Vedere completă către toate zonele de joacă",
        why2: "Organic & din surse locale",
        why3: "Deschis zilnic 9:00 – 18:00",
        footerAbout:
          "Creăm experiențe de joacă premium pentru următoarea generație de exploratori.",
        quickLinks: "Linkuri rapide",
      },
      parties: {
        badge: "Sărbătorește cu noi",
        heroTitleLine1: "Petreceri magice,",
        heroTitleLine2: "fără stres.",
        heroBody:
          "De la mini-discotecă, scena cu lasere și jocuri de lumini, până la baloane de săpun și măști cu personaje, tu te distrezi iar noi îți creăm amintirile.",
        heroCta: "Începe aventura",
        heroAlt:
          "Cameră vibrantă pentru petrecere, cu baloane colorate și masă decorată într-un loc de joacă indoor modern",
        topRated: "Locație de top!",
        chooseTitle: "Alege-ți sărbătoarea",
        chooseBody:
          "Patru pachete de petrecere — de la joacă pură la experiența VIP completă.",
        mostPopular: "CEL MAI POPULAR",
        noMenuFeature: "FĂRĂ MENIU (poți aduce mâncare și snackuri!)",
        packages: {
          basic: {
            alt: "Petrecere FUN BASIC la FunFactory",
            price: "1000 LEI",
            priceMeta: "/ 15-20 copii",
            duration: "3 ore de petrecere + 1 oră GRATIS",
            blurb:
              "Spațiu exclusiv, zonă modulară completă și libertatea de a aduce propria mâncare.",
            includesLabel: "Include:",
            select: "Alege FUN BASIC",
            features: [
              "Spațiu exclusiv pentru petrecere",
              "Invitație digitală personalizată",
              "Zonă modulară 60 mp (piscină și fântână de bile, panou interactiv, panouri de cățărare, tobogane LED)",
              "Tiroliană 8 m",
              "Joc arcade interactiv",
              "PS4",
              "Subsoccer & masă de fotbal (NOU)",
              "Jocuri și jucării (bucătărie, supermarket, căsuță de păpuși cu accesorii, banc de scule, zonă construcții Lego Duplo, cuburi)",
              "Accesorii petrecere bază",
              "Cifră aniversară • Baloane",
              "Baloane de săpun",
              "Mini-discotecă (muzică distractivă și jocuri de lumini)",
              "Apă nelimitată",
              "__no_menu__",
            ],
          },
          start: {
            alt: "Petrecere FUN START la FunFactory",
            price: "1350 LEI",
            priceMeta: "/ 10 copii",
            duration: "3 ore de petrecere + 1 oră GRATIS",
            blurb:
              "Toate facilitățile de joacă din FUN BASIC, plus meniu pentru copii.",
            includesLabel: "Include:",
            inheritedFromLabel: "Din FUN BASIC",
            plusLabel: "În plus:",
            select: "Alege FUN START",
            features: [
              "Suc",
              "Pizza/Crispy cu cartofi prăjiți/Paste",
              "Covrigei",
              "Sărățele",
              "Napolitane",
            ],
          },
          premium: {
            alt: "Petrecere FUN PREMIUM la FunFactory",
            price: "1850 LEI",
            priceMeta: "/ 15 copii",
            duration: "3 ore de petrecere + 1 oră GRATIS",
            blurb:
              "Tot ce include FUN START, plus gazdă dedicată, VR și surprize premium.",
            includesLabel: "Include:",
            inheritedFromLabel: "Din FUN START",
            plusLabel: "În plus:",
            select: "Alege FUN PREMIUM",
            features: [
              "Gazdă dedicată (care se ocupă de tot)",
              "Echipament VR – 1,5 h",
              "Piñata pentru 15 persoane",
              "Cafea (1 cafea / părinte)",
            ],
          },
          vip: {
            alt: "Petrecere FUN VIP EXPERIENCE la FunFactory",
            price: "2600 LEI",
            priceMeta: "/ 20 copii",
            duration: "3 ore de petrecere + 1 oră GRATIS",
            blurb:
              "Experiența completă — decor personalizat, foto, catering și tot ce oferă FUN PREMIUM.",
            includesLabel: "Include:",
            inheritedFromLabel: "Din FUN PREMIUM",
            plusLabel: "În plus:",
            select: "Alege FUN VIP EXPERIENCE",
            features: [
              "Echipament VR – 2 h",
              "Decor personalizat inclus",
              "Servicii foto inclus – poze magnet pentru invitați",
              "Baloane cu heliu incluse",
              "Cafea nelimitată pentru părinți",
              "Platou cu fructe pentru copii",
              "Două pizza family pentru părinți",
            ],
          },
        },
        extras: {
          title: "Opțiuni disponibile (pentru toate pachetele)",
          intro:
            "Orice opțiune de mai jos poate fi adăugată la orice pachet, la cerere — contactează-ne prin email sau telefon.",
          contactCta: "Contactează-ne pentru opțiuni extra",
          items: {
            customDecor: {
              name: "Decor personalizat",
              price: "100 lei",
            },
            photoMagnets: {
              name: "Servicii foto – poze magnet",
              price: "100 lei",
            },
            heliumBalloons: {
              name: "Baloane heliu",
              price: "10 lei / balon",
            },
            pinata: {
              name: "Piñata cu dulciuri",
              price: "150 lei",
            },
            vr: {
              name: "Echipament VR",
              price: "100 lei / 1h",
            },
            extraChild: {
              name: "Copil suplimentar",
              price: "50 lei",
            },
          },
        },
      },
      contactPage: {
        heroTitle1: "Bucurie pură,",
        heroTitle2: "surprinsă.",
        heroBody:
          "Intră într-o lume în care fiecare colț e o nouă aventură. Descoperă experiența FunFactory prin galeria noastră.",
        mapAlt:
          "Hartă Google cu locația FunFactory, str. I.M. Klein nr. 10, Făgăraș",
        openInMaps: "Deschide în Google Maps",
        talkTitle1: "Hai să vorbim de",
        talkTitle2: "joacă.",
        talkBody:
          "Ai întrebări despre facilități, pachete de petrecere sau protocoale de siguranță? Echipa noastră te ajută să planifici vizita perfectă.",
        visitUs: "Vizitează-ne",
        visitAddress: "str. I.M. Klein, nr. 10, Făgăraș, jud. Brașov",
        callUs: "Sună-ne",
        phoneDisplay: "0767742053",
        phoneTel: "+40767742053",
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
        sending: "Se trimite…",
        sendSuccess:
          "Mulțumim! Mesajul tău a fost trimis. Te contactăm în curând.",
        phonePlaceholder: "07xx xxx xxx",
        errors: {
          emailRequired: "Adresa de email este obligatorie.",
          phoneRequired: "Numărul de telefon este obligatoriu.",
          invalidEmail: "Introdu o adresă de email validă.",
          invalidPhone: "Introdu un număr de telefon valid (minim 8 cifre).",
          sendFailed:
            "Nu am putut trimite mesajul. Încearcă din nou sau sună-ne.",
        },
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
        faqTitle: "Întrebări frecvente despre siguranță",
        faqQ1: "Care este limita de vârstă pentru spațiul de joacă?",
        faqA1:
          "Conceptul a fost gândit pentru copii de la 3 ani. Iar jocurile interactive (ex. arcade, subsoccer, tiroliana) nu au o limită de vârstă.",
        faqQ2: "Cât de des sunt inspectate echipamentele?",
        faqA2:
          "Siguranța este pe primul loc! Personalul face verificări zilnice ale spațiului de joacă, iar periodic se fac inspecții de către personalul calificat.",
        faqQ3: "Sunt permise gustările de acasă?",
        faqA3:
          "Ne dorim să vă oferim cele mai frumoase amintiri, iar dacă asta înseamnă să vă aduceți gustări de acasă, aveți această posibilitate.",
        ctaTitle: "Contactează-ne",
        ctaBody:
          "Personalul nostru este întotdeanua disponibil să îți explice protocoalele noastre sau să răspundă întrebărilor tale.",
        ctaBook: "Rezervă o sesiune de joacă",
        ctaContact: "Mai ai întrebări?",
        footerTagline: "Împuternicim joaca prin siguranță sofisticată.",
        footerContact: "Contact",
        footerPrivacy: "Politica de confidențialitate",
        footerTerms: "Termeni și condiții",
        footerFaq: "FAQ siguranță",
        footerCopyright: "© 2026 FunFactory Play Centers. Toate drepturile rezervate.",
      },
      underConstruction: {
        metaTitle: "FunFactory — în construcție",
        metaDescription:
          "Site-ul FunFactory este în construcție. Te rugăm să revii mai târziu.",
        badge: "În curând",
        title: "FunFactory — în construcție",
        body: "Site-ul este în construcție. Te rugăm să revii mai târziu.",
        footer: "© 2026 FunFactory. Toate drepturile rezervate.",
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
      seo: {
        siteName: BRAND,
        defaultTitle: `${BRAND} — Premium indoor play for kids`,
        defaultDescription:
          "FunFactory: private parties, modern play zones, parent café, and online booking. Safe, joyful experiences kids remember.",
        keywords:
          "FunFactory, kids play center, children party, indoor play, private party, play zone, parent cafe, party booking, birthday party",
        ogImageAlt: `${BRAND} logo`,
        pages: {
          home: {
            title: `${BRAND} — Play zones & kids parties`,
            description:
              "Discover FunFactory: ball pit, climbing, FUN BASIC–VIP party packages, and online booking. Safe play and joy for the whole family.",
          },
          parties: {
            title: `Kids parties — FUN BASIC, START, PREMIUM & VIP packages`,
            description:
              "Host the perfect party at FunFactory: packages from 1000 RON, kids menu, dedicated host, VR, and VIP experiences. Book now.",
          },
          cafe: {
            title: `${BRAND} Café — Coffee & treats with a view of play zones`,
            description:
              "Relax at the FunFactory café while kids play. Fresh coffee, pastries, and kid-friendly bites.",
          },
          safety: {
            title: `${BRAND} Safety — Protocols for indoor play`,
            description:
              "Learn how FunFactory puts safety first: trained staff, rigorous cleaning, secure zones, and regular inspections.",
          },
          contact: {
            title: `Contact ${BRAND} — Questions, bookings & visits`,
            description:
              "Reach the FunFactory team for party bookings, facility questions, or safety and hours information.",
          },
          privacy: {
            title: `Privacy Policy — ${BRAND}`,
            description:
              "How FunFactory collects, uses, and protects your personal data, including bookings and cookie preferences.",
          },
          terms: {
            title: `Terms of Service — ${BRAND}`,
            description:
              "Terms of use for the FunFactory website and services, including booking rules and party conditions.",
          },
          underConstruction: {
            title: `${BRAND} — Under Construction`,
            description:
              "The FunFactory website is under construction. Please check back soon for bookings and updates.",
          },
        },
      },
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
        basic: "FUN BASIC",
        start: "FUN START",
        premium: "FUN PREMIUM",
        vip: "FUN VIP EXPERIENCE",
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
        phoneExample: "0767 123 456",
        choosePackage: "Choose Package",
        selectStartTime: "Select Start Time",
        selectDateToSeeTimes: "Select a date to see available start times.",
        payDeposit: "Pay 10% Deposit & Confirm",
        payDepositAmount: "Pay {{amount}} deposit to confirm",
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
        name: "Name",
        phone: "Phone",
        package: "Package",
        zone: "Zone",
        guests: "Guests",
        email: "Email",
        status: "Status",
        payment: "Payment",
        amounts: "Amounts",
        deposit: "Deposit",
        total: "Total",
        stripe: "Stripe",
        paymentIntent: "PaymentIntent",
        session: "Session",
        bookingId: "Booking ID",
        created: "Created",
        actions: "Actions",
        delete: "Delete",
        deleting: "Deleting...",
        deleteConfirm: "Delete this reservation? This will remove it from the database.",
        paid: "paid",
        notPaid: "not paid",
        unauthorized: "Your account does not have access to this admin page.",
        signedInAs: "Signed in as",
        hoursShort: "h",
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
          "A sea of 50,000 pearls. Dive into a sensory-rich landscape designed for physical buoyancy and tactile delight.",
        ages: "Ages 3+",
        toddlerTitleLine1: "Toddler",
        toddlerTitleLine2: "Sanctuary",
        toddlerBody:
          "Soft edges, organic shapes, and gentle sensory panels for our smallest explorers.",
        toddlerBullet1: "Fully Padded Surfaces",
        toddlerBullet2: "Sensory Wall Panels",
        jungleTitle: "8 m Zip Line",
        jungleBody:
          "Soar above the play floor on an 8-meter zip line — a rush of speed with a safety harness and staff supervision.",
        jungleAlt: "Children on the zip line in the FunFactory play zone",
        jungleTag1: "8 meters",
        jungleTag2: "Safety harness",
        climbTitleLine1: "Sky-High",
        climbTitleLine2: "Climbing",
        climbBody:
          "Custom-molded geometric holds and auto-belay systems for safe, gravity-defying fun.",
        climbCta: "Learn Techniques",
        gamesVrTitle: "Gaming & VR",
        gamesVrBody:
          "Console play, age-appropriate titles, and immersive VR experiences — solo or squad up, with our team keeping every session safe and fun.",
        safetyBannerTitle: "Safety First, Always.",
        safetyBannerBody:
          "After each party, the zone is cleaned and disinfected.",
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
        copyright:
          "© 2026 FunFactory. All rights reserved. Designed for Sophisticated Joy.",
      },
      privacyPage: {
        title: "Privacy Policy",
        updated: "Last updated: May 5, 2026",
        intro:
          "We respect your privacy. This policy applies to the FunFactory website and services provided by the legal operator identified below.",
        operator: {
          title: "Data controller and service operator",
          company: "MAVLI JOY S.R.L.",
          cuiLabel: "Registration (CUI):",
          cui: "53949481",
          body: "The FunFactory website, online bookings, and on-site activities are operated by MAVLI JOY S.R.L., registered in Romania (CUI 53949481).",
        },
        sections: {
          s1t: "What we collect",
          s1b:
            "We may collect contact details (e.g. email and phone) when you book or use the contact form, plus minimal technical data needed to operate the site.",
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
          "By using the FunFactory website and our services, you agree to the terms below. They describe usage rules and booking conditions.",
        operator: {
          title: "Service provider",
          company: "MAVLI JOY S.R.L.",
          cuiLabel: "Registration (CUI):",
          cui: "53949481",
          body: "FunFactory services (play center, parties, online booking) are provided by MAVLI JOY S.R.L., a company registered in Romania (CUI 53949481).",
        },
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
        menuUnderConstruction: {
          badge: "Coming soon",
          title: "Menu under construction",
          body: "We're putting the finishing touches on our menu. Check back soon for coffee, pastries, and bites.",
        },
        whyTitle: "Why Parents Love Our Café",
        why1: "Full view of all play zones",
        why2: "Organic & locally sourced",
        why3: "Open 9am – 6pm daily",
        footerAbout:
          "Curating elevated play experiences for the next generation of explorers.",
        quickLinks: "Quick Links",
      },
      parties: {
        badge: "Celebrate with Us",
        heroTitleLine1: "Magical Parties,",
        heroTitleLine2: "Zero Stress.",
        heroBody:
          "From mini-discos, laser stages, light-up games, to bubble balloons and face masks with characters, you have fun while we build your memories.",
        heroCta: "Start Your Adventure",
        heroAlt:
          "Vibrant children's birthday party room with colorful balloons and a decorated table in a modern indoor playground",
        topRated: "Top Rated Venue!",
        chooseTitle: "Choose Your Celebration",
        chooseBody:
          "Four party packages — from pure play to the full VIP experience.",
        mostPopular: "MOST POPULAR",
        noMenuFeature: "NO MENU (you may bring food and snacks!)",
        packages: {
          basic: {
            alt: "FUN BASIC party at FunFactory",
            price: "1000 RON",
            priceMeta: "/ 15-20 children",
            duration: "3 hours of party + 1 hour FREE",
            blurb:
              "Exclusive space, full modular play zone, and freedom to bring your own food.",
            includesLabel: "Includes:",
            select: "Choose FUN BASIC",
            features: [
              "Exclusive party space",
              "Personalized digital invitation",
              "60 sqm modular zone (ball pit & fountain, interactive panel, climbing walls, LED slides)",
              "8 m zip line",
              "Interactive arcade game",
              "PS4",
              "Subsoccer & foosball table (NEW)",
              "Games & toys (kitchen, supermarket, dollhouse with accessories, tool bench, Lego Duplo building zone, blocks)",
              "Basic party accessories",
              "Birthday number • Balloons",
              "Bubble balloons",
              "Mini disco (fun music & light games)",
              "Unlimited water",
              "__no_menu__",
            ],
          },
          start: {
            alt: "FUN START party at FunFactory",
            price: "1350 RON",
            priceMeta: "/ 10 children",
            duration: "3 hours of party + 1 hour FREE",
            blurb:
              "All FUN BASIC play facilities, plus a kids menu.",
            includesLabel: "Includes:",
            inheritedFromLabel: "From FUN BASIC",
            plusLabel: "Plus:",
            select: "Choose FUN START",
            features: [
              "Juice",
              "Pizza/Crispy with fries/Pasta",
              "Pretzels",
              "Salty crackers",
              "Wafers",
            ],
          },
          premium: {
            alt: "FUN PREMIUM party at FunFactory",
            price: "1850 RON",
            priceMeta: "/ 15 children",
            duration: "3 hours of party + 1 hour FREE",
            blurb:
              "Everything in FUN START, plus a dedicated host, VR, and premium extras.",
            includesLabel: "Includes:",
            inheritedFromLabel: "From FUN START",
            plusLabel: "Plus:",
            select: "Choose FUN PREMIUM",
            features: [
              "Dedicated host (handles everything)",
              "VR equipment – 1.5 h",
              "Piñata for 15 guests",
              "Coffee (1 coffee per parent)",
            ],
          },
          vip: {
            alt: "FUN VIP EXPERIENCE party at FunFactory",
            price: "2600 RON",
            priceMeta: "/ 20 children",
            duration: "3 hours of party + 1 hour FREE",
            blurb:
              "The complete experience — custom décor, photos, catering, and all FUN PREMIUM perks.",
            includesLabel: "Includes:",
            inheritedFromLabel: "From FUN PREMIUM",
            plusLabel: "Plus:",
            select: "Choose FUN VIP EXPERIENCE",
            features: [
              "VR equipment – 2 h",
              "Custom décor included",
              "Photo service included – magnet prints for guests",
              "Helium balloons included",
              "Unlimited coffee for parents",
              "Fruit platter for children",
              "Two family pizzas for parents",
            ],
          },
        },
        extras: {
          title: "Available add-ons (for all packages)",
          intro:
            "Any option below can be added to any package upon request — contact us by email or phone.",
          contactCta: "Contact us for add-ons",
          items: {
            customDecor: {
              name: "Custom décor",
              price: "100 RON",
            },
            photoMagnets: {
              name: "Photo service – magnet prints",
              price: "100 RON",
            },
            heliumBalloons: {
              name: "Helium balloons",
              price: "10 RON / balloon",
            },
            pinata: {
              name: "Candy piñata",
              price: "150 RON",
            },
            vr: {
              name: "VR equipment",
              price: "100 RON / 1h",
            },
            extraChild: {
              name: "Extra child",
              price: "50 RON",
            },
          },
        },
      },
      contactPage: {
        heroTitle1: "Pure Joy,",
        heroTitle2: "Captured.",
        heroBody:
          "Step into a world where every corner is a new adventure. Explore the FunFactory experience through our gallery.",
        mapAlt:
          "Google Map showing FunFactory at 10 I.M. Klein St., Făgăraș",
        openInMaps: "Open in Google Maps",
        talkTitle1: "Let's Talk",
        talkTitle2: "Play.",
        talkBody:
          "Have questions about our facilities, party packages, or safety protocols? Our team is here to help you plan the perfect visit.",
        visitUs: "Visit Us",
        visitAddress: "10 I.M. Klein St., Făgăraș, Brașov County, Romania",
        callUs: "Call Us",
        phoneDisplay: "0767742053",
        phoneTel: "+40767742053",
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
        sending: "Sending…",
        sendSuccess: "Thank you! Your message was sent. We'll get back to you soon.",
        phonePlaceholder: "07xx xxx xxx",
        errors: {
          emailRequired: "Email address is required.",
          phoneRequired: "Phone number is required.",
          invalidEmail: "Please enter a valid email address.",
          invalidPhone: "Please enter a valid phone number (at least 8 digits).",
          sendFailed: "We couldn't send your message. Please try again or call us.",
        },
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
        faqTitle: "Safety FAQ",
        faqQ1: "What is the age limit for playground?",
        faqA1:
          "The concept is designed for children from 3 years old. And the interactive games (e.g. arcade, subsoccer, tiroliana) have no age limit.",
        faqQ2: "How often is the equipment inspected?",
        faqA2:
          "The staff performs daily inspections of the playground, and periodic inspections by qualified staff.",
        faqQ3: "Are snacks from home allowed?",
        faqA3:
          "We want to offer you the most beautiful memories, and if that means bringing snacks from home, you have this option.",
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
      underConstruction: {
        metaTitle: "FunFactory — Under Construction",
        metaDescription:
          "The FunFactory website is under construction. Please check back later.",
        badge: "Coming soon",
        title: "FunFactory — Under Construction",
        body: "This site is under construction. Please check back later.",
        footer: "© 2026 FunFactory. All rights reserved.",
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

