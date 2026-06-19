import React from "react";
import { Button } from "../../components/actions/Button.jsx";
import { Badge } from "../../components/actions/Badge.jsx";
import { Card } from "../../components/surfaces/Card.jsx";

const HATCH = "repeating-linear-gradient(45deg,#d7e1e6,#d7e1e6 10px,#e6edf0 10px,#e6edf0 20px)";
const SHELL = { maxWidth: "var(--container)", margin: "0 auto", padding: "0 32px", width: "100%", boxSizing: "border-box" };

function Photo({ label, style }) {
  return (
    <div style={{ background: HATCH, display: "flex", alignItems: "flex-end", padding: "12px", ...style }}>
      <span style={{ fontFamily: "var(--font-subhead)", fontSize: "11px", textTransform: "uppercase", letterSpacing: ".12em", color: "var(--slate)" }}>{label}</span>
    </div>
  );
}
function Eyebrow({ children }) {
  return <div style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--ls-eyebrow)", fontSize: "13px", color: "var(--teal-600)" }}>{children}</div>;
}
function SectionTitle({ children }) {
  return <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px,3.6vw,40px)", lineHeight: 1.02, letterSpacing: "var(--ls-tight)", margin: 0, color: "var(--navy-700)", textTransform: "uppercase" }}>{children}</h2>;
}

/* ---- minimal nav + breadcrumb + sub-nav ---- */
function TopBar() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ ...SHELL, display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "11px" }}>
          <img src="../../assets/kraken-navy.png" alt="" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "26px", letterSpacing: "-.02em", color: "var(--navy-700)" }}>C<span style={{ color: "var(--orange-500)" }}>26</span> <span style={{ fontSize: "11px", letterSpacing: ".2em", color: "var(--teal-600)" }}>AQUATICS</span></span>
        </span>
        <Button variant="primary" size="sm">Book Now</Button>
      </div>
    </header>
  );
}

function SubNav() {
  const items = ["Overview", "Ages", "Pricing", "FAQ"];
  const [active, setActive] = React.useState("Overview");
  return (
    <div style={{ borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
      <div style={{ ...SHELL, paddingTop: "12px", paddingBottom: "0" }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-muted)", marginBottom: "10px" }}>
          Home <span style={{ color: "var(--line-strong)" }}>›</span> Programs <span style={{ color: "var(--line-strong)" }}>›</span> <span style={{ color: "var(--navy-700)", fontWeight: 600 }}>Swim Lessons</span>
        </div>
        <div style={{ display: "flex", gap: "28px" }}>
          {items.map(it => (
            <button key={it} onClick={() => setActive(it)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 12px", fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", fontSize: "14px", color: active === it ? "var(--navy-700)" : "var(--text-muted)", borderBottom: active === it ? "2px solid var(--orange-500)" : "2px solid transparent" }}>{it}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ background: "var(--surface)" }}>
      <div style={{ ...SHELL, display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "48px", alignItems: "center", padding: "64px 32px" }}>
        <div>
          <Eyebrow>Swim Lessons</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: "clamp(44px,6vw,72px)", lineHeight: .92, letterSpacing: "-.02em", color: "var(--navy-700)", margin: "12px 0 0" }}>
            Swim lessons<br />for <span style={{ color: "var(--orange-500)" }}>every age</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "19px", lineHeight: 1.5, color: "var(--text-body)", maxWidth: "440px", margin: "20px 0 28px" }}>
            From first splashes to competitive strokes — taught by certified coaches in classes of four or fewer, year-round.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg">Book a lesson</Button>
            <Button variant="outline" size="lg">See pricing</Button>
          </div>
        </div>
        <Photo label="Lesson photo" style={{ height: "360px", borderRadius: "var(--r-lg)" }} />
      </div>
    </section>
  );
}

