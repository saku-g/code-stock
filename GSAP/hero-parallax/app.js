// Swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  effect: 'fade',
  autoplay: {
    delay: 5000,
  },
});

let isFixed = false;
let originalTop = 0;

gsap.to('#js-heroImg', {
  scrollTrigger: {
    trigger: '#js-heroImg',
    start: 'top top',
    endTrigger: '#js-heroContent',
    pin: true,
    // onEnter: () => {
    //   if (!isFixed) {
    //     isFixed = true;
    //     gsap.set('#js-heroImg', { position: 'fixed', top: 0, left: 0, width: '100%' });
    //   }
    // },
    // onLeaveBack: () => {
    //   if (isFixed) {
    //     isFixed = false;
    //     gsap.set('#js-heroImg', { position: 'absolute', top: originalTop, left: 0 });
    //   }
    // },
    markers: true,
  },
});
