import { useState, useEffect, useRef } from “react”;

const styles = `
@import url(‘https://fonts.googleapis.com/css2?family=Pacifico&family=Nunito:wght@400;600;700;800&display=swap’);

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
–cream: #FFF8F0;
–pink: #F2788D;
–pink-dark: #D95B72;
–mint: #5CC8A8;
–mint-dark: #3EA888;
–chocolate: #5C3317;
–caramel: #E8A44A;
–caramel-dark: #C8831A;
–text: #2D1A0E;
–muted: #8B6F5E;
–white: #FFFFFF;
–shadow: 0 4px 24px rgba(44,26,14,0.10);
–shadow-lg: 0 8px 40px rgba(44,26,14,0.16);
}

html { scroll-behavior: smooth; }
body { font-family: ‘Nunito’, sans-serif; background: var(–cream); color: var(–text); overflow-x: hidden; }

nav {
position: sticky; top: 0; z-index: 100;
background: var(–white); box-shadow: 0 2px 16px rgba(44,26,14,0.08);
display: flex; align-items: center; justify-content: space-between;
padding: 0.75rem 2rem;
}
.nav-logo { font-family: ‘Pacifico’, cursive; font-size: 1.35rem; color: var(–pink-dark); text-decoration: none; }
.nav-links { display: flex; gap: 1.5rem; list-style: none; }
.nav-links a { text-decoration: none; font-weight: 700; color: var(–text); font-size: 0.95rem; transition: color 0.2s; }
.nav-links a:hover { color: var(–pink-dark); }
.nav-cta {
background: var(–pink); color: var(–white); border: none;
padding: 0.5rem 1.25rem; border-radius: 50px;
font-family: ‘Nunito’, sans-serif; font-weight: 800; font-size: 0.9rem;
cursor: pointer; text-decoration: none; display: inline-block;
transition: background 0.2s, transform 0.15s;
}
.nav-cta:hover { background: var(–pink-dark); transform: scale(1.04); }

.hero {
min-height: 92vh;
background: linear-gradient(135deg, #FFE8D6 0%, #FFF0F5 40%, #E8F8F2 100%);
display: flex; flex-direction: column; align-items: center; justify-content: center;
text-align: center; padding: 4rem 1.5rem 3rem;
position: relative; overflow: hidden;
}
.hero-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.45; pointer-events: none; }
.blob1 { width: 420px; height: 420px; background: var(–pink); top: -100px; right: -80px; animation: float 7s ease-in-out infinite; }
.blob2 { width: 320px; height: 320px; background: var(–mint); bottom: -60px; left: -60px; animation: float 9s ease-in-out infinite reverse; }
.blob3 { width: 220px; height: 220px; background: var(–caramel); top: 40%; left: 10%; animation: float 6s ease-in-out infinite 1s; }
@keyframes float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-28px) scale(1.04)} }

.hero-tag {
display: inline-block; background: var(–pink); color: var(–white);
font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
padding: 0.35rem 1rem; border-radius: 50px; margin-bottom: 1.2rem;
animation: fadeUp 0.6s ease both;
}
.hero h1 {
font-family: ‘Pacifico’, cursive;
font-size: clamp(2.8rem, 8vw, 5.5rem); line-height: 1.1;
color: var(–chocolate); margin-bottom: 1rem;
animation: fadeUp 0.7s ease 0.1s both;
}
.hero h1 span { color: var(–pink-dark); }
.hero-sub {
font-size: clamp(1rem, 2.5vw, 1.2rem); color: var(–muted); font-weight: 600;
max-width: 520px; margin: 0 auto 2.2rem;
animation: fadeUp 0.7s ease 0.2s both;
}
.hero-btns { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; animation: fadeUp 0.7s ease 0.3s both; }
.btn-primary {
background: var(–pink-dark); color: var(–white); border: none;
padding: 0.85rem 2rem; border-radius: 50px;
font-family: ‘Nunito’, sans-serif; font-weight: 800; font-size: 1rem;
cursor: pointer; box-shadow: 0 4px 20px rgba(217,91,114,0.35);
transition: background 0.2s, transform 0.15s; text-decoration: none; display: inline-block;
}
.btn-primary:hover { background: #c44d64; transform: translateY(-2px); }
.btn-secondary {
background: var(–white); color: var(–chocolate); border: 2.5px solid var(–chocolate);
padding: 0.85rem 2rem; border-radius: 50px;
font-family: ‘Nunito’, sans-serif; font-weight: 800; font-size: 1rem;
cursor: pointer; transition: background 0.2s, transform 0.15s;
text-decoration: none; display: inline-block;
}
.btn-secondary:hover { background: var(–cream); transform: translateY(-2px); }
.hero-scoop {
font-size: clamp(4rem, 12vw, 8rem); margin-top: 2.5rem; line-height: 1; position: relative; z-index: 1;
animation: fadeUp 0.7s ease 0.4s both, wobble 3s ease-in-out 1.2s infinite;
}
@keyframes wobble { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

.info-strip {
background: var(–chocolate); color: var(–white);
display: flex; flex-wrap: wrap; justify-content: center;
}
.info-item {
display: flex; align-items: center; gap: 0.6rem;
padding: 1rem 2rem; font-weight: 700; font-size: 0.95rem;
border-right: 1px solid rgba(255,255,255,0.15);
transition: background 0.2s; text-decoration: none; color: var(–white); cursor: pointer;
background: none; border-top: none; border-bottom: none; border-left: none; font-family: ‘Nunito’, sans-serif;
}
.info-item:last-child { border-right: none; }
.info-item:hover { background: rgba(255,255,255,0.08); }
.info-icon { font-size: 1.2rem; }

section { padding: 5rem 1.5rem; }
.section-label { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(–pink-dark); margin-bottom: 0.6rem; }
.section-title { font-family: ‘Pacifico’, cursive; font-size: clamp(1.8rem, 4vw, 2.8rem); color: var(–chocolate); margin-bottom: 1rem; line-height: 1.2; }
.section-sub { color: var(–muted); font-size: 1.05rem; max-width: 500px; font-weight: 600; }

#flavors { background: var(–white); }
.flavors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 1.2rem; max-width: 960px; margin: 0 auto; }
.flavor-card {
background: var(–cream); border-radius: 20px; padding: 1.5rem 1rem;
text-align: center; transition: transform 0.2s, box-shadow 0.2s;
border: 2px solid transparent; cursor: default;
}
.flavor-card:hover { transform: translateY(-6px); box-shadow: var(–shadow-lg); border-color: var(–pink); }
.flavor-emoji { font-size: 2.4rem; margin-bottom: 0.6rem; }
.flavor-name { font-weight: 800; font-size: 0.95rem; color: var(–chocolate); }
.flavor-desc { font-size: 0.8rem; color: var(–muted); margin-top: 0.25rem; font-weight: 600; }

#visit { background: linear-gradient(135deg, #FFF0F5 0%, #E8F8F2 100%); }
.visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 900px; margin: 0 auto; }
.visit-card { background: var(–white); border-radius: 24px; padding: 2rem; box-shadow: var(–shadow); }
.visit-card h3 { font-family: ‘Pacifico’, cursive; font-size: 1.3rem; color: var(–chocolate); margin-bottom: 1.2rem; }
.hours-row { display: flex; justify-content: space-between; padding: 0.55rem 0; border-bottom: 1px dashed rgba(44,26,14,0.1); font-weight: 700; font-size: 0.95rem; }
.hours-row:last-child { border-bottom: none; }
.hours-row .day { color: var(–muted); }
.hours-row .time { color: var(–chocolate); }
.hours-row.today .day, .hours-row.today .time { color: var(–mint-dark); }
.hours-row.today { background: rgba(92,200,168,0.08); border-radius: 8px; padding-left: 0.5rem; padding-right: 0.5rem; }
.closed-text { color: var(–pink-dark) !important; }
.address-block { margin-bottom: 1.5rem; }
.address-block p { font-weight: 700; color: var(–text); line-height: 1.8; font-size: 1rem; }
.address-muted { color: var(–muted) !important; font-size: 0.85rem !important; margin-top: 0.5rem; font-weight: 600 !important; }
.map-btn {
display: flex; align-items: center; gap: 0.5rem; justify-content: center;
background: var(–mint); color: var(–white); border: none;
padding: 0.8rem 1.5rem; border-radius: 50px;
font-family: ‘Nunito’, sans-serif; font-weight: 800; font-size: 0.95rem;
cursor: pointer; width: 100%; transition: background 0.2s, transform 0.15s;
box-shadow: 0 4px 16px rgba(92,200,168,0.3);
}
.map-btn:hover { background: var(–mint-dark); transform: translateY(-2px); }
.call-btn {
display: flex; align-items: center; gap: 0.5rem; justify-content: center;
background: var(–caramel); color: var(–white); border: none;
padding: 0.8rem 1.5rem; border-radius: 50px;
font-family: ‘Nunito’, sans-serif; font-weight: 800; font-size: 0.95rem;
cursor: pointer; width: 100%; margin-top: 0.75rem;
transition: background 0.2s, transform 0.15s; text-decoration: none;
box-shadow: 0 4px 16px rgba(232,164,74,0.3);
}
.call-btn:hover { background: var(–caramel-dark); transform: translateY(-2px); }
.amenities { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; }
.amenity-tag { background: var(–cream); border-radius: 50px; padding: 0.3rem 0.75rem; font-size: 0.8rem; font-weight: 700; color: var(–muted); }

#about { background: var(–chocolate); color: var(–white); text-align: center; }
#about .section-label { color: var(–caramel); }
#about .section-title { color: var(–white); }
#about .section-sub { color: rgba(255,255,255,0.7); margin: 0 auto 2.5rem; }
.about-stats { display: flex; justify-content: center; flex-wrap: wrap; gap: 3rem; }
.stat { text-align: center; }
.stat-num { font-family: ‘Pacifico’, cursive; font-size: 3rem; color: var(–caramel); line-height: 1; }
.stat-label { font-size: 0.9rem; font-weight: 700; color: rgba(255,255,255,0.6); margin-top: 0.3rem; text-transform: uppercase; letter-spacing: 0.08em; }

.specials { background: var(–pink); color: var(–white); text-align: center; padding: 3rem 1.5rem; }
.specials h2 { font-family: ‘Pacifico’, cursive; font-size: clamp(1.6rem, 4vw, 2.4rem); margin-bottom: 0.75rem; }
.specials p { font-size: 1.05rem; font-weight: 600; opacity: 0.9; max-width: 500px; margin: 0 auto 2rem; }
.specials-emojis { font-size: 2.5rem; letter-spacing: 0.5rem; }

footer { background: #1A0A04; color: rgba(255,255,255,0.55); text-align: center; padding: 2.5rem 1.5rem; font-size: 0.9rem; font-weight: 600; line-height: 2.2; }
footer a { color: var(–pink); text-decoration: none; }
.footer-logo { font-family: ‘Pacifico’, cursive; font-size: 1.6rem; color: var(–white); margin-bottom: 0.5rem; display: block; }

/* MAPS MODAL */
.modal-overlay {
position: fixed; inset: 0; z-index: 200;
background: rgba(44,26,14,0.55); backdrop-filter: blur(6px);
display: flex; align-items: flex-end; justify-content: center;
animation: fadeOverlay 0.2s ease;
}
@keyframes fadeOverlay { from{opacity:0} to{opacity:1} }
.modal-sheet {
background: var(–white); border-radius: 28px 28px 0 0;
padding: 2rem 1.5rem 2.5rem; width: 100%; max-width: 480px;
animation: slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
.modal-handle { width: 40px; height: 4px; background: #DDD; border-radius: 4px; margin: 0 auto 1.5rem; }
.modal-title { font-family: ‘Pacifico’, cursive; font-size: 1.3rem; color: var(–chocolate); margin-bottom: 0.4rem; text-align: center; }
.modal-addr { text-align: center; color: var(–muted); font-weight: 700; font-size: 0.9rem; margin-bottom: 1.5rem; }
.map-options { display: flex; flex-direction: column; gap: 0.75rem; }
.map-option {
display: flex; align-items: center; gap: 1rem;
padding: 1rem 1.25rem; border-radius: 16px; border: 2px solid #F0E8E0;
background: var(–cream); cursor: pointer;
transition: border-color 0.18s, background 0.18s, transform 0.15s;
text-decoration: none; color: var(–text); font-weight: 800; font-size: 0.97rem;
}
.map-option:hover { border-color: var(–pink); background: #FFF0F3; transform: translateX(4px); }
.map-option-icon { font-size: 1.7rem; width: 2.4rem; text-align: center; flex-shrink: 0; }
.map-option-info { display: flex; flex-direction: column; }
.map-option-sub { font-size: 0.78rem; color: var(–muted); font-weight: 600; margin-top: 0.1rem; }
.modal-cancel {
margin-top: 1rem; width: 100%; padding: 0.8rem; border-radius: 12px;
border: none; background: #F5EDE8; color: var(–muted);
font-family: ‘Nunito’, sans-serif; font-weight: 800; font-size: 0.95rem; cursor: pointer;
transition: background 0.18s;
}
.modal-cancel:hover { background: #EDE0D8; }

.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 700px) {
nav { padding: 0.75rem 1rem; }
.nav-links { display: none; }
.visit-grid { grid-template-columns: 1fr; }
.info-item { padding: 0.75rem 1rem; font-size: 0.82rem; }
}
`;

