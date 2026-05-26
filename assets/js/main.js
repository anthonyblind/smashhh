
(function () {
    "use strict";

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 1.5,
    });
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    gsap.ticker.lagSmoothing(0);

    window.addEventListener("load", function () {
        document.querySelector("body").classList.add("loaded");
        initComponents();
    });
    

    function initComponents() {

        animHero();
        //navToggle();
        cubertoCursor();
        changeColor();
        //splideTemoignages();
        animTesti();
        marqueeAnim();
        animFooter();

    }


    function animHero() {
        const t1 = gsap.to(".hero .bg", {
            scale: 1.2,
            rotate: 4,
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                scrub: .5,
                //pin: true,
                id: "img"
            }
        });

        const t2 = gsap.to(".hero .intro", {
            y: -50,
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                scrub: .5,
                id: "intro"
            }
        });

    }

    

    function animTesti() {

        const cards = gsap.utils.toArray(".testimonial-card");
        if (!cards) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".testimonials-section", // Section testimonials
                start: "top top", // Déclenchement quand la section arrive en haut
                end: "+=3000", // Durée totale de l'animation (ajustez selon le nombre de cartes)
                scrub: true, // Synchronisation avec le scroll
                pin: true, // Fixe la section pendant l'animation
            }
        });

        // Animation de chaque carte
        cards.forEach((card, index) => {
            timeline.fromTo(
                card,
                {
                    x: "100vw", // Départ hors écran à droite
                    opacity: 0, // Invisible au départ
                    rotate: 40,
                },
                {
                    x: "0%", // Arrivée au centre
                    opacity: 1, // Apparition
                    ease: "power2.out",
                    duration: 1, // Durée de l'arrivée
                    rotate: 0,
                    y: 0
                }
            )
                .to(
                    card,
                    {
                        x: "-100vw", // Sortie hors écran à gauche
                        opacity: 0, // Disparition
                        ease: "power2.in",
                        duration: 1,
                        rotate: -40,
                    },
                    "+=0.5" // Pause lorsque la carte est au centre
                );
        });


        const container = document.querySelector(".background-container");

        // Création de 50 div carrées positionnées aléatoirement
        for (let i = 0; i < 80; i++) {
            const square = document.createElement("div");
            square.classList.add("background-square");
            square.style.left = `${Math.random() * 100}vw`;
            square.style.top = `${Math.random() * 800}vh`;
            container.appendChild(square);
        }

        timeline.to(".background-square", {
            y: "-200vh", // Déplacement vers le haut
            scrollTrigger: {
                trigger: ".testimonials-section", // Section testimonials
                start: "top bottom", // Déclenchement en même temps que l'animation principale
                end: "+=5000", // Durée totale
                scrub: true, // Synchronisation avec le scroll
            },
            ease: "none", // Pas de courbe d'accélération pour un mouvement linéaire
        });


    }

    

    function splideTemoignages() {

        const splider_temoignages = document.querySelector('.splide-temoignages');
        var bar = document.querySelector('.splide-temoignages .splide__progress__bar');
        if (!splider_temoignages) return;

        var splide = new Splide(splider_temoignages, {
            type: 'loop',
            perPage: 1,
            autoplay: true,
            arrows: false,
            pagination: false
        });

        splide.on('mounted move', function () {
            var end = splide.Components.Controller.getEnd() + 1;
            var rate = Math.min((splide.index + 1) / end, 1);
            bar.style.width = String(100 * rate) + '%';
        });

        splide.mount();
    }



    function marqueeAnim() {

        document.querySelectorAll('.js-marquee').forEach(function (e) {

            var letter = e.querySelector('.text');
            var clone = letter.cloneNode(true);
            letter.after(clone);
            var marquee = e.querySelectorAll('.text');

            if (!marquee) return;

            var tl = gsap
                .to(marquee, { duration: 40, xPercent: -100, ease: "none", repeat: -1 })
                .timeScale(0);

            gsap.to(tl, { timeScale: 1 });

        });

    }


    function animFooter() {

        const paths = document.querySelectorAll(".footer-logo path");

        paths.forEach((path, index) => {
            gsap.fromTo(path, {
                y: 30,
            }, {
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".footer-logo-wrapper",
                    start: `top+=${index * 30} bottom`,
                    end: "100% 100%",
                    scrub: true,
                }
            });
        });

    }



    function navToggle() {
        document.querySelector('.btn-burger').addEventListener('click', function () {
            document.querySelector("body").classList.toggle('menu-active');
        });
    }


    function cubertoCursor() {
        const cursor = new MouseFollower({
            speed: 0.3,
            stateDetection: {
                '-pointer': 'a,button',
            }
        });
    }

    function changeColor() {

        const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
        if (!scrollColorElems) return;

        scrollColorElems.forEach((colorSection, i) => {
            const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
            const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

            ScrollTrigger.create({
                trigger: colorSection,
                start: "top 50%",
                onEnter: () =>
                    gsap.to("body", {
                        backgroundColor: colorSection.dataset.bgcolor,
                        color: colorSection.dataset.textcolor,
                        overwrite: "auto"
                    }),
                onLeaveBack: () =>
                    gsap.to("body", {
                        backgroundColor: prevBg,
                        color: prevText,
                        overwrite: "auto"
                    })
            });
        });

    }




    


})();

