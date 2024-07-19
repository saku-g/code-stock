const stickySections = document.querySelectorAll('.js-stickyStackWrapper > section');

stickySections.forEach(section => {
  const visual = section.querySelector('img');
  gsap.from(visual, {
    scrollTrigger: {
      trigger: visual,
      start: 'bottom bottom',
      pin: true,
      markers: true,
    },
  });
});

const lenis = new Lenis();

lenis.on('scroll', e => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