const ADDRESS = “102 Main St, Moravia, NY 13118”;
const PHONE = “(315) 730-7990”;
const PHONE_HREF = “tel:+13157307990”;
const ENC = encodeURIComponent(ADDRESS);

const MAP_OPTIONS = [
{ icon: “🗺️”, label: “Google Maps”, sub: “maps.google.com”, url: `https://www.google.com/maps/search/?api=1&query=${ENC}` },
{ icon: “🍎”, label: “Apple Maps”,  sub: “maps.apple.com”,  url: `https://maps.apple.com/?q=${ENC}` },
{ icon: “🔵”, label: “Waze”,        sub: “waze.com”,        url: `https://waze.com/ul?q=${ENC}&navigate=yes` },
{ icon: “🧭”, label: “Bing Maps”,   sub: “bing.com/maps”,   url: `https://www.bing.com/maps?q=${ENC}` },
];

const FLAVORS = [
{ emoji: “🍦”, name: “Classic Vanilla”,   desc: “Perry’s sweet & creamy” },
{ emoji: “🍫”, name: “Chocolate Fudge”,   desc: “Rich & indulgent” },
{ emoji: “🍓”, name: “Strawberry”,        desc: “Fresh & bright” },
{ emoji: “⚡”,  name: “White Lightning”,   desc: “Perry’s fan favorite” },
{ emoji: “🍬”, name: “Cotton Candy”,      desc: “Carnival vibes” },
{ emoji: “🍑”, name: “Peach”,             desc: “Summer in a cone” },
{ emoji: “🌈”, name: “Rainbow Sherbet”,   desc: “A little of everything” },
{ emoji: “🍪”, name: “Cookies & Cream”,   desc: “Crowd favorite” },
{ emoji: “🥜”, name: “Peanut Butter”,     desc: “Nutty & smooth” },
{ emoji: “🍵”, name: “Mint Chip”,         desc: “Cool & refreshing” },
{ emoji: “🍮”, name: “Butter Pecan”,      desc: “Southern classic” },
{ emoji: “🫐”, name: “Wild Blueberry”,    desc: “Locally inspired” },
];

