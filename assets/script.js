const DATA = [
  { 
    title:"Meilleurs iPhone 2025", 
    cat:"tech", 
    excerpt:"Photos, autonomie, rapport qualité/prix.", 
    badge:"Top Tech", 
    slug:"/categories/smartphones.html",
    img:"/assets/img/smartphones.jpg"
  },
  { 
    title:"Chaussures de running 10km", 
    cat:"sport", 
    excerpt:"Stabilité, amorti, dynamisme.", 
    badge:"Sport", 
    slug:"/categories/chaussures-running.html",
    img:"/assets/img/chaussures-running.jpg"
  },
  { 
    title:"Idées cadeaux — Fête des pères", 
    cat:"cadeaux", 
    excerpt:"Sélection à tous les budgets.", 
    badge:"Cadeaux", 
    slug:"/categories/idees-cadeaux.html",
    img:"/assets/img/idees-cadeaux.jpg"
  },
  { 
    title:"Aspirateurs balais 2025", 
    cat:"maison", 
    excerpt:"Puissance, autonomie, filtration.", 
    badge:"Maison", 
    slug:"/categories/aspirateurs.html",
    img:"/assets/img/aspirateurs.jpg"
  },
  { 
    title:"Robots cuiseurs", 
    cat:"cuisine", 
    excerpt:"Capacités, programmes, facilité d’usage.", 
    badge:"Cuisine", 
    slug:"/categories/robots-cuisine.html",
    img:"/assets/img/robots-cuisine.jpg"
  },
  { 
    title:"Casques Bluetooth", 
    cat:"tech", 
    excerpt:"Confort, ANC et audio.", 
    badge:"Audio", 
    slug:"/categories/casques-audio.html",
    img:"/assets/img/casques-audio.jpg"
  },
];
const grid = document.getElementById('grid');
const q = document.getElementById('q');
const menuBtn = document.getElementById('menuBtn');
const dropdown = document.getElementById('dropdown');
const modeToggle = document.getElementById('modeToggle');
function card(item){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div class="thumb">
  ${ item.img ? `<img src="${item.img}" alt="${item.title}">` : item.badge }
</div>
    <div class="body">
      <span class="badge">${item.badge}</span>
      <h3 style="margin:.2rem 0 .1rem">${item.title}</h3>
      <p style="margin:0; opacity:.85">${item.excerpt}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:.6rem">
        <small style="opacity:.7">${item.cat}</small>
        <a class="badge" href="${item.slug}">Voir</a>
      </div>
    </div>`;
  return el;
}
function render(list){ grid.innerHTML = ''; list.forEach(x => grid.appendChild(card(x))); }
function search(){
  const s = (q.value || '').toLowerCase();
  const filtered = DATA.filter(x => x.title.toLowerCase().includes(s) || x.excerpt.toLowerCase().includes(s) || x.cat.toLowerCase().includes(s));
  render(filtered);
}
menuBtn.addEventListener('click', ()=>{
  const open = dropdown.style.display === 'block';
  dropdown.style.display = open ? 'none' : 'block';
  menuBtn.setAttribute('aria-expanded', String(!open));
});
dropdown.addEventListener('click', (e)=>{
  if(e.target.matches('[data-cat]')){
    const cat = e.target.getAttribute('data-cat');
    const filtered = DATA.filter(x => x.cat === cat);
    render(filtered);
    dropdown.style.display = 'none';
    menuBtn.setAttribute('aria-expanded','false');
  }
});
document.addEventListener('click', (e)=>{ if(!dropdown.contains(e.target) && !menuBtn.contains(e.target)) dropdown.style.display = 'none'; });
q.addEventListener('input', search);
modeToggle.addEventListener('click', ()=>{
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  const next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('lmc-theme', next);
});
(function initTheme(){ const saved = localStorage.getItem('lmc-theme'); if(saved) document.documentElement.setAttribute('data-theme', saved); })();
render(DATA);
// Forcer tous les liens Amazon à s'ouvrir dans un nouvel onglet
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('a[href*="amazon."]').forEach(link => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
});
document.querySelectorAll('a[href*="amzn.to"]').forEach(link => {
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
});
// Bouton "Retour en haut"
(function backToTop(){
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const toggle = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    btn.classList.toggle('show', y > 800);
  };
  window.addEventListener('scroll', toggle, {passive:true});
  toggle();
  btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
})();
// --- Recherche instantanée sur les cartes de la page ---
(function () {
  const input = document.getElementById('q');
  if (!input) return;

  // Récupère toutes les cartes affichées sur la page (dans les grilles)
  const grids = Array.from(document.querySelectorAll('.grid'));
  const cards = grids.flatMap(g => Array.from(g.querySelectorAll('.card')));

  // Filtre les cartes selon le terme
  function applyFilter(term) {
    const t = term.trim().toLowerCase();

    // Si vide -> on réaffiche tout
    if (!t) {
      cards.forEach(card => (card.style.display = ''));
      return;
    }

    cards.forEach(card => {
      const h = card.querySelector('h3, h2');
      const p = card.querySelector('p');
      const hay = ((h ? h.textContent : '') + ' ' + (p ? p.textContent : '')).toLowerCase();
      card.style.display = hay.includes(t) ? '' : 'none';
    });
  }

  // Applique le filtre au fil de la saisie
  input.addEventListener('input', () => applyFilter(input.value));

  // Entrée -> filtre et focus sur le premier CTA visible
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      applyFilter(input.value);
      const firstVisible = cards.find(c => c.style.display !== 'none');
      const firstLink = firstVisible?.querySelector('a.pill, a');
      if (firstLink) firstLink.focus();
    }
  });

  // Si un paramètre ?q= est présent dans l'URL, on l’applique au chargement
  const params = new URLSearchParams(location.search);
  const qParam = params.get('q');
  if (qParam) {
    input.value = qParam;
    applyFilter(qParam);
  }
})();



