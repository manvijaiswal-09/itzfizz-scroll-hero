
gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector("#hero");
const headline = document.querySelector("#headline");
const stats = document.querySelectorAll(".stat");
const statValues = document.querySelectorAll(".stat__value");
const car = document.querySelector("#car");
const road = document.querySelector("#road");
const dashes = document.querySelector("#dashes");
const wheels = document.querySelectorAll(".car__wheel");
const sub = document.querySelector(".hero__sub");
const content = document.querySelector(".hero__content");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Split the headline into letters ---------- */
function splitHeadline() {
    const text = headline.textContent.trim();
    headline.textContent = "";

    text.split("").forEach((letter) => {
        const span = document.createElement("span");
        span.className = letter === " " ? "char space" : "char";
        span.textContent = letter === " " ? " " : letter;
        span.setAttribute("aria-hidden", "true");
        headline.appendChild(span);
    });
}

/* ---------- 2. Road dashes (built from JS so the count fits the screen) ---------- */
const DASH_GAP = 140;

function buildDashes() {
    dashes.innerHTML = "";
    const count = Math.ceil(window.innerWidth / DASH_GAP) + 3;
    for (let i = 0; i < count; i++) {
        const dash = document.createElement("span");
        dash.style.left = i * DASH_GAP + "px";
        dashes.appendChild(dash);
    }
}

/* ---------- 3. Intro animation (runs once on page load) ---------- */
function playIntro() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".headline .char", {
        opacity: 0,
        y: 50,
        rotateX: -60,
        duration: 0.9,
        stagger: 0.05
    })
        .from(sub, { opacity: 0, y: 14, duration: 0.7 }, "-=0.4")
        .from(
            stats,
            {
                opacity: 0,
                y: 40,
                scale: 0.94,
                duration: 0.8,
                stagger: 0.18
            },
            "-=0.3"
        )
        .from(car, { opacity: 0,  duration: 1 }, "-=1.1");

    // Numbers count up from 0 while the cards appear
    statValues.forEach((el, i) => {
        const target = Number(el.dataset.value);
        const counter = { value: 0 };
        el.textContent = "0";

        gsap.to(counter, {
            value: target,
            duration: 1.6,
            delay: 1.3 + i * 0.18,
            ease: "power2.out",
            onUpdate: () => {
                el.textContent = Math.round(counter.value);
            }
        });
    });

    return tl;
}

/* ---------- 4. Scroll-driven animation (core feature) ---------- */
let scrollTl;

function buildScrollAnimation() {
    if (scrollTl) {
        scrollTl.scrollTrigger.kill();
        scrollTl.kill();
        gsap.set([car, dashes, content, ...wheels], { clearProps: "transform,opacity" });
    }

    // How far the car can travel inside the road
    const travel = () => Math.max(road.clientWidth - car.getBoundingClientRect().width, 0);

    scrollTl = gsap.timeline({
        defaults: { ease: "none" }, // scrub already smooths the motion
        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=150%",      // 1.5 screens of scrolling drive the animation
            scrub: 1,           // 1s of smoothing/easing behind the scrollbar
            pin: true,          // keep the hero on screen while it plays
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });



    scrollTl
        // car drives left to right and grows a little (only transform is animated)
        .fromTo(car, { x: 0, scale: 1 }, { x: travel, scale: 1.12, ease: "power1.inOut" }, 0)
        // road dashes slide backwards so it feels like speed
        .fromTo(dashes, { x: 0 }, { x: -DASH_GAP * 4, ease: "none" }, 0)
        // headline block drifts up and fades
        .to(content, { y: -70, opacity: 0.25, ease: "power1.in" }, 0.35);
      



    // wheels spin around their own centre (SVG coordinates of each wheel)
    // svgOrigin keeps every wheel fixed on the car body while it rotates
    const wheelCenters = ["64 70", "180 70"];
    wheels.forEach((wheel, i) => {
        scrollTl.fromTo(
            wheel,
            { rotation: 0, svgOrigin: wheelCenters[i] },
            { rotation: 1080, svgOrigin: wheelCenters[i], ease: "none" },
            0
        );
    });
}

 function buildParallax() {
    gsap.to(".hero__glow", {
        x: -80,
        scale: 1.15,
        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=150%",
            scrub: 1
        }
    });
}

/* ---------- 5. Start everything ---------- */
function init() {
    splitHeadline();
    buildDashes();

    if (!reduceMotion) {
        playIntro();
        buildScrollAnimation();
        buildParallax();

        gsap.from(".next", {
    opacity: 0,
    y: 40,
    duration: 1,
    scrollTrigger: {
        trigger: ".next",
        start: "top 85%",
        toggleActions: "play none none reverse"
    }
});
    }

    // Rebuild on resize so distances stay correct
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildDashes();
            if (!reduceMotion) {
                buildScrollAnimation();
            }
            ScrollTrigger.refresh();
        }, 200);
    });
}

window.addEventListener("load", init);