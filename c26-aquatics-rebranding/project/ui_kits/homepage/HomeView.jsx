import React from "react";
import { Button } from "../../components/actions/Button.jsx";
import { Badge } from "../../components/actions/Badge.jsx";
import { Card } from "../../components/surfaces/Card.jsx";
import { StatBlock } from "../../components/surfaces/StatBlock.jsx";
import { Tabs } from "../../components/navigation/Tabs.jsx";

/* ---- shared bits ---- */
const HATCH = "repeating-linear-gradient(45deg,#d7e1e6,#d7e1e6 10px,#e6edf0 10px,#e6edf0 20px)";
const HATCH_DARK = "repeating-linear-gradient(45deg,#16384a,#16384a 11px,#1d465c 11px,#1d465c 22px)";

function Photo({ label, dark, style }) {
  return (
    <div style={{
      position: "relative", background: dark ? HATCH_DARK : HATCH,
      display: "flex", alignItems: "flex-end", padding: "12px", ...style,
    }}>
      <span style={{
        fontFamily: "var(--font-subhead)", fontSize: "11px", textTransform: "uppercase",
        letterSpacing: "0.12em", color: dark ? "rgba(255,255,255,.5)" : "var(--slate)",
      }}>{label}</span>
    </div>
  );
}

function Eyebrow({ children, tone = "teal" }) {
  return (
    <div style={{
      fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase",
      letterSpacing: "var(--ls-eyebrow)", fontSize: "13px",
      color: tone === "teal" ? "var(--teal-600)" : "var(--orange-600)",
    }}>{children}</div>
  );
}

function SectionTitle({ children, light }) {
  return (
    <h2 style={{
      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,4vw,44px)",
      lineHeight: 1.02, letterSpacing: "var(--ls-tight)", margin: 0,
      color: light ? "var(--text-on-dark)" : "var(--navy-700)", textTransform: "uppercase",
    }}>{children}</h2>
  );
}

const SHELL = { maxWidth: "var(--container)", margin: "0 auto", padding: "0 32px", width: "100%", boxSizing: "border-box" };

/* ---- NAV with mega-menu ---- */
function Nav() {
  const [open, setOpen] = React.useState(false);
  const programs = ["Swim Lessons", "Competitive", "Swim Analysis", "Swim Camps", "Triathlon", "Memberships"];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ ...SHELL, display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="../../assets/kraken-navy.png" alt="C26 Aquatics" style={{ width: "46px", height: "46px", objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: .8 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "30px", letterSpacing: "-.02em", color: "var(--navy-700)" }}>C<span style={{ color: "var(--orange-500)" }}>26</span></span>
            <span style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".3em", fontSize: "9px", color: "var(--teal-600)", marginTop: "3px" }}>Aquatics</span>
          </div>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <button
            onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={() => setOpen(o => !o)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", fontSize: "14px", color: "var(--navy-700)", padding: "26px 0", borderBottom: open ? "2px solid var(--orange-500)" : "2px solid transparent" }}>
            Programs ▾
            {open && (
              <div onMouseEnter={() => setOpen(true)} style={{ position: "absolute", top: "70px", left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 36px", background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", boxShadow: "var(--shadow-lg)", padding: "18px 24px", width: "360px", textAlign: "left" }}>
                {programs.map(p => (
                  <span key={p} style={{ fontFamily: "var(--font-body)", fontWeight: 500, textTransform: "none", letterSpacing: 0, fontSize: "15px", color: "var(--text-body)", padding: "8px 0", borderBottom: "1px solid var(--mist)" }}>{p}</span>
                ))}
              </div>
            )}
          </button>
          <span style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", fontSize: "14px", color: "var(--text-muted)" }}>Members</span>
          <span style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", fontSize: "14px", color: "var(--text-muted)" }}>Events</span>
          <span style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", fontSize: "14px", color: "var(--text-muted)" }}>About</span>
          <Button variant="primary" size="sm">Book Now</Button>
        </nav>
      </div>
    </header>
  );
}

