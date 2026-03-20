export interface Sign {
  id: string
  word: string       // display label (clean)
  unitId: string
  imagePath: string  // relative to /public e.g. /signs/colors/red - umutuku.png
}

// Helper: clean filename into a readable label
// "red - umutuku.png" → "Red"
// "grand father.png"  → "Grand Father"
// "a.png"            → "A"
function toLabel(filename: string): string {
  const base = filename.replace(/\.png$/i, '').replace(/\.jpg$/i, '')
  // take only the part before " - " if bilingual
  const part = base.split(' - ')[0].trim()
  return part
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function sign(unitId: string, folder: string, filename: string): Sign {
  const word = toLabel(filename)
  return {
    id: `${unitId}-${filename.replace(/\s+/g, '_').toLowerCase()}`,
    word,
    unitId,
    imagePath: `/signs/${folder}/${filename}`,
  }
}

export const signs: Sign[] = [
  // ── Daily Conversation ──────────────────────────────────────────────
  ...(['good afternoon.png','good evening.png','good morning.png','goodbye.png',
       'hello.png','how are you.png','i am fine.png','name.png'] as const)
    .map((f) => sign('daily-conversation', 'daily conversation', f)),

  // ── Alphabet A–M ────────────────────────────────────────────────────
  ...(['a.png','b.png','c.png','d.png','e.png','f.png','g.png',
       'h.png','i.png','j.png','k.png','l.png','m.png'] as const)
    .map((f) => sign('alphabet-a-m', 'alphabet', f)),

  // ── Alphabet N–Z ────────────────────────────────────────────────────
  ...(['n.png','o.png','p.png','q.png','r.png','s.png','t.png',
       'u.png','v.png','w.png','x.png','y.png','z.png'] as const)
    .map((f) => sign('alphabet-n-z', 'alphabet', f)),

  // ── Numbers 0–10 ────────────────────────────────────────────────────
  ...(['0.png','1.png','2.png','3.png','4.png','5.png',
       '6.png','7.png','8.png','9.png','10.png'] as const)
    .map((f) => sign('numbers-basic', 'numbers', f)),

  // ── Colors ──────────────────────────────────────────────────────────
  ...(['black -umukara.png','blue - ubururu.png','gray .png','green - icyatsi.png',
       'pink - pink.png','red - umutuku.png','yellow - umuhondo.png'] as const)
    .map((f) => sign('colors', 'colors', f)),

  // ── Family ──────────────────────────────────────────────────────────
  ...(['aunt.png','brother.png','child.png','cousin.png','daughter.png','divorced.png',
       'family.png','father.png','grand father.png','grand mother.png','husband.png',
       'marriage.png','mother.png','parents.png','sister.png','son.png',
       'uncle.png','widow - widower.png','wife.png'] as const)
    .map((f) => sign('family', 'family', f)),

  // ── Clothes ─────────────────────────────────────────────────────────
  ...(['belt.png','bra.png','clothes.png','glove.png','hat.png','scarf.png',
       'shoes.png','socks.png','sweater.png','t-shirt.png','to wear.png',
       'trouser.png','uniform.png','vest.png'] as const)
    .map((f) => sign('clothes', 'clothes', f)),

  // ── Foods ───────────────────────────────────────────────────────────
  ...(['apple.png','bananas.png','beans.png','cabbage.png','carrot.png','cook.png',
       'groundnoughts.png','maize.png','mangoes.png','milk.png','oil.png',
       'oranges.png','salt.png','sugar.png','tomato.png','wheat.png'] as const)
    .map((f) => sign('foods', 'foods and drinks/ibiribwa', f)),

  // ── Drinks ──────────────────────────────────────────────────────────
  ...(['banana juice.png','beer.png','coffee.png','drink.png','fanta .png',
       'porridge.png','tea.png','water.png','wine.png'] as const)
    .map((f) => sign('drinks', 'foods and drinks/ibinyobwa', f)),

  // ── Days of the Week ────────────────────────────────────────────────
  ...(['monday.png','tuesday.png','wednesday.png','thursday.png',
       'friday.png','saturday.png','sunday.png'] as const)
    .map((f) => sign('days-of-week', 'days of the week', f)),

  // ── Months ──────────────────────────────────────────────────────────
  ...(['january.png','february.png','march.png','april.png','may.png','june.png',
       'july.png','august.png','september.png','octber.png','november.png','december.png'] as const)
    .map((f) => sign('months', 'months', f)),

  // ── Time ────────────────────────────────────────────────────────────
  ...(['after.png','afternoon.png','age.png','before.png','days.png','evening.png',
       'hours.png','late.png','minutes.png','months.png','morning.png','next.png',
       'night.png','now.png','schedule.png','seconds.png','start.png','time.png',
       'to day.png','tomorrow.png','year.png','yesterday.png'] as const)
    .map((f) => sign('time', 'time', f)),

  // ── School Subjects ─────────────────────────────────────────────────
  ...(['biology.png','chemistry.png','computer science.png','economics.png','english.png',
       'entreprenuership.png','farming .png','fine arts.png','french.png',
       'general studies and communication skills.png','geography.png',
       'history and ctznishp.png','home science.png','ict.png','ikinyarwanda.png',
       'kiswahili.png','literature.png','mathematics.png','music dance and drama.png',
       'physical education and sports.png','physics.png','religion and ethics.png',
       'science and elementary tech .png','social.png'] as const)
    .map((f) => sign('subjects', 'subjects', f)),

  // ── Numbers 11–100 ──────────────────────────────────────────────────
  ...(['11.png','12.png','13.png','14.png','15.png','16.png','17.png','18.png','19.png',
       '20.png','30.png','40.png','50.png','60.png','70.png','80.png','90.png',
       '100.png','1000.png','10000.png'] as const)
    .map((f) => sign('numbers-advanced', 'numbers', f)),

  // ── Advanced ────────────────────────────────────────────────────────
  ...(['book -.png','end.png','evidence.png','half.png','hons.png','milk.png',
       'scuba diving.png','shame.png','smell.png'] as const)
    .map((f) => sign('advanced', 'advanced', f)),
]

// Lookup helpers
export function getSignsByUnit(unitId: string): Sign[] {
  return signs.filter((s) => s.unitId === unitId)
}
