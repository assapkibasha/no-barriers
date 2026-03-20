import { getSignsByUnit } from './signs'

export interface Lesson {
  id: string
  unitId: string
  order: number
  title: string
  signIds: string[]
}

// Each unit gets broken into lessons of ~6 signs each
function makeLessons(unitId: string, lessonSize = 6): Lesson[] {
  const unitSigns = getSignsByUnit(unitId)
  const lessons: Lesson[] = []
  let i = 0
  let order = 1
  while (i < unitSigns.length) {
    const chunk = unitSigns.slice(i, i + lessonSize)
    lessons.push({
      id: `${unitId}-lesson-${order}`,
      unitId,
      order,
      title: `Lesson ${order}`,
      signIds: chunk.map((s) => s.id),
    })
    i += lessonSize
    order++
  }
  return lessons
}

const allUnitIds = [
  'daily-conversation',
  'alphabet-a-m',
  'alphabet-n-z',
  'numbers-basic',
  'colors',
  'family',
  'clothes',
  'foods',
  'drinks',
  'days-of-week',
  'months',
  'time',
  'subjects',
  'numbers-advanced',
  'advanced',
]

export const lessons: Lesson[] = allUnitIds.flatMap((uid) => makeLessons(uid))

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons.filter((l) => l.unitId === unitId)
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}