/* ---- HERO full-bleed ---- */
function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "560px", display: "flex", alignItems: "flex-end", background: HATCH_DARK, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,31,43,.15) 0%, rgba(11,31,43,.55) 60%, rgba(11,31,43,.85) 100%)" }} />
      <span style={{ position: "absolute", top: "20px", left: "32px", fontFamily: "var(--font-subhead)", fontSize: "11px", textTransform: "uppercase", letterSpacing: ".12em", color: "rgba(255,255,255,.45)" }}>Full-bleed pool / athlete photo</span>
      <div style={{ ...SHELL, position: "relative", paddingBottom: "64px", paddingTop: "64px" }}>
        <div style={{ maxWidth: "720px" }}>
          <Eyebrow>Kansas City&apos;s aquatic academy</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: "clamp(52px,8vw,92px)", lineHeight: .9, letterSpacing: "-.02em", color: "#fff", margin: "14px 0 0" }}>
            Become a<br /><span style={{ color: "var(--orange-500)" }}>stronger</span> swimmer
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "19px", lineHeight: 1.5, color: "rgba(255,255,255,.85)", maxWidth: "520px", margin: "20px 0 28px" }}>
            Expert coaching, classes of four or fewer, and a year-round indoor pool — for every age and every goal.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">Book a session</Button>
            <Button variant="outline-light" size="lg">Explore programs</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- STATS band ---- */
