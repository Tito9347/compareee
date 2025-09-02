// === CONFIG ===
const GA_ID = 'G-ZV8VW7Y5FZ'; // 
const STORAGE_KEY = 'lmc-consent'; // 'accepted' | 'refused'

// Détecter si on est dans un sous-dossier (pages/ ou categories/)
const isNested = location.pathname.includes('/categories/') || location.pathname.includes('/pages/');
const prefix = isNested ? '..' : '.';
const privacyURL = `${prefix}/pages/confidentialite.html`;

// Charge Google Analytics UNIQUEMENT si consentement accepté
function loadGA(id){
  if (!id || window.__gaLoaded) return;
  window.__gaLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', id);
  trackAmazonClicks();
}
// Track Amazon link clicks
function trackAmazonClicks(){
  document.querySelectorAll('a.amazon-link').forEach(link=>{
    link.addEventListener('click', ()=>{
      if (window.gtag) {
        gtag('event', 'click', {
          event_category: 'Affiliation',
          event_label: 'Amazon',
          transport_type: 'beacon'
        });
        console.log('[consent] Click Amazon event envoyé à GA4');
      }
    });
  });
}


// Injecte le CSS du bandeau
function injectBannerStyles(){
  const css = `
  .cookie-banner{position:fixed;inset:auto 0 0 0;z-index:9999;background:var(--card,#fff);color:var(--ink,#333);
    border-top:1px solid rgba(0,0,0,.1);box-shadow:0 -8px 24px rgba(0,0,0,.08);font-family:var(--font-body,system-ui)}
  .cookie-inner{width:min(1100px,100% - 2rem);margin-inline:auto;padding:.9rem 0;display:flex;gap:.8rem;align-items:center;flex-wrap:wrap;justify-content:space-between}
  .cookie-text{flex:1;min-width:260px;font-size:.95rem;line-height:1.5}
  .cookie-actions{display:flex;gap:.5rem}
  .cookie-actions button{cursor:pointer;border-radius:999px;padding:.5rem .9rem;font-weight:700;border:1px solid transparent}
  .cookie-accept{background:var(--green,#0F5C4A);color:var(--ink-on-green,#EAF5F1);border-color:var(--green,#0F5C4A)}
  .cookie-refuse{background:color-mix(in oklab,var(--beige,#F5F1E8) 92%, transparent);color:var(--green,#0F5C4A);border:1px solid var(--green,#0F5C4A)}
  .cookie-text a{color:var(--green,#0F5C4A);text-decoration:underline}
  `;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);
}

// Affiche le bandeau
function showBanner(){
  injectBannerStyles();
  const el = document.createElement('div');
  el.className = 'cookie-banner';
  el.setAttribute('role','region');
  el.setAttribute('aria-label','Bandeau cookies');
  el.innerHTML = `
    <div class="cookie-inner">
      <div class="cookie-text">
        Nous utilisons des cookies <strong>uniquement</strong> pour la mesure d’audience (Google Analytics),
        après votre accord. Voir notre <a href="${privacyURL}">Politique de confidentialité</a>.
      </div>
      <div class="cookie-actions">
        <button class="cookie-refuse" type="button">Refuser</button>
        <button class="cookie-accept" type="button">Accepter</button>
      </div>
    </div>`;
  el.querySelector('.cookie-accept').addEventListener('click', ()=>{
    localStorage.setItem(STORAGE_KEY, 'accepted');
    el.remove(); loadGA(GA_ID);
  });
  el.querySelector('.cookie-refuse').addEventListener('click', ()=>{
    localStorage.setItem(STORAGE_KEY, 'refused');
    el.remove();
  });
  document.body.appendChild(el);
}

// Init
(function(){
  const val = localStorage.getItem(STORAGE_KEY);
  if (val === 'accepted') {
    loadGA(GA_ID);
  } else if (val === 'refused') {
    // rien
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else { showBanner(); }
  }
})();
