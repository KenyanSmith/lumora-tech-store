const STRIPE_CREATORSTICK_URL = https://buy.stripe.com/cNi3cu6f43me7Pu4hTgA800 
const products = [
  {id:'creatorstick',name:'CreatorStick™',price:29.99,tag:'BEST SELLER',category:'creator',rating:'★★★★★',description:'Portable 4-in-1 magnetic selfie stick that transforms into a tripod. Compact, adjustable, and made for photos, videos, livestreams, and everyday content.'},
  {id:'snapcharge',name:'SnapCharge™',price:34.99,tag:'COMING SOON',category:'power',rating:'',description:'Magnetic portable power concept for compatible phones and everyday carry.'},
  {id:'glowclip',name:'GlowClip™',price:19.99,tag:'COMING SOON',category:'lighting',rating:'',description:'Compact creator light concept for photos, videos, calls, and quick content.'},
  {id:'soundclip',name:'SoundClip™',price:32.99,tag:'COMING SOON',category:'audio',rating:'',description:'Wireless clip microphone concept for cleaner voice capture on the go.'}
];
let cart=[];
const money=v=>`$${v.toFixed(2)}`;
const iconFor=id=>id==='creatorstick'?'✦':id==='snapcharge'?'⚡':id==='glowclip'?'☼':'◉';

function renderProducts(){
 const grid=document.getElementById('productGrid'); if(!grid)return;
 const q=(document.getElementById('searchInput')?.value||'').trim().toLowerCase();
 const cat=document.getElementById('categorySelect')?.value||'all';
 const filtered=products.filter(p=>(cat==='all'||p.category===cat)&&(!q||`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q)));
 document.getElementById('resultCount').textContent=`${filtered.length} product${filtered.length===1?'':'s'}`;
 document.getElementById('noResults').hidden=filtered.length!==0;
 grid.innerHTML=filtered.map(p=>`<article class="product-card"><div class="product-art"><span>${p.tag}</span><div class="product-icon ${p.category==='creator'?'creator':''}">${iconFor(p.id)}</div></div><div class="product-info"><div class="product-top"><h3>${p.name}</h3><b>${money(p.price)}</b></div>${p.rating?`<div class="rating">${p.rating}</div>`:''}<p>${p.description}</p>${p.id==='creatorstick'?'<div class="card-actions"><button class="secondary-btn add-cart" data-product-id="creatorstick">Add to cart</button><button class="shop-btn buy-now" data-product-id="creatorstick">Buy now</button></div>':'<button class="secondary-btn planned-btn" type="button">Coming soon</button>'}</div></article>`).join('');
 grid.querySelectorAll('.buy-now').forEach(b=>b.addEventListener('click',()=>location.href=STRIPE_CREATORSTICK_URL));
 grid.querySelectorAll('.add-cart').forEach(b=>b.addEventListener('click',()=>{cart=[{...products.find(p=>p.id==='creatorstick'),qty:1}];updateCart();openCart();}));
 grid.querySelectorAll('.planned-btn').forEach(b=>b.addEventListener('click',()=>alert('This product is planned for a future LUMORA TECH drop.')));
}
function updateCart(){
 const count=document.getElementById('cartCount'),items=document.getElementById('cartItems'),empty=document.getElementById('cartEmpty'),subtotal=document.getElementById('subtotal');
 if(count)count.textContent=cart.reduce((s,i)=>s+i.qty,0);
 if(subtotal)subtotal.textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0));
 if(!items)return;
 empty.style.display=cart.length?'none':'block';
 items.innerHTML=cart.map(i=>`<div class="cart-item"><div><b>${i.name}</b><small>${money(i.price)} × ${i.qty}</small></div><button data-remove="${i.id}">Remove</button></div>`).join('');
 items.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{cart=cart.filter(i=>i.id!==b.dataset.remove);updateCart();}));
}
function openCart(){const d=document.getElementById('cartDrawer');d?.classList.add('open');d?.setAttribute('aria-hidden','false')}
function closeCart(){const d=document.getElementById('cartDrawer');d?.classList.remove('open');d?.setAttribute('aria-hidden','true')}
function applyFilter(filter){const select=document.getElementById('categorySelect'); if(select)select.value=filter||'all'; document.getElementById('searchInput').value=''; renderProducts(); document.getElementById('shop')?.scrollIntoView({behavior:'smooth'});}

document.addEventListener('DOMContentLoaded',()=>{
 renderProducts();updateCart();
 document.getElementById('searchBtn')?.addEventListener('click',renderProducts);
 document.getElementById('searchInput')?.addEventListener('input',renderProducts);
 document.getElementById('categorySelect')?.addEventListener('change',renderProducts);
 document.querySelectorAll('[data-filter]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();applyFilter(a.dataset.filter)}));
 document.querySelectorAll('.add-featured').forEach(b=>b.addEventListener('click',()=>location.href=STRIPE_CREATORSTICK_URL));
 document.getElementById('cartBtn')?.addEventListener('click',openCart);document.getElementById('closeCart')?.addEventListener('click',closeCart);document.getElementById('cartBackdrop')?.addEventListener('click',closeCart);
 document.getElementById('checkoutBtn')?.addEventListener('click',()=>location.href=STRIPE_CREATORSTICK_URL);
});
