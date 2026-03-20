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
    color: 'from-teal-500 to-teal-700',
    textColor: 'text-teal-700',
    units: ['daily-conversation', 'alphabet-a-m', 'alphabet-n-z', 'numbers-basic', 'colors'],
  },
  {
    id: 'everyday',
    title: 'Everyday Life',
    image: '/images/images/daily fam.png',
    description: 'Family, food, clothes, days and months',
    color: 'from-blue-500 to-blue-700',
    textColor: 'text-blue-700',
    units: ['family', 'clothes', 'foods', 'drinks', 'days-of-week', 'months'],
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    image: '/images/images/intermediate.png',
    description: 'Time, school subjects, advanced numbers and more',
    color: 'from-purple-500 to-purple-700',
    textColor: 'text-purple-700',
    units: ['time', 'subjects', 'numbers-advanced', 'advanced'],
  },
]
