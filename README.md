# itzfizz-scroll-hero
Scroll-driven hero animation with a moving car, count-up stats and pinned section, built with HTML, CSS, JavaScript and GSAP ScrollTrigger.

*Live demo:* https://manvijaiswal-09.github.io/itzfizz-scroll-hero/

## Features

- *Scroll-linked animation*: the car moves with your scroll position, not with time. Scroll back up and it drives in reverse.
- *Pinned hero section*: the hero stays on screen while the animation plays.
- *Letter-by-letter headline intro*: the headline is split into letters and animated on page load.
- *Count-up stats*: four impact metrics count up from 0 when the page loads.
- *Moving road dashes and spinning wheels*: gives a real sense of speed.
- *Parallax glow*: the background glow drifts slowly as you scroll.
- *Responsive*: works on desktop, tablet and mobile.
- *Accessible*: respects prefers-reduced-motion.

## Tech Stack

- HTML5
- CSS3 (custom properties, grid, flexbox, clamp())
- JavaScript (ES6)
- [GSAP 3](https://gsap.com/) and ScrollTrigger (loaded from CDN)

## Project Structure


itzfizz-scroll-hero/
├── index.html    # Page structure and SVG car
├── style.css     # Layout, theme and responsive styles
├── script.js     # GSAP intro + scroll animations
└── README.md


## Getting Started

1. Clone the repository:
   bash
   git clone https://manvijaiswal-09.github.io/itzfizz-scroll-hero/
   
2. Open the folder:
   bash
   cd itzfizz-scroll-hero
   
3. Open index.html in your browser. No build step or install needed.

An internet connection is required for the first load, since GSAP is loaded from a CDN.

## How It Works

- splitHeadline() splits the heading into separate <span> letters.
- playIntro() runs a one-time GSAP timeline for the headline, stats and car.
- buildScrollAnimation() creates a ScrollTrigger timeline with pin and scrub. It moves the car, slides the road dashes, spins the wheels and fades the content.
- On window resize, the animation is rebuilt so distances stay correct.

## Customization

- Change stat numbers in index.html using the data-value attribute.
- Change colors in style.css under :root (for example --accent).
- Change scroll length in script.js by editing end: "+=150%".

## License

This project is open source and free to use for learning purposes.