function Benefits() {
  const items = [["Water safety first", "Confidence and safety before speed."], ["Small classes", "Four swimmers or fewer, every session."], ["Certified coaches", "Career coaches with real credentials."], ["Year-round indoor", "Warm water, 365 days a year."]];
  return (
    <section style={{ background: "var(--paper)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y-tight) 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "28px" }}>
        {items.map(([t, d]) => (
          <div key={t} style={{ borderLeft: "3px solid var(--teal-500)", paddingLeft: "16px" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "20px", textTransform: "uppercase", color: "var(--navy-700)", margin: "0 0 8px" }}>{t}</h4>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.5, color: "var(--text-body)", margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section style={{ background: "var(--surface)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px", maxWidth: "var(--container-narrow)" }}>
        <Eyebrow>Our method</Eyebrow>
        <SectionTitle>How we teach swimming</SectionTitle>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", lineHeight: 1.6, color: "var(--text-body)", marginTop: "20px" }}>
          Every swimmer starts with water comfort and safety, then builds stroke technique in a structured progression. Because classes never exceed four swimmers, coaches adjust to each child or adult in real time — so skills lock in faster and progress is visible from the very first lesson.
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", lineHeight: 1.6, color: "var(--text-body)", marginTop: "16px" }}>
          Swimmers advance through clear levels, and coaches share written progress notes so you always know what comes next.
        </p>
      </div>
    </section>
  );
}

function AgeGroups() {
  const groups = [["Infant & Toddler", "6 mo – 3 yrs", "/swim-lessons/infant"], ["Children", "3 – 12 yrs", "/swim-lessons/children"], ["Teens", "13 – 17 yrs", "/swim-lessons/teens"], ["Adults", "18 yrs +", "/swim-lessons/adults"]];
  return (
    <section style={{ background: "var(--paper)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px" }}>
        <Eyebrow>Choose an age group</Eyebrow>
        <SectionTitle>Lessons by age</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px", marginTop: "36px" }}>
          {groups.map(([t, age, url]) => (
            <Card key={t} interactive media={<Photo label="Age photo" style={{ height: "100%" }} />} mediaHeight={150}>
              <Badge tone="teal" size="sm">{age}</Badge>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", color: "var(--navy-700)", margin: "2px 0 0", textTransform: "uppercase" }}>{t}</h3>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--text-muted)" }}>{url}</span>
              <span style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", fontSize: "13px", color: "var(--orange-600)", marginTop: "6px" }}>View lessons →</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [["Group", "$", "Up to 4 swimmers", false], ["Semi-private", "$$", "2 swimmers, shared focus", true], ["Private", "$$$", "1-on-1 with a coach", false]];
  return (
    <section style={{ background: "var(--surface)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px" }}>
        <Eyebrow>Pricing</Eyebrow>
        <SectionTitle>Lesson formats</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", marginTop: "36px" }}>
          {tiers.map(([name, price, desc, feat]) => (
            <div key={name} style={{ border: feat ? "2px solid var(--navy-700)" : "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "28px 24px", textAlign: "center", background: "var(--surface)", boxShadow: feat ? "var(--shadow-md)" : "none", position: "relative" }}>
              {feat && <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)" }}><Badge tone="orange" size="sm">Most popular</Badge></div>}
              <div style={{ fontFamily: "var(--font-subhead)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", fontSize: "14px", color: "var(--text-muted)" }}>{name}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "48px", color: "var(--navy-700)", lineHeight: 1, margin: "10px 0" }}>{price}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-body)", margin: "0 0 20px" }}>{desc}</p>
              <Button variant={feat ? "primary" : "outline"} size="md" full>Book</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = ["What should my child bring to the first lesson?", "How are swimmers grouped by level?", "What is your make-up / cancellation policy?", "Do you offer lessons for adults who&apos;ve never swum?"];
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ background: "var(--paper)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px", maxWidth: "var(--container-narrow)" }}>
        <Eyebrow>Questions</Eyebrow>
        <SectionTitle>Swim lesson FAQ</SectionTitle>
        <div style={{ marginTop: "28px" }}>
          {qs.map((q, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "none", border: "none", cursor: "pointer", padding: "18px 0", textAlign: "left", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "20px", color: "var(--navy-700)", textTransform: "uppercase" }}>
                <span dangerouslySetInnerHTML={{ __html: q }} />
                <span style={{ color: "var(--orange-500)", fontSize: "24px", flex: "none" }}>{open === i ? "–" : "+"}</span>
              </button>
              {open === i && <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.55, color: "var(--text-body)", margin: "0 0 18px" }}>Detailed answer copy goes here — coaches confirm specifics during your first booking.</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ background: "var(--navy-900)" }}>
      <div style={{ ...SHELL, padding: "var(--section-y) 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,5vw,60px)", lineHeight: .95, letterSpacing: "-.02em", color: "#fff", margin: 0, textTransform: "uppercase" }}>Start with one lesson</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", color: "rgba(255,255,255,.8)", margin: "16px 0 28px" }}>Book a single session and see the C26 difference in the water.</p>
        <Button variant="primary" size="lg">Book now</Button>
      </div>
    </section>
  );
}

export function SwimLessonsView() {
  return (
    <div style={{ background: "var(--surface)", fontFamily: "var(--font-body)" }}>
      <TopBar />
      <SubNav />
      <Hero />
      <Benefits />
      <Philosophy />
      <AgeGroups />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