function Stats() {
  return (
    <section style={{ background: "var(--navy-900)" }}>
      <div style={{ ...SHELL, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px", padding: "48px 32px" }}>
        <StatBlock value="≤4" label="Swimmers per class" />
        <StatBlock value="20+" label="Years coaching" />
        <StatBlock value="365" label="Days indoor pool" />
        <StatBlock value="100%" label="Certified coaches" />
      </div>
    </section>
  );
}

/* ---- PROGRAM selector with audience tabs ---- */
const PROGRAMS = {
  kids: [["Infant & Child", "Water comfort, safety, and first strokes."], ["Youth Development", "Stroke technique for ages 6–12."]],
  teens: [["Stroke School", "Refine all four competitive strokes."], ["Pre-Competitive", "Bridge to the swim team."]],
  adults: [["Adult Lessons", "Learn to swim or rebuild confidence."], ["Fitness Swim", "Low-impact conditioning sets."]],
  athletes: [["Competitive Squad", "Race-focused training blocks."], ["Triathlon Coaching", "Open-water and pace work."]],
};

function Selector() {
  const [seg, setSeg] = React.useState("kids");
  return (
    <section style={{ background: "var(--surface)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px" }}>
        <Eyebrow>Find your path</Eyebrow>
        <SectionTitle>Programs for every swimmer</SectionTitle>
        <div style={{ marginTop: "24px", marginBottom: "32px" }}>
          <Tabs items={[{ id: "kids", label: "Kids" }, { id: "teens", label: "Teens" }, { id: "adults", label: "Adults" }, { id: "athletes", label: "Athletes" }]} value={seg} onChange={setSeg} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {PROGRAMS[seg].map(([title, desc]) => (
            <Card key={title} interactive media={<Photo label="Program photo" style={{ height: "100%" }} />} mediaHeight={180}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "24px", color: "var(--navy-700)", margin: 0, textTransform: "uppercase" }}>{title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.5, color: "var(--text-body)", margin: 0 }}>{desc}</p>
              <span style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", fontSize: "13px", color: "var(--orange-600)", marginTop: "4px" }}>View program →</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- WHY differentiators ---- */
function Why() {
  const items = [["Expert coaches", "Credentialed, career coaches — not seasonal staff."], ["Small classes", "Four swimmers or fewer, always."], ["Proven results", "Measurable progress, PRs, and podiums."], ["Year-round pool", "Warm indoor water, 365 days a year."]];
  return (
    <section style={{ background: "var(--paper)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px" }}>
        <Eyebrow tone="orange">Why C26</Eyebrow>
        <SectionTitle>Built for performance</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "28px", marginTop: "36px" }}>
          {items.map(([t, d]) => (
            <div key={t} style={{ borderLeft: "3px solid var(--teal-500)", paddingLeft: "16px" }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "21px", textTransform: "uppercase", color: "var(--navy-700)", margin: "0 0 8px" }}>{t}</h4>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.5, color: "var(--text-body)", margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- COACHES ---- */
function Coaches() {
  const people = [["Robbie Bruce", "Head Coach"], ["Ruth Sanchez", "Lessons Director"], ["The C26 Team", "Coaching staff"]];
  return (
    <section style={{ background: "var(--surface)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px" }}>
        <Eyebrow>The staff</Eyebrow>
        <SectionTitle>Meet your coaches</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", marginTop: "36px" }}>
          {people.map(([n, r]) => (
            <div key={n}>
              <Photo label="Coach portrait" style={{ height: "300px", borderRadius: "var(--r-lg)" }} />
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "23px", textTransform: "uppercase", color: "var(--navy-700)", margin: "16px 0 2px" }}>{n}</h4>
              <div style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", fontSize: "13px", color: "var(--teal-600)" }}>{r}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- TESTIMONIAL ---- */
function Testimonial() {
  return (
    <section style={{ background: "var(--navy-700)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px", textAlign: "center", maxWidth: "900px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "80px", lineHeight: .4, color: "var(--teal-400)" }}>&ldquo;</div>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15, color: "#fff", margin: "16px 0 20px", textTransform: "uppercase" }}>
          My daughter went from afraid of the deep end to making the swim team in one season.
        </p>
        <div style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", fontSize: "14px", color: "var(--text-on-dark-muted)" }}>— Sarah M., parent</div>
      </div>
    </section>
  );
}

/* ---- SERVICE AREA ---- */
function ServiceArea() {
  const cities = ["Overland Park", "Leawood", "Olathe", "Lenexa", "Shawnee", "Prairie Village"];
  return (
    <section style={{ background: "var(--paper)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
        <div>
          <Eyebrow>Where we swim</Eyebrow>
          <SectionTitle>Serving the KC metro</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "24px" }}>
            {cities.map(c => <Badge key={c} tone="neutral" size="md">{c}</Badge>)}
          </div>
        </div>
        <Photo label="KC metro map" style={{ height: "280px", borderRadius: "var(--r-lg)" }} />
      </div>
    </section>
  );
}

/* ---- FINAL CTA ---- */
function FinalCTA() {
  return (
    <section style={{ background: "var(--navy-900)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(40px,6vw,72px)", lineHeight: .95, letterSpacing: "-.02em", color: "#fff", margin: 0, textTransform: "uppercase" }}>
          Get in the water
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "19px", color: "rgba(255,255,255,.8)", margin: "16px 0 28px" }}>Your first session is the hardest part. We&apos;ll handle the rest.</p>
        <Button variant="primary" size="lg">Book your first session</Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--navy-900)", borderTop: "1px solid rgba(255,255,255,.08)" }}>
      <div style={{ ...SHELL, padding: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="../../assets/kraken-white.png" alt="" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "22px", color: "#fff" }}>C<span style={{ color: "var(--orange-500)" }}>26</span> <span style={{ fontSize: "13px", letterSpacing: ".2em", color: "var(--teal-400)" }}>AQUATICS</span></span>
        </span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-on-dark-muted)" }}>© 2026 C26 Aquatics · Kansas City, MO</span>
      </div>
    </footer>
  );
}

export function HomeView() {
  return (
    <div style={{ background: "var(--surface)", fontFamily: "var(--font-body)" }}>
      <Nav />
      <Hero />
      <Stats />
      <Selector />
      <Why />
      <Coaches />
      <Testimonial />
      <ServiceArea />
      <FinalCTA />
      <Footer />
    </div>
  );
}
