const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const projectDetails = {
  rocket: {
    title: 'Rocket design & testing',
    intro: 'An introduction to real-world design tradeoffs: buildability, fit, stability, and what happens after launch.',
    points: [
      'Modeled a model-rocket nose cone, body, and assembly features using Siemens NX.',
      'Used OpenRocket to explore stability and flight behavior, targeting approximately 1.5 calibers of stability.',
      'Prepared components for 3D printing and worked through mechanical fit and recovery-system questions.',
      'Launched the rocket with Purdue Space Program; used observations from launch to think about future improvements.'
    ]
  },
  equalizer: {
    title: 'Three-band audio equalizer',
    intro: 'A hands-on analog audio project combining filter design with measurement and debugging.',
    points: [
      'Worked with high-pass, band-pass, and low-pass paths using op-amp-based analog circuits.',
      'Investigated interstage loading and added a buffer to improve output performance.',
      'Achieved approximately 483 mW into an 8 Ω load against a 400 mW requirement.',
      'Used circuit analysis, simulation, and bench testing to validate results.'
    ]
  },
  fpga: {
    title: 'FPGA Lunar Lander',
    intro: 'A digital game implemented as synchronous hardware rather than conventional application software.',
    points: [
      'Developed modules in SystemVerilog for game control, arithmetic, input handling, timing, and display.',
      'Implemented custom BCD arithmetic and seven-segment output logic.',
      'Used clock division and synchronized push-button inputs.',
      'Verified the design on FPGA hardware.'
    ]
  },
  sensor: {
    title: 'Optical pulse sensor',
    intro: 'An analog sensing and signal-conditioning circuit built around detecting small optical changes.',
    points: [
      'Used infrared sensing as the input to a staged analog signal-processing chain.',
      'Worked with active filters, comparator hysteresis, and MOSFET switching.',
      'Tested subsystems individually with bench instrumentation before full integration.',
      'Practiced systematic troubleshooting of noisy, small-amplitude signals.'
    ]
  }
};
const dialog = document.querySelector('#project-dialog');
const close = document.querySelector('.dialog-close');
let previousFocus;
document.querySelectorAll('.project-card').forEach(card => {
  card.querySelector('.project-open').addEventListener('click', () => {
    const data = projectDetails[card.dataset.project];
    if (!data) return;
    previousFocus = document.activeElement;
    document.querySelector('#dialog-title').textContent = data.title;
    document.querySelector('#dialog-intro').textContent = data.intro;
    document.querySelector('#dialog-points').replaceChildren(...data.points.map(point => {
      const li = document.createElement('li'); li.textContent = point; return li;
    }));
    dialog.showModal();
  });
});
close.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => previousFocus?.focus());
