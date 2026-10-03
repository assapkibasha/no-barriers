import Link from 'next/link'
import PublicGuide from '../../src/components/public/PublicGuide'
import { courses } from '../../src/data/courses'
import { units } from '../../src/data/units'
import { publicMetadata } from '../../src/lib/seo'

export const metadata = publicMetadata('Rwandan Sign Language courses and topics', 'Explore NoBarriers course outlines for learning Rwandan Sign Language: beginner greetings, alphabet and numbers, everyday vocabulary and intermediate topics.', '/courses')

export default function Page() {
  return <PublicGuide path="/courses" title="A path into everyday conversation." intro="Explore the Rwandan Sign Language topics in NoBarriers. Start with the basics, build vocabulary for daily life and keep returning to what you have learned.">
    {courses.map(course => <section key={course.id} id={course.id}>
      <h2>{course.title}</h2><p>{course.description}.</p>
      <ul className="guide-topics">{units.filter(unit => unit.courseId === course.id).map(unit => <li key={unit.id}>{unit.title}</li>)}</ul>
    </section>)}
    <section><h2>How the learning app works</h2><p>Study activities introduce signs in small groups. Quizzes help you check what you remember, and your account keeps track of completed lessons and progress. These outlines describe the existing curriculum; the new experience is being prepared.</p><p>Vocabulary is a starting point. Practise complete demonstrations and seek feedback from fluent Rwandan signers to develop your communication skills.</p></section>
    <section><h2>New to sign language?</h2><p>Read <Link href="/sign-language">how to start learning sign language</Link>, or learn more about <Link href="/rwandan-sign-language">Rwandan Sign Language and local resources</Link>.</p></section>
  </PublicGuide>
}
