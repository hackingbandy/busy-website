document.addEventListener('DOMContentLoaded', () => {
    // --- Übersetzungen ---
    const allTranslations = {
        de: {
            company_name_placeholder: "IhrLogo",
            nav_home: "Start",
            nav_about: "Unser Ansatz",
            nav_services: "Lösungen",
            nav_process: "Kollaboration",
            nav_contact: "Kontakt",
            hero_title: "Gemeinsam gestalten. Intelligent wachsen.",
            hero_subtitle: "Wir entwickeln nicht nur BI- & AI-Lösungen für Sie – wir bauen sie mit Ihnen. Ihr Partner für datengestützte Transformation.",
            hero_cta: "Lassen Sie uns starten",
            about_title: "Mehr als Beratung: Partnerschaftliche Entwicklung",
            about_text: "Herkömmliche Beratung liefert Konzepte. Wir gehen weiter: Wir konzipieren, entwickeln und implementieren BI- und AI-Lösungen Hand in Hand mit Ihrem Team. Dieser kollaborative Ansatz stellt sicher, dass die Lösungen perfekt auf Ihre Bedürfnisse zugeschnitten sind und Ihr internes Know-how nachhaltig wächst.",
            collaboration_icon_title: "Kollaborationssymbol: Zwei Zahnräder",
            services_title: "Unsere Expertise: Ihre Daten, Ihr Vorsprung",
            service_bi_title: "Business Intelligence",
            service_bi_text: "Verwandeln Sie Rohdaten in aussagekräftige Einblicke. Von Dashboards bis zu umfassenden Reporting-Systemen – wir schaffen Klarheit.",
            service_ai_title: "Artificial Intelligence",
            service_ai_text: "Nutzen Sie die Kraft der KI. Von Machine Learning Modellen bis zu intelligenten Automatisierungen – wir bringen Innovation in Ihre Prozesse.",
            process_title: "Unser kollaborativer Weg zum Erfolg",
            process_step1_title: "1. Verstehen & Definieren",
            process_step1_text: "Gemeinsame Analyse Ihrer Ziele und Herausforderungen.",
            process_step2_title: "2. Konzipieren & Planen",
            process_step2_text: "Entwicklung einer maßgeschneiderten Lösungsarchitektur.",
            process_step3_title: "3. Bauen & Integrieren",
            process_step3_text: "Iterative Entwicklung und nahtlose Integration in Ihre Systeme.",
            process_step4_title: "4. Schulen & Übergeben",
            process_step4_text: "Wissenstransfer und Befähigung Ihres Teams für nachhaltigen Erfolg.",
            contact_title: "Bereit für den nächsten Schritt?",
            contact_text: "Kontaktieren Sie uns für ein unverbindliches Erstgespräch. Wir freuen uns darauf, gemeinsam mit Ihnen innovative Lösungen zu entwickeln.",
            contact_form_name_label: "Ihr Name",
            contact_form_name_placeholder: "Max Mustermann",
            contact_form_email_label: "Ihre E-Mail",
            contact_form_email_placeholder: "max.mustermann@beispiel.de",
            contact_form_message_label: "Ihre Nachricht",
            contact_form_message_placeholder: "Wie können wir Ihnen helfen?",
            contact_form_submit: "Nachricht senden",
            contact_form_submitted_message: "Vielen Dank! Ihre Nachricht wurde (simuliert) gesendet.",
            footer_text: "© 2025 Firmenname. Alle Rechte vorbehalten."
        },
        en: {
            company_name_placeholder: "YourLogo",
            nav_home: "Home",
            nav_about: "Our Approach",
            nav_services: "Solutions",
            nav_process: "Collaboration",
            nav_contact: "Contact",
            hero_title: "Co-create. Grow Smarter.",
            hero_subtitle: "We don't just design BI & AI solutions for you – we build them with you. Your partner for data-driven transformation.",
            hero_cta: "Let's Get Started",
            about_title: "More Than Consulting: Partnership in Development",
            about_text: "Traditional consulting delivers concepts. We go further: We design, develop, and implement BI and AI solutions hand-in-hand with your team. This collaborative approach ensures solutions are perfectly tailored to your needs and your internal expertise grows sustainably.",
            collaboration_icon_title: "Collaboration Icon: Two Gears",
            services_title: "Our Expertise: Your Data, Your Edge",
            service_bi_title: "Business Intelligence",
            service_bi_text: "Transform raw data into actionable insights. From dashboards to comprehensive reporting systems – we create clarity.",
            service_ai_title: "Artificial Intelligence",
            service_ai_text: "Leverage the power of AI. From machine learning models to intelligent automation – we bring innovation to your processes.",
            process_title: "Our Collaborative Path to Success",
            process_step1_title: "1. Understand & Define",
            process_step1_text: "Joint analysis of your goals and challenges.",
            process_step2_title: "2. Design & Plan",
            process_step2_text: "Development of a customized solution architecture.",
            process_step3_title: "3. Build & Integrate",
            process_step3_text: "Iterative development and seamless integration into your systems.",
            process_step4_title: "4. Train & Empower",
            process_step4_text: "Knowledge transfer and empowerment of your team for sustained success.",
            contact_title: "Ready for the Next Step?",
            contact_text: "Contact us for a non-binding initial consultation. We look forward to developing innovative solutions together with you.",
            contact_form_name_label: "Your Name",
            contact_form_name_placeholder: "John Doe",
            contact_form_email_label: "Your Email",
            contact_form_email_placeholder: "john.doe@example.com",
            contact_form_message_label: "Your Message",
            contact_form_message_placeholder: "How can we help you?",
            contact_form_submit: "Send Message",
            contact_form_submitted_message: "Thank you! Your message has been sent (simulation).",
            footer_text: "© 2025 CompanyName. All rights reserved."
        }
    };

    const langDeButton = document.getElementById('lang-de');
    const langEnButton = document.getElementById('lang-en');
    const translatableElements = document.querySelectorAll('[data-lang]');
    let currentLanguage = localStorage.getItem('websiteLanguage') || 'de';

    function updateContent(lang) {
        if (!allTranslations[lang]) {
            console.warn(`Translations for language "${lang}" not found.`);
            return;
        }
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-lang');
            const translation = allTranslations[lang][key];
            if (translation !== undefined) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder !== undefined && key.endsWith('_placeholder')) {
                        el.placeholder = translation;
                    } else if (el.type === 'submit' || el.type === 'button') {
                         el.value = translation; // For input type submit/button
                    }
                    // Labels are handled by their own data-lang or by 'for' attribute if needed
                } else {
                   el.innerHTML = translation; // Allows for simple HTML in translations e.g. <strong>
                }
            } else {
                // console.warn(`No translation found for key "${key}" in language "${lang}".`);
            }
        });
        document.documentElement.lang = lang;
        updateLanguageButtonStates(lang);
    }

    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('websiteLanguage', lang);
        updateContent(lang);
    }

    function updateLanguageButtonStates(lang) {
        if (lang === 'de') {
            langDeButton.classList.add('active');
            langEnButton.classList.remove('active');
        } else {
            langEnButton.classList.add('active');
            langDeButton.classList.remove('active');
        }
    }

    langDeButton.addEventListener('click', () => setLanguage('de'));
    langEnButton.addEventListener('click', () => setLanguage('en'));

    setLanguage(currentLanguage); // Initial language load

    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Element 15% visible
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after first animation
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove visible class to re-animate on scroll up
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => intersectionObserver.observe(el));
    
    // Animate timeline bar on scroll
    const processSectionForTimeline = document.getElementById('process');
    if (processSectionForTimeline) {
        const timelineObserver = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                const timelineElement = document.getElementById('process-timeline');
                if (timelineElement) {
                    timelineElement.classList.add('timeline-animated-via-js');
                    timelineObserver.unobserve(processSectionForTimeline); // Animate only once
                }
            }
        }, {threshold: 0.2}); // when 20% of process section is visible
        timelineObserver.observe(processSectionForTimeline);
    }


    // --- Hero Particles Animation ---
    const particlesContainer = document.getElementById('hero-particles-container');
    if (particlesContainer) { // Check if container exists
        const numParticles = 20;
        for (let i = 0; i < numParticles; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 8 + 2; // size between 2px and 10px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            const animationDelay = Math.random() * 5; // random delay up to 5s
            const animationDuration = Math.random() * 15 + 10; // random duration 10-25s
            particle.style.animationDelay = `${animationDelay}s`;
            particle.style.animationDuration = `${animationDuration}s`;
            // Fade in particles
            setTimeout(() => { particle.style.opacity = '1'; }, animationDelay * 1000 + 50); // Slight delay after animation starts
            particlesContainer.appendChild(particle);
        }
    }


    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section[id]');

    function changeNavActiveState() {
        let index = sections.length;
        while(--index >= 0 && window.scrollY + 100 < sections[index].offsetTop) {} // 100px offset, ensure index doesn't go < 0
        
        navLinks.forEach((link) => link.classList.remove('active-link'));
        if (index >= 0) { // Check if a section is found
            const activeLink = document.querySelector(`.nav-links a[href="#${sections[index].id}"]`);
            if (activeLink) {
                activeLink.classList.add('active-link');
            }
        } else if (navLinks.length > 0) { // If no section is active (e.g., scrolled to top before first section)
            const firstNavLink = document.querySelector(`.nav-links a[href="#${sections[0].id}"]`);
            if (firstNavLink && window.scrollY < sections[0].offsetTop) {
                 // Optionally, make the first link active or no link active.
                 // For now, if at the very top, the "Home" link (if it points to #hero) should be active.
                 // The logic above handles this if #hero is the first section.
            }
        }
    }
    if (sections.length > 0 && navLinks.length > 0) { // Only run if sections and navlinks exist
        changeNavActiveState(); // Initial check
        window.addEventListener('scroll', changeNavActiveState);
    }


    // --- Contact Form Simulation ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would send data to a server here.
            // Using currentLanguage for the alert message
            const messageKey = 'contact_form_submitted_message';
            const alertMessage = (allTranslations[currentLanguage] && allTranslations[currentLanguage][messageKey])
                                ? allTranslations[currentLanguage][messageKey]
                                : "Thank you! Your message has been (simulated) sent."; // Fallback
            alert(alertMessage);
            contactForm.reset();
        });
    }
});