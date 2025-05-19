document.addEventListener('DOMContentLoaded', () => {
    const langButtons = {
        de: document.getElementById('lang-de'),
        en: document.getElementById('lang-en')
    };
    const translatableElements = document.querySelectorAll('[data-lang]');
    let currentLanguage = localStorage.getItem('language') || 'de'; // Standard auf Deutsch oder gespeicherte Sprache
    let translations = {};

    // Funktion zum Laden der Übersetzungsdatei
    async function fetchTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            translations = await response.json();
            updateContent();
        } catch (error) {
            console.error("Could not load translation file:", error);
            // Fallback oder Fehlermeldung für den Benutzer
        }
    }

    // Funktion zum Aktualisieren der Texte auf der Seite
    function updateContent() {
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder) el.placeholder = translations[key];
                    // Für Labels, die nicht direkt das Input umschließen
                    else if (el.labels && el.labels[0]) el.labels[0].textContent = translations[key];
                    else el.textContent = translations[key]; // Fallback für Button-Text etc.
                } else {
                    el.innerHTML = translations[key]; // innerHTML um z.B. <strong> Tags in JSON zu erlauben
                }
            }
        });
        document.documentElement.lang = currentLanguage; // Setzt das lang-Attribut des HTML-Tags
        updateLanguageButtonStates();
    }

    // Funktion zum Setzen der Sprache
    function setLanguage(lang) {
        if (!langButtons[lang]) return; // Ungültige Sprache
        currentLanguage = lang;
        localStorage.setItem('language', lang); // Sprache speichern
        fetchTranslations(lang);
    }

    // Aktiven Zustand der Sprachbuttons aktualisieren
    function updateLanguageButtonStates() {
        Object.values(langButtons).forEach(btn => btn.classList.remove('active'));
        if (langButtons[currentLanguage]) {
            langButtons[currentLanguage].classList.add('active');
        }
    }

    // Event-Listener für Sprachumschalter
    langButtons.de.addEventListener('click', () => setLanguage('de'));
    langButtons.en.addEventListener('click', () => setLanguage('en'));

    // Initiale Sprache laden
    fetchTranslations(currentLanguage);

    // --- Animationen beim Scrollen ---
    // Dies ist eine einfache Implementierung. Für komplexere Anforderungen
    // oder bessere Performance ist Intersection Observer API oder eine Bibliothek wie GSAP ScrollTrigger besser.
    const animatedElementsOnScroll = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // relativ zum Viewport
        rootMargin: '0px',
        threshold: 0.2 // Element muss zu 20% sichtbar sein
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target); // Animation nur einmal ausführen
            }
        });
    }, observerOptions);

    animatedElementsOnScroll.forEach(el => observer.observe(el));

    // Animationen beim Laden der Seite (Hero Section)
    const animatedElementsOnLoad = document.querySelectorAll('.animate-on-load');
    animatedElementsOnLoad.forEach(el => {
        // Kleine Verzögerung, damit der Browser rendern kann, bevor die Transition startet
        setTimeout(() => el.classList.add('visible'), 100);
    });


    // Aktiven Navigationslink hervorheben beim Scrollen
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { // 100px Puffer
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    });

    // Kontaktformular (nur Demo, kein Senden)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Hier würde die Logik zum Senden der Formulardaten stehen
            // z.B. mit fetch() an ein Backend-API.
            alert(translations['contact_form_submitted_message'] || 'Vielen Dank! Ihre Nachricht wurde (simuliert) gesendet.');
            contactForm.reset();
        });
        // Fügen Sie "contact_form_submitted_message" zu Ihren JSON-Dateien hinzu,
        // z.B. de.json: "contact_form_submitted_message": "Vielen Dank! Ihre Nachricht wurde gesendet (Simulation)."
        // en.json: "contact_form_submitted_message": "Thank you! Your message has been sent (simulation)."
    }

});