const HOURS = [
{ day: “Monday”,    time: “11am – 9pm” },
{ day: “Tuesday”,   time: “11am – 9pm” },
{ day: “Wednesday”, time: “11am – 9pm” },
{ day: “Thursday”,  time: “11am – 9pm” },
{ day: “Friday”,    time: “11am – 9pm” },
{ day: “Saturday”,  time: “11am – 9pm” },
{ day: “Sunday”,    time: “1pm – 9pm” },
];

const DAY_MAP = [6, 0, 1, 2, 3, 4, 5];

export default function App() {
const [mapsOpen, setMapsOpen] = useState(false);
const revealRefs = useRef([]);

useEffect(() => {
const obs = new IntersectionObserver(
(entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(“visible”); }),
{ threshold: 0.12 }
);
revealRefs.current.forEach(el => el && obs.observe(el));
return () => obs.disconnect();
}, []);

const addReveal = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

const todayIdx   = DAY_MAP[new Date().getDay()];
const todayHours = HOURS[todayIdx];

return (
<>
<style>{styles}</style>

```
  {/* MAPS MODAL */}
  {mapsOpen && (
    <div className="modal-overlay" onClick={() => setMapsOpen(false)}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-title">Get Directions 🗺️</div>
        <div className="modal-addr">102 Main St · Moravia, NY 13118</div>
        <div className="map-options">
          {MAP_OPTIONS.map(opt => (
            <a key={opt.label} className="map-option" href={opt.url} target="_blank" rel="noreferrer" onClick={() => setMapsOpen(false)}>
              <span className="map-option-icon">{opt.icon}</span>
              <div className="map-option-info">
                <span>{opt.label}</span>
                <span className="map-option-sub">{opt.sub}</span>
              </div>
              <span style={{ marginLeft: "auto", opacity: 0.35 }}>›</span>
            </a>
          ))}
        </div>
        <button className="modal-cancel" onClick={() => setMapsOpen(false)}>Cancel</button>
      </div>
    </div>
  )}

  {/* NAV */}
  <nav>
    <a href="#top" className="nav-logo">Candy's Corner 🍦</a>
    <ul className="nav-links">
      <li><a href="#flavors">Flavors</a></li>
      <li><a href="#visit">Hours & Location</a></li>
      <li><a href="#about">Our Story</a></li>
    </ul>
    <a className="nav-cta" href={PHONE_HREF}>📞 {PHONE}</a>
  </nav>

  {/* HERO */}
  <div id="top" className="hero">
    <div className="hero-blob blob1" />
    <div className="hero-blob blob2" />
    <div className="hero-blob blob3" />
    <div className="hero-tag">🌽 102 Main St · Moravia, NY</div>
    <h1>Candy's<br /><span>Corner Cones</span></h1>
    <p className="hero-sub">
      Ice cream, candy, and good vibes right in the heart of Moravia. Featuring Perry's Ice Cream — family-friendly, air-conditioned, and always delicious.
    </p>
    <div className="hero-btns">
      <button className="btn-primary" onClick={() => setMapsOpen(true)}>📍 Get Directions</button>
      <a className="btn-secondary" href="#flavors">See Our Flavors</a>
    </div>
    <div className="hero-scoop">🍦</div>
  </div>

  {/* INFO STRIP */}
  <div className="info-strip">
    <button className="info-item" onClick={() => setMapsOpen(true)}>
      <span className="info-icon">📍</span> 102 Main St, Moravia
    </button>
    <a className="info-item" href={PHONE_HREF}>
      <span className="info-icon">📞</span> {PHONE}
    </a>
    <div className="info-item">
      <span className="info-icon">🕐</span>
      Today:&nbsp;<span style={{ color: todayHours.closed ? "#F2788D" : "#5CC8A8" }}>
        {todayHours.closed ? "Closed" : todayHours.time}
      </span>
    </div>
    <div className="info-item">
      <span className="info-icon">⭐</span> 4.3 Stars · Perry's Ice Cream
    </div>
  </div>

  {/* FLAVORS */}
  <section id="flavors">
    <div ref={addReveal} className="reveal" style={{ maxWidth: 960, margin: "0 auto 3rem", textAlign: "center" }}>
      <div className="section-label">What's Scooping</div>
      <div className="section-title">Today's Flavor Lineup</div>
      <p className="section-sub" style={{ margin: "0 auto" }}>
        Featuring Perry's Ice Cream — rotating seasonal flavors plus your beloved classics, always freshly scooped.
      </p>
    </div>
    <div className="flavors-grid reveal" ref={addReveal}>
      {FLAVORS.map(f => (
        <div className="flavor-card" key={f.name}>
          <div className="flavor-emoji">{f.emoji}</div>
          <div className="flavor-name">{f.name}</div>
          <div className="flavor-desc">{f.desc}</div>
        </div>
      ))}
    </div>
  </section>

  {/* SPECIALS BANNER */}
  <div className="specials">
    <div ref={addReveal} className="reveal">
      <h2>Weekend Specials & Seasonal Scoops</h2>
      <p>Follow us on Facebook or stop in to see what's new — we love surprising our regulars with limited-time creations.</p>
      <div className="specials-emojis">🍑 🍋 🫐 🍫 🍓</div>
    </div>
  </div>

  {/* HOURS & LOCATION */}
  <section id="visit">
    <div ref={addReveal} className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
      <div className="section-label">Come Find Us</div>
      <div className="section-title">Hours & Location</div>
      <p className="section-sub" style={{ margin: "0 auto" }}>Right on Main Street in Moravia — easy to find, hard to forget.</p>
    </div>
    <div className="visit-grid reveal" ref={addReveal}>
      <div className="visit-card">
        <h3>🕐 Hours</h3>
        {HOURS.map((h, i) => (
          <div key={h.day} className={`hours-row${i === todayIdx ? " today" : ""}`}>
            <span className="day">{h.day}{i === todayIdx ? " · Today" : ""}</span>
            <span className={`time${h.closed ? " closed-text" : ""}`}>{h.time}</span>
          </div>
        ))}
      </div>
      <div className="visit-card">
        <h3>📍 Find Us</h3>
        <div className="address-block">
          <p>
            102 Main St<br />
            Moravia, NY 13118<br />
            Cayuga County, NY
          </p>
          <p className="address-muted">Near Fillmore Glen State Park · Easy parking · Wheelchair accessible</p>
        </div>
        <button className="map-btn" onClick={() => setMapsOpen(true)}>
          🗺️ Open in Maps App
        </button>
        <a className="call-btn" href={PHONE_HREF}>
          📞 Call Us: {PHONE}
        </a>
        <div className="amenities">
          {["❄️ A/C Indoors","🅿️ Parking","🦽 Accessible","💳 Cards OK","🐾 Pet Friendly","🚻 Restrooms","📶 Wi-Fi"].map(a => (
            <span className="amenity-tag" key={a}>{a}</span>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* ABOUT */}
  <section id="about">
    <div ref={addReveal} className="reveal" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
      <div className="section-label">Our Story</div>
      <div className="section-title">A Moravia Original</div>
      <p className="section-sub">
        Candy's Corner Cones is a beloved stop right here on Main Street — where families gather, neighbors catch up, and every scoop feels like home. Air-conditioned indoor seating, ice cream, and candy all under one roof.
      </p>
    </div>
    <div className="about-stats reveal" ref={addReveal}>
      <div className="stat"><div className="stat-num">4.3⭐</div><div className="stat-label">Google Rating</div></div>
      <div className="stat"><div className="stat-num">🏘️</div><div className="stat-label">Locally Owned</div></div>
      <div className="stat"><div className="stat-num">❄️</div><div className="stat-label">A/C Indoors</div></div>
    </div>
  </section>

  {/* FOOTER */}
  <footer>
    <span className="footer-logo">Candy's Corner Cones 🍦</span>
    102 Main St · Moravia, NY 13118 &nbsp;·&nbsp;
    <a href={PHONE_HREF}>{PHONE}</a><br />
    Open Mon – Sat 11am – 9pm · Sun 1pm – 9pm &nbsp;·&nbsp;
    <a href="https://www.facebook.com/p/Candys-Corner-Cones-100063809461419/" target="_blank" rel="noreferrer">Facebook Page</a><br />
    <span style={{ fontSize: "0.8rem", opacity: 0.4 }}>© {new Date().getFullYear()} Candy's Corner Cones · All rights reserved.</span>
  </footer>
</>
```

);
}
