import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone, Github, Linkedin, Rocket, Sparkles, Star } from 'lucide-react'

const site = {
  name: 'Ziv Shlimak',
  tagline: 'שחקן כדורגל • סטודנט לעסקים • יזם',
  ctaPrimary: 'צור קשר',
  ctaSecondary: 'צפה בפרויקטים',
  email: 'ziv@example.com',
  phone: '+1 (555) 123-4567',
  github: 'https://github.com/ZIVSH12',
  linkedin: 'https://www.linkedin.com/',
  hero: 'ברוכים הבאים! אני זיו — שחקן כדורגל ודור־חדש של אנשי עסקים. כאן תמצאו עבודות, פרויקטים, ודרכים ליצור קשר.',
  about: 'אני משלב משמעת של ספורטאי עם חשיבה עסקית: פיננסים, שיווק, וניהול. כאן אני משתף מסיפורי הדרך, פרויקטים ושיתופי פעולה.',
  services: [
    { icon: Rocket, title: 'בניית אתרי React', desc: 'דפי נחיתה, פורטפוליו, דאשבורדים ומיני־חנויות.', chip: 'פיתוח' },
    { icon: Sparkles, title: 'מיתוג ותוכן', desc: 'כתיבה, עיצוב מודרני וקריאות לפעולה.', chip: 'קריאייטיב' },
    { icon: Star, title: 'ייעוץ לסטודנטים־ספורטאים', desc: 'תזונה לפני משחק, ניהול זמן ו-NIL.', chip: 'Mentoring' },
  ],
  projects: [
    { title: 'Landing Page לאירוע ספורט', desc: 'דף הרשמה דינמי עם טופס וסטטיסטיקות.', href: '#' },
    { title: 'Dashboard פיננסי לסטודנטים', desc: 'מעקב תקציב, גרפים ו-KPIs.', href: '#' },
    { title: 'Portfolio שחקן', desc: 'גלריית וידאו/תמונות וקישורי מדיה.', href: '#' },
  ],
}

export default function App() {
  const [isRTL, setIsRTL] = useState(true)

  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 ${isRTL ? '[direction:rtl]' : '[direction:ltr]'}`}>
      <Nav isRTL={isRTL} setIsRTL={setIsRTL} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function Nav({ isRTL, setIsRTL }) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">ZS</div>
          <span className="font-semibold tracking-tight">{site.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex text-sm text-slate-600">{site.tagline}</span>
          <button
            onClick={() => setIsRTL(!isRTL)}
            className="rounded-xl border px-3 py-1 text-sm hover:bg-slate-50"
            title="Toggle direction RTL/LTR"
          >
            {isRTL ? 'RTL' : 'LTR'}
          </button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl">
          <div className="h-52 w-[36rem] rounded-full bg-gradient-to-r from-indigo-300 to-cyan-200 opacity-50" />
        </div>
      </div>

      <div className="grid items-center gap-10 sm:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{site.tagline}</h1>
          <p className="text-base text-slate-600 sm:text-lg">{site.hero}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white">
              {site.ctaPrimary} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-50">
              {site.ctaSecondary}
            </a>
          </div>
          <div className="flex gap-4 pt-2 text-slate-600">
            <a href={site.github} target="_blank" className="inline-flex items-center gap-2 hover:text-slate-900" rel="noreferrer">
              <Github className="size-5" /> GitHub
            </a>
            <a href={site.linkedin} target="_blank" className="inline-flex items-center gap-2 hover:text-slate-900" rel="noreferrer">
              <Linkedin className="size-5" /> LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="order-first sm:order-last">
          <div className="mx-auto max-w-md rounded-3xl border bg-white p-6 shadow-lg">
            <h3 className="text-xl font-semibold">Highlights</h3>
            <p className="mt-1 text-sm text-slate-500">כמה נקודות עליי</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700 list-disc ps-5">
              <li>סטודנט למנהל עסקים וחשבונאות</li>
              <li>שחקן כדורגל (NCAA)</li>
              <li>פיתוח אתרי React ו-UI מודרני</li>
              <li>דובר עברית • English • Русский</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="py-12" id="about">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">קצת עליי</h2>
          <p className="text-slate-600">{site.about}</p>
        </div>
        <ul className="grid gap-3 text-slate-700">
          <li className="flex items-center gap-3"><span className="rounded-lg bg-slate-100 px-2 py-1 text-xs">Hard Work</span> משמעת והתמדה של ספורטאי תחרותי</li>
          <li className="flex items-center gap-3"><span className="rounded-lg bg-slate-100 px-2 py-1 text-xs">Finance</span> ניתוח עלויות, NPV/TVM, ותכנון תקציב</li>
          <li className="flex items-center gap-3"><span className="rounded-lg bg-slate-100 px-2 py-1 text-xs">Web</span> React, Tailwind, UI נגיש ומהיר</li>
        </ul>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="py-12" id="services">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">שירותים</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.services.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <s.icon className="size-5" />
              </div>
              <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
              <div className="mt-3 inline-flex rounded-lg border px-2 py-1 text-xs">{s.chip}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="py-12" id="projects">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">פרויקטים</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.projects.map((p, i) => (
          <motion.a key={p.title} href={p.href} className="group" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <div className="rounded-3xl border bg-white shadow-sm transition hover:shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold group-hover:underline">{p.title}</h3>
                <p className="text-sm text-slate-600">{p.desc}</p>
              </div>
              <div className="aspect-video w-full rounded-b-3xl bg-gradient-to-br from-slate-100 to-slate-200" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="py-14" id="contact">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">בואו נדבר</h2>
          <p className="text-slate-600">מוזמנים להשאיר הודעה או ליצור קשר ישיר.</p>
          <div className="flex flex-wrap gap-4 text-slate-700">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-slate-900"><Mail className="size-5" /> {site.email}</a>
            <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 hover:text-slate-900"><Phone className="size-5" /> {site.phone}</a>
          </div>
        </div>
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold">טופס יצירת קשר</h3>
          <p className="text-sm text-slate-500">הודעות נשלחות לדוגמה בלבד (Front-end).</p>
          <form className="mt-4 grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2">
              <label className="text-sm">שם מלא</label>
              <input className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300" placeholder="הקלד/י שם" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">אימייל</label>
              <input type="email" className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300" placeholder="name@example.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">הודעה</label>
              <textarea rows="4" className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300" placeholder="איך אפשר לעזור?" />
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white" type="submit">
              שלח/י <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} {site.name}. כל הזכויות שמורות.</p>
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-lg border px-2 py-1"><Rocket className="size-4" /> Built with React</span>
          <span className="inline-flex items-center gap-2 rounded-lg border px-2 py-1"><Sparkles className="size-4" /> Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
