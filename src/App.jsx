import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Star,
  X,
  Plus,
  Minus,
  Filter,
  Trash2,
} from "lucide-react";

/**
 * חנות נעליים אונליין – דף אחד (React + Tailwind)
 * — ללא שרת: נתוני דמה, עגלת קניות בצד, חיפוש, סינון, מיון ובחירת מידה/צבע —
 *
 * טיפים:
 * - אפשר להחליף תמונות ל-URL שלכם.
 * - אפשר לחבר ל-Stripe / Firebase בעתיד.
 * - RTL + טקסטים בעברית, מטבע ₪.
 */

const BRANDS = ["Nike", "Adidas", "New Balance", "Puma", "Asics", "Reebok"];
const GENDERS = ["גברים", "נשים", "יוניסקס", "ילדים"];

const PRODUCTS = [
  {
    id: "p1",
    name: "Nike Air Zoom Pegasus 41",
    brand: "Nike",
    gender: "יוניסקס",
    price: 469,
    colors: [
      { code: "black", label: "שחור", hex: "#111827" },
      { code: "white", label: "לבן", hex: "#f3f4f6" },
    ],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.7,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    badge: "חדש",
  },
  {
    id: "p2",
    name: "Adidas Ultraboost Light",
    brand: "Adidas",
    gender: "גברים",
    price: 529,
    colors: [
      { code: "blue", label: "כחול", hex: "#1e3a8a" },
      { code: "gray", label: "אפור", hex: "#6b7280" },
    ],
    images: [
      "https://images.unsplash.com/photo-1528701800489-20be3c2ea33f?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.6,
    sizes: [40, 41, 42, 43, 44],
    badge: "בסט סלר",
  },
  {
    id: "p3",
    name: "New Balance 9060",
    brand: "New Balance",
    gender: "נשים",
    price: 489,
    colors: [
      { code: "beige", label: "בז'", hex: "#d6ccc2" },
      { code: "olive", label: "זית", hex: "#6b705c" },
    ],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.8,
    sizes: [36, 37, 38, 39, 40, 41],
  },
  {
    id: "p4",
    name: "Puma RS-X Efekt",
    brand: "Puma",
    gender: "יוניסקס",
    price: 399,
    colors: [
      { code: "mint", label: "מינט", hex: "#a7f3d0" },
      { code: "black", label: "שחור", hex: "#111827" },
    ],
    images: [
      "https://images.unsplash.com/photo-1542293787938-c9e299b88054?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.4,
    sizes: [39, 40, 41, 42, 43],
  },
  {
    id: "p5",
    name: "Asics Gel-Kayano 30",
    brand: "Asics",
    gender: "יוניסקס",
    price: 559,
    colors: [
      { code: "navy", label: "נייבי", hex: "#1f2937" },
      { code: "orange", label: "כתום", hex: "#fb923c" },
    ],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.9,
    sizes: [40, 41, 42, 43, 44, 45, 46],
  },
  {
    id: "p6",
    name: "Reebok Club C 85",
    brand: "Reebok",
    gender: "יוניסקס",
    price: 349,
    colors: [
      { code: "white", label: "לבן", hex: "#ffffff" },
      { code: "green", label: "ירוק", hex: "#22c55e" },
    ],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.5,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    badge: "מבצע",
  },
];

function usd(n) {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
})}`;
}

function Rating({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < full ? "fill-yellow-400 stroke-yellow-400" : half && i === full ? "fill-yellow-200 stroke-yellow-200" : "stroke-gray-300"}`}
    />
  ));
  return <div className="flex items-center gap-1">{stars}<span className="text-xs text-gray-500">{value.toFixed(1)}</span></div>;
}

