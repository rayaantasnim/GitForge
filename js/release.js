gsap.registerPlugin(ScrollTrigger);

const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const menuOverlay = document.getElementById("menuOverlay");
const menuBackdrop = document.getElementById("menuBackdrop");
const navLinks = document.querySelectorAll(".nav-menu-link");

const navTl = gsap.timeline({ paused: true });
navTl
  .to(menuBackdrop, {
    duration: 0.3,
    opacity: 1,
    pointerEvents: "auto",
    ease: "power2.out",
  })
  .to(
    menuOverlay,
    { duration: 0.35, x: "0%", pointerEvents: "auto", ease: "power3.out" },
    "-=0.15",
  )
  .fromTo(
    navLinks,
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.25, stagger: 0.05, ease: "power2.out" },
    "-=0.15",
  );

function openNavigation() {
  navTl.play();
  document.body.style.overflow = "hidden";
}

function closeNavigation() {
  navTl.reverse();
  document.body.style.overflow = "";
}

menuToggle.addEventListener("click", openNavigation);
menuClose.addEventListener("click", closeNavigation);
menuBackdrop.addEventListener("click", closeNavigation);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNavigation();
});

document.querySelectorAll(".conceptual-row").forEach((row) => {
  const copyEl = row.querySelector(".content-copy");
  const imgBoxEl = row.querySelector(".content-image-box");

  if (copyEl) {
    gsap.fromTo(
      copyEl,
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      },
    );
  }

  if (imgBoxEl) {
    gsap.fromTo(
      imgBoxEl,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      },
    );
  }
});
