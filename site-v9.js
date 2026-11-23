const b=document.querySelector('.mobile-menu'),n=document.querySelector('#main-nav');b?.addEventListener('click',()=>{const o=n.classList.toggle('is-open');b.setAttribute('aria-expanded',String(o));});n?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('is-open');b.setAttribute('aria-expanded','false')}));const d=document.querySelector('.lightbox');document.querySelectorAll('img[data-zoom]').forEach(img=>{img.tabIndex=0;function open(){d.querySelector('img').src=img.src;d.querySelector('img').alt=img.alt;d.querySelector('p').textContent=img.alt;d.showModal()}img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter')open()})});d?.querySelector('button').addEventListener('click',()=>d.close());d?.addEventListener('click',e=>{if(e.target===d)d.close()});

// Persistent, responsive header controls across all pages.
(() => {
  const headerRow = document.querySelector('.site-header .nav-row');
  const nav = document.querySelector('#main-nav');
  const menu = document.querySelector('.mobile-menu');
  if (!headerRow || !nav) return;

  // Reuse the existing local navigation path convention on project subpages.
  const projectsLink = Array.from(nav.querySelectorAll('a')).find(a => /(?:^|\/)projects\.html(?:[?#].*)?$/.test(a.getAttribute('href') || ''));
  if (projectsLink) projectsLink.textContent = 'Projects';
  const prefix = (projectsLink?.getAttribute('href') || '').startsWith('../') ? '../' : '';

  // Remove previous dynamic buttons or legacy header action links to avoid duplicates.
  headerRow.querySelectorAll('.nav-actions').forEach(el => el.remove());
  headerRow.querySelectorAll(':scope > a.nav-contact, :scope > a.nav-resume-desktop').forEach(el => el.remove());
  nav.querySelectorAll('.nav-resume-mobile').forEach(el => el.remove());

  const actions = document.createElement('div');
  actions.className = 'nav-actions';
  const resume = document.createElement('a');
  resume.href = prefix + 'resume.html';
  resume.className = 'nav-action-link';
  resume.textContent = 'Résumé ↗';
  resume.setAttribute('aria-label', 'View résumé');
  const contact = document.createElement('a');
  contact.href = 'mailto:hftackett@gmail.com';
  contact.className = 'nav-action-link';
  contact.textContent = 'Contact ↗';
  contact.setAttribute('aria-label', 'Contact by email');
  actions.append(resume, contact);
  headerRow.append(actions);

  // On compact screens, put the menu between the logo and the always-visible actions.
  if (menu) headerRow.insertBefore(menu, actions);

  if (!document.getElementById('persistent-header-css')) {
    const style = document.createElement('style');
    style.id = 'persistent-header-css';
    style.textContent = `
      .nav-row { gap: 18px; }
      #main-nav { margin-left:auto; gap: 16px; }
      .nav-actions { display:flex; gap:8px; align-items:center; flex:none; margin-left:4px; }
      .nav-action-link { display:inline-flex; justify-content:center; align-items:center;
        white-space:nowrap; border:1px solid var(--line,#383a41); padding:7px 10px;
        font-size:12px; font-weight:800; text-decoration:none; color:var(--ink,#f4f1ee); line-height:1.4; }
      .nav-action-link:hover { border-color:var(--red,#ff4855); color:var(--red,#ff4855); }
      @media (max-width:1100px) {
        .nav-row { gap:10px; }
        #main-nav { display:none; position:absolute; top:100%; left:0; right:0;
          background:#1a1b21; padding:23px; flex-direction:column; align-items:flex-start;
          gap:18px; border-bottom:1px solid var(--line,#383a41); margin:0; }
        #main-nav.is-open { display:flex; }
        .mobile-menu { display:block; margin-left:auto; color:#fff; background:none;
          border:1px solid var(--line,#383a41); padding:7px 11px; font-size:12px; }
        .nav-actions { margin-left:0; }
      }
      @media (max-width:480px) {
        .nav-row { gap:7px; }
        .logo { font-size:25px; }
        .mobile-menu { padding:6px 7px; font-size:11px; }
        .nav-actions { gap:5px; }
        .nav-action-link { padding:6px 6px; font-size:10px; }
      }
      @media (max-width:350px) {
        .nav-row { gap:5px; }
        .mobile-menu { font-size:10px; padding:5px; }
        .nav-action-link { font-size:9px; padding:5px 4px; }
      }
    `;
    document.head.appendChild(style);
  }
})();