export default function ShoeStore() {
  // ====== CONFIG (תשלום) ======
  const STRIPE_PUBLIC_KEY = "pk_test_REPLACE_ME"; // TODO: החלף במפתח Stripe אמיתי
  const ENABLE_STRIPE = false; // שנה ל-true לאחר חיבור מפתח וצד שרת

  const [query, setQuery] = useState("");
  const [brandFilters, setBrandFilters] = useState(new Set());
  const [genderFilters, setGenderFilters] = useState(new Set());
  const [priceMax, setPriceMax] = useState(600);
  const [sort, setSort] = useState("פופולרי");
  const [cartOpen, setCartOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [shippingOpt, setShippingOpt] = useState("ground");
  const [cart, setCart] = useState([]); // {id, name, price, qty, size, color}

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price <= priceMax);

    if (brandFilters.size) {
      list = list.filter((p) => brandFilters.has(p.brand));
    }
    if (genderFilters.size) {
      list = list.filter((p) => genderFilters.has(p.gender));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "מחיר: מהזול ליקר":
        list.sort((a, b) => a.price - b.price); break;
      case "מחיר: מהיקר לזול":
        list.sort((a, b) => b.price - a.price); break;
      case "דירוג":
        list.sort((a, b) => b.rating - a.rating); break;
      default:
        break; // פופולרי – השארת סדר נתונים
    }
    return list;
  }, [brandFilters, genderFilters, priceMax, query, sort]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const SHIPPING_OPTIONS = {
    ground: { label: "משלוח יבשתי (Ground)", days: "5–7", price: 6.9 },
    standard: { label: "משלוח רגיל (Standard)", days: "3–5", price: 9.9 },
    expedited: { label: "משלוח מהיר (Expedited)", days: "1–2", price: 19.9 },
  };
  const shippingCost = cart.length ? SHIPPING_OPTIONS[shippingOpt].price : 0;
  const orderTotal = cartTotal + shippingCost;

  function toggleSet(setter, set, val) {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  }

  function addToCart(p, size, color) {
    if (!size || !color) return alert("בחר/י מידה וצבע לפני הוספה לעגלה");
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id && x.size === size && x.color.code === color.code);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [
        ...prev,
        {
          id: p.id,
          name: p.name,
          price: p.price,
          qty: 1,
          size,
          color,
          brand: p.brand,
          image: p.images[0],
        },
      ];
    });
    setCartOpen(true);
  }

  function updateQty(index, delta) {
    setCart((prev) => {
      const copy = [...prev];
      copy[index].qty += delta;
      if (copy[index].qty <= 0) copy.splice(index, 1);
      return copy;
    });
  }

  function removeItem(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function handleCheckout(){
    if(!cart.length) return;
    if(!ENABLE_STRIPE){
      alert("דמו: הפעלת Stripe דורשת מפתח ציבורי וצד שרת ליצירת Checkout Session. פתח הגדרות בקוד והחלף ENABLE_STRIPE ל-true לאחר חיבור.");
      return;
    }
    // דוגמה: fetch ליצירת Checkout Session בצד שרת
    fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        shipping: { method: shippingOpt, cost: shippingCost }
      })
    }).then(r=>r.json()).then(data => {
      // בדמו: נפתח קישור תשלום אם קיים, אחרת התראה
      if(data?.url){ window.location.href = data.url; }
      else alert('Session נוצר (דמו). חבר Stripe בצד שרת להמשך.');
    }).catch(()=> alert('שגיאה ביצירת Session (דמו)'));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo />
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} className="w-9 h-9 grid place-items-center rounded-2xl bg-gray-900 text-white">
              👟
            </motion.div>
            <div className="leading-tight">
              <div className="font-extrabold text-lg">zshoes</div>
              <div className="text-xs text-gray-500">נעליים. סטייל. מהירות.</div>
            </div>
              <div className="text-xs text-gray-500">נעליים. סטייל. מהירות.</div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-auto hidden md:block">
            <label className="relative block">
              <span className="absolute inset-y-0 left-3 flex items-center"><Search className="w-4 h-4 text-gray-400"/></span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="חיפוש דגם / מותג"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2 pl-9 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
            </label>
          </div>

          <button onClick={() => setCartOpen(true)} className="relative ml-auto inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-3 py-2 hover:border-gray-300">
            <ShoppingCart className="w-5 h-5"/>
            <span className="hidden sm:inline">עגלה</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -left-2 text-xs bg-gray-900 text-white rounded-full w-5 h-5 grid place-items-center">{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8 flex flex-col justify-between shadow-lg">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">הדור הבא של נעלי ריצה ואופנה</h1>
              <p className="mt-3 text-white/80">משלוח מהיר, החזרות קלות, ואיכות מקורית ממותגים מובילים.</p>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="#shop" className="rounded-2xl bg-white text-gray-900 font-semibold px-5 py-2 hover:shadow">לקנייה</a>
              <a href="#bests" className="rounded-2xl border border-white/20 text-white font-semibold px-5 py-2 hover:bg-white/10">בסט סלרס</a>
            </div>
          </div>
          <div className=\"rounded-3xl bg-white p-6 border border-gray-100 shadow-sm\">
            <h3 className=\"font-bold text-lg\">אפשרויות משלוח 🚚</h3>
            <ul className=\"mt-3 space-y-2 text-sm\">
              <li>• משלוח יבשתי (Ground): 5–7 ימי עסקים</li>
              <li>• משלוח רגיל (Standard): 3–5 ימי עסקים</li>
              <li>• משלוח מהיר (Expedited): 1–2 ימי עסקים</li>
            </ul>
            <p className=\"mt-3 text-xs text-gray-500\">החזרות: יש לשלוח את הנעל בחזרה לשולח. העיבוד יתבצע לאחר קבלת המוצר ובדיקתו.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Filters */}
          <aside className="md:col-span-3">
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sticky top-20">
              <div className="flex items-center gap-2 font-bold text-lg"><Filter className="w-5 h-5"/>סינון</div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-700">מותג</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {BRANDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => toggleSet(setBrandFilters, brandFilters, b)}
                      className={`rounded-xl border px-3 py-1.5 text-sm ${brandFilters.has(b) ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 hover:border-gray-300"}`}
                    >{b}</button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-sm font-semibold text-gray-700">ייעוד</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {GENDERS.map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleSet(setGenderFilters, genderFilters, g)}
                      className={`rounded-xl border px-3 py-1.5 text-sm ${genderFilters.has(g) ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 hover:border-gray-300"}`}
                    >{g}</button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  <span>מחיר מקסימלי</span>
                  <span>{usd(priceMax)}</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={600}
                  step={10}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="mt-2 w-full"
                />
              </div>

              <div className="mt-5">
                <label className="text-sm font-semibold text-gray-700">מיון</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10">
                  <option>פופולרי</option>
                  <option>מחיר: מהזול ליקר</option>
                  <option>מחיר: מהיקר לזול</option>
                  <option>דירוג</option>
                </select>
              </div>

              <button
                onClick={() => { setBrandFilters(new Set()); setGenderFilters(new Set()); setPriceMax(600); setSort("פופולרי"); setQuery(""); }}
                className="mt-6 w-full rounded-2xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >נקה הכול</button>
            </div>
          </aside>

          {/* Grid */}
          <section className="md:col-span-9">
            {/* Search (mobile) */}
            <div className="md:hidden mb-2">
              <label className="relative block">
                <span className="absolute inset-y-0 left-3 flex items-center"><Search className="w-4 h-4 text-gray-400"/></span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="חיפוש דגם / מותג"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2 pl-9 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                />
              </label>
            </div>

            <div id="bests" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-500">לא נמצאו מוצרים תואמים… נסה/י לשנות מסננים.</div>
            )}
          </section>
        </div>
      </main>

      {/* Policy Modal */}
      <AnimatePresence>
        {policyOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
            <motion.div initial={{scale:0.98, y:10}} animate={{scale:1, y:0}} exit={{scale:0.98, y:10}} className="max-w-2xl w-full rounded-3xl bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">מדיניות משלוחים והחזרים</h3>
                <button onClick={()=>setPolicyOpen(false)} className="p-2 rounded-xl hover:bg-gray-50"><X className="w-5 h-5"/></button>
              </div>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <p><strong>אפשרויות משלוח:</strong> יבשתי (5–7 ימי עסקים), רגיל (3–5), מהיר (1–2). המחיר מוצג בקופה לפי בחירתך.</p>
                <p><strong>עיבוד הזמנה:</strong> 1–2 ימי עסקים.</p>
                <p><strong>החזרות:</strong> ניתן להחזיר תוך 30 יום בתנאי שהמוצר חדש באריזה המקורית. ההחזר כרוך ב"לשלוח בחזרה לשולח" — כלומר הלקוח שולח את הנעל בחזרה אלינו. הזיכוי מתבצע לאחר קבלת המוצר ובדיקתו.</p>
                <p><strong>שאלות?</strong> פנו אלינו: support@zshoes.com</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} zshoes — כל הזכויות שמורות • <button onClick={()=>setPolicyOpen(true)} className="underline hover:no-underline">מדיניות משלוחים והחזרים</button>
      </footer>
    </div>
  );
}

