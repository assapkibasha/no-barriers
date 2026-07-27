export interface Course {
  id: string
  title: string
  image: string
  description: string
  color: string
  textColor: string
  units: string[]
}

export const courses: Course[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    image: '/images/images/beginner card.png',
    description: 'Start with the basics — greetings, alphabet, numbers & colors',
    color: 'from-brand-hover via-brand to-ink',
    textColor: 'text-brand',
    units: ['daily-conversation', 'alphabet-a-m', 'alphabet-n-z', 'numbers-basic', 'colors'],
  },
  {
    id: 'everyday',
    title: 'Everyday Life',
    image: '/images/images/daily fam.png',
    description: 'Family, food, clothes, days and months',
    color: 'from-unit via-[#1A3FAE] to-ink',
    textColor: 'text-unit',
    units: ['family', 'clothes', 'foods', 'drinks', 'days-of-week', 'months'],
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    image: '/images/images/intermediate.png',
    description: 'Time, school subjects, advanced numbers and more',
    color: 'from-ink via-[#1C3D43] to-[#0B1D22]',
    textColor: 'text-ink',
    units: ['time', 'subjects', 'numbers-advanced', 'advanced'],
  },
]
