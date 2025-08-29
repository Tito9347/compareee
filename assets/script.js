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
    <div class="thumb">${item.badge}</div>
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