function Logo(){
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" className="text-gray-900">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#111827"/>
          <stop offset="100%" stopColor="#6b7280"/>
        </linearGradient>
      </defs>
      <path d="M10 38c8-2 14-8 18-12 4-5 8-8 14-8 6 0 12 4 12 10 0 9-7 16-16 16H22l-8 6-4-4 6-8z" fill="url(#g)"/>
      <circle cx="42" cy="44" r="4" fill="#111827"/>
      <circle cx="26" cy="44" r="4" fill="#111827"/>
    </svg>
  );
}

function ProductCard({ product, onAdd }) {
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(product.colors[0]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-3xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative overflow-hidden rounded-2xl">
        {product.badge && (
          <div className="absolute top-3 right-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold border border-gray-200">
            {product.badge}
          </div>
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full aspect-[4/3] object-cover rounded-2xl border"
        />
      </div>

      <div className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold leading-tight">{product.name}</h3>
            <div className="text-xs text-gray-500">{product.brand} • {product.gender}</div>
          </div>
          <div className="text-lg font-extrabold">{usd(product.price)}</div>
        </div>
        <div className="mt-2"><Rating value={product.rating} /></div>

        {/* Colors */}
        <div className="mt-3 flex items-center gap-2">
          {product.colors.map((c) => (
            <button
              key={c.code}
              onClick={() => setColor(c)}
              title={c.label}
              style={{ backgroundColor: c.hex }}
              className={`w-6 h-6 rounded-full border ${color.code === c.code ? "ring-2 ring-gray-900" : ""}`}
            />
          ))}
        </div>

        {/* Sizes */}
        <div className="mt-3 grid grid-cols-6 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`rounded-xl border px-2 py-1 text-sm ${size === s ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 hover:border-gray-300"}`}
            >{s}</button>
          ))}
        </div>

        <button
          onClick={() => onAdd(product, size, color)}
          className="mt-4 w-full rounded-2xl bg-gray-900 text-white py-2.5 font-bold group-hover:translate-y-[-1px] transition-transform"
        >הוסף לעגלה</button>
      </div>
    </motion.article>
  );
}
