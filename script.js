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
    intro: 'A SystemVerilog FPGA game built from separate arithmetic, state, control, input, and seven-segment display modules.',
    points: [
      'Integrated an ALU, state registers, landing/crash controller, and seven-segment display driver in lunarlander.sv.',
      'Built 4-bit full adders, cascaded BCD adders, and a nine’s-complement-based BCD adder/subtracter.',
      'Calculated updated altitude, velocity, and fuel using gravity and effective thrust; stored state in clocked registers.',
      'Used synchronized key input and clock prescaling, with red/green indicators for crash and landing states.',
      'The supplied files reference additional clock, key-sync, and seven-segment decoder modules not included in this upload.'
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
  },
  mosfet: {
    title: 'Discrete MOSFET operational amplifier',
    intro: 'ECE 2K8 Lab 6: constructing a multistage CMOS op-amp from MOSFET arrays and testing each subsystem.',
    points: [
      'Built an NMOS current mirror and measured a 1.97:1 output-current ratio versus the 2:1 design ratio.',
      'Built an active-load differential stage with approximately 44.76 V/V measured single-ended gain.',
      'Added a common-source gain stage and source follower; tested open-loop comparator switching.',
      'Configured the full circuit as an inverting amplifier: measured −9.29 V/V versus −10 V/V target (7.1% error).'
    ]
  },
  inventory: {
    title: 'Inventory management system in C',
    intro: 'A command-line inventory manager that stores items in a dynamically allocated singly linked list and supports saving and loading comma-separated inventory records.',
    points: [
      'Implemented a six-option interactive menu: add an item, display inventory, update stock by ID, save, load, or exit.',
      'Represented each item using a struct containing an ID, name, stock quantity, price, category enum, and next-node pointer.',
      'Used malloc and linked-list traversal for adding, displaying, and modifying entries; freed allocated nodes on exit.',
      'Implemented file persistence using fopen, fprintf, fgets, and strtok, saving each item as a comma-separated record.',
      'Validated nonnegative quantities and prices. Potential next improvements include robust input validation, category bounds checks, and avoiding duplicate records when appending to a file.'
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
    const attachments = {
      rocket: {documents:[['Rocket design report (PDF)','assets/docs/rocket-design-report.pdf']], figures:[['OpenRocket simulation and CAD figure','assets/psp-figure-1.webp'],['CAD and flight simulation','assets/psp-figure-2.webp'],['Rocket endcap CAD','assets/psp-figure-3.webp'],['Rocket body cross-section','assets/psp-figure-4.webp']]},
      equalizer: {documents:[['Audio equalizer lab report (PDF)','assets/docs/audio-equalizer-report.pdf']]},
      sensor: {documents:[['Optical heart-rate report (PDF)','assets/docs/optical-heart-rate-report.pdf']]},
      mosfet: {documents:[['MOSFET amplifier Lab 6 writeup (PDF)','assets/docs/mosfet-amplifier-lab6.pdf']],figures:[['Current mirror schematic','assets/mosfet-figure-1.webp'],['Differential amplifier schematic','assets/mosfet-figure-2.webp']]},
      fpga: {documents:[['Lunar Lander source overview','assets/code/lunar-lander/README.md'],['Top-level design (SystemVerilog)','assets/code/lunar-lander/lunarlander.sv'],['BCD arithmetic source','assets/code/lunar-lander/bcd_arithmetic.sv'],['ALU module','assets/code/lunar-lander/ll_alu.sv'],['Control module','assets/code/lunar-lander/ll_control.sv'],['Memory module','assets/code/lunar-lander/ll_memory.sv'],['Display module','assets/code/lunar-lander/ll_display.sv'],['BCD arithmetic lab notebook','assets/code/lunar-lander/lab10-bcd-arithmetic.ipynb']]},inventory: {documents:[['C source code','assets/code/inventoryc_tackettproj.c'],['Header file','assets/code/inventoryh_tackettproj.h']]}
    };
    const detail = attachments[card.dataset.project] || {};
    const linkBox = document.querySelector('#dialog-links');
    const galleryBox = document.querySelector('#dialog-gallery');
    linkBox.replaceChildren(); galleryBox.replaceChildren();
    (detail.documents || []).forEach(([label,href]) => {
      const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener';a.textContent=label+' ↗';linkBox.append(a);
    });
    (detail.figures || []).forEach(([label,src]) => {
      const figure=document.createElement('figure');const im=document.createElement('img');im.src=src;im.alt=label;im.loading='lazy';
      const cap=document.createElement('figcaption');cap.textContent=label;figure.append(im,cap);galleryBox.append(figure);
    });
    dialog.showModal();
  });
});
close.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => previousFocus?.focus());

// Optional video inside project detail modal.
const dialogMedia = document.querySelector('#dialog-media');
document.querySelectorAll('.project-card .project-open').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.closest('.project-card').dataset.project;
    const video = key === 'equalizer' ? 'equalizer-demo' : key === 'sensor' ? 'pulse-sensor-demo' : null;
    dialogMedia.replaceChildren();
    dialogMedia.hidden = !video;
    if (video) {
      const player = document.createElement('video');
      player.controls = true;
      player.preload = 'metadata';
      player.playsInline = true;
      player.poster = `assets/${video}.jpg`;
      player.src = `assets/${video}.mp4`;
      player.setAttribute('aria-label', key === 'equalizer' ? 'Audio equalizer demo' : 'Optical pulse sensor demo');
      dialogMedia.append(player);
    }
  });
});
dialog.addEventListener('close', () => {dialogMedia.querySelector('video')?.pause();});
