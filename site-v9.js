const b=document.querySelector('.mobile-menu'),n=document.querySelector('#main-nav');b?.addEventListener('click',()=>{const o=n.classList.toggle('is-open');b.setAttribute('aria-expanded',String(o));});n?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('is-open');b.setAttribute('aria-expanded','false')}));const d=document.querySelector('.lightbox');document.querySelectorAll('img[data-zoom]').forEach(img=>{img.tabIndex=0;function open(){d.querySelector('img').src=img.src;d.querySelector('img').alt=img.alt;d.querySelector('p').textContent=img.alt;d.showModal()}img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter')open()})});d?.querySelector('button').addEventListener('click',()=>d.close());d?.addEventListener('click',e=>{if(e.target===d)d.close()});
// Portfolio navigation: keep desktop controls alongside Contact and show Resume in mobile menu.
(() => {
  const mainNav = document.querySelector('#main-nav');
  const contact = document.querySelector('.nav-contact');
  if (!mainNav) return;

  const engineering = [...mainNav.querySelectorAll('a')]
    .find(link => link.getAttribute('href')?.endsWith('projects.html'));
  if (engineering) engineering.textContent = 'Projects';

  if (contact && !document.querySelector('.nav-resume-desktop')) {
    const resumeButton = document.createElement('a');
    resumeButton.className = 'nav-contact nav-resume-desktop';
    resumeButton.href = mainNav.querySelector('a[href^="../"]') ? '../resume.html' : 'resume.html';
    resumeButton.textContent = 'Résumé ↗';
    contact.before(resumeButton);
  }

  if (!mainNav.querySelector('.nav-resume-mobile')) {
    const mobileResume = document.createElement('a');
    mobileResume.className = 'nav-resume-mobile';
    mobileResume.href = mainNav.querySelector('a[href^="../"]') ? '../resume.html' : 'resume.html';
    mobileResume.textContent = 'Résumé ↗';
    mainNav.append(mobileResume);
    mobileResume.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      document.querySelector('.mobile-menu')?.setAttribute('aria-expanded', 'false');
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    .nav-resume-desktop { margin-right: -20px; white-space: nowrap; }
    .nav-resume-mobile { display: none; }
    @media (max-width:760px) {
      .nav-resume-desktop { display: none; }
      .nav-resume-mobile { display: inline; }
    }
  `;
  document.head.append(style);
})();
