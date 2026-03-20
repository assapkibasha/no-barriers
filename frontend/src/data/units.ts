export interface Unit {
  id: string
  courseId: string
  title: string
  emoji: string
  order: number
  category: string   // maps to folder name
  subCategory?: string // for foods and drinks subfolders
}

export const units: Unit[] = [
  // Beginner
  { id: 'daily-conversation', courseId: 'beginner', title: 'Daily Conversation', emoji: '💬', order: 1, category: 'daily conversation' },
  { id: 'alphabet-a-m',       courseId: 'beginner', title: 'Alphabet A–M',       emoji: '🔤', order: 2, category: 'alphabet' },
  { id: 'alphabet-n-z',       courseId: 'beginner', title: 'Alphabet N–Z',       emoji: '🔡', order: 3, category: 'alphabet' },
  { id: 'numbers-basic',      courseId: 'beginner', title: 'Numbers 0–10',       emoji: '🔢', order: 4, category: 'numbers' },
  { id: 'colors',             courseId: 'beginner', title: 'Colors',             emoji: '🎨', order: 5, category: 'colors' },

  // Everyday Life
  { id: 'family',       courseId: 'everyday', title: 'Family',        emoji: '👨‍👩‍👧', order: 1, category: 'family' },
  { id: 'clothes',      courseId: 'everyday', title: 'Clothes',       emoji: '👕',    order: 2, category: 'clothes' },
  { id: 'foods',        courseId: 'everyday', title: 'Foods',         emoji: '🍎',    order: 3, category: 'foods and drinks', subCategory: 'ibiribwa' },
  { id: 'drinks',       courseId: 'everyday', title: 'Drinks',        emoji: '☕',    order: 4, category: 'foods and drinks', subCategory: 'ibinyobwa' },
  { id: 'days-of-week', courseId: 'everyday', title: 'Days of Week',  emoji: '📅',    order: 5, category: 'days of the week' },
  { id: 'months',       courseId: 'everyday', title: 'Months',        emoji: '🗓️',    order: 6, category: 'months' },

  // Intermediate
  { id: 'time',             courseId: 'intermediate', title: 'Time',              emoji: '⏰', order: 1, category: 'time' },
  { id: 'subjects',        courseId: 'intermediate', title: 'School Subjects',   emoji: '📚', order: 2, category: 'subjects' },
  { id: 'numbers-advanced', courseId: 'intermediate', title: 'Numbers 11–100',   emoji: '🔢', order: 3, category: 'numbers' },
  { id: 'advanced',         courseId: 'intermediate', title: 'Advanced Signs',   emoji: '⭐', order: 4, category: 'advanced' },
]
