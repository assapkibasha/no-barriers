import Link from 'next/link'
import PublicGuide from '../../src/components/public/PublicGuide'
import { publicMetadata } from '../../src/lib/seo'

export const metadata = publicMetadata('Learn sign language: a beginner’s guide', 'Start learning sign language: choose the language used by your community, practise with clear demonstrations, and explore Rwandan Sign Language with NoBarriers.', '/sign-language')

export default function Page() {
  return <PublicGuide path="/sign-language" title="Learning sign language starts with people." intro="Learning to sign can help you communicate with Deaf family members, friends, classmates and colleagues. Start with the language used by the people you want to talk with.">
    <section><h2>Which sign language should you learn?</h2>
      <p>There is no single universal sign language. Sign languages have their own vocabulary and grammar, and the language used in one community may differ from another. American Sign Language (ASL) and Rwandan Sign Language should not be treated as interchangeable.</p>
      <p>NoBarriers focuses on <Link href="/rwandan-sign-language">Rwandan Sign Language</Link>. If your goal is to communicate with signers in Rwanda, begin with Rwandan resources and learn alongside people who use the language.</p>
    </section>
    <section><h2>How to start learning</h2>
      <ol><li><strong>Choose a useful first topic.</strong> Greetings, introducing yourself and numbers give you a small set of things to practise.</li>
        <li><strong>Watch the complete sign.</strong> Look at handshape, palm direction, position, movement and facial expression. A photograph can help show a position, but it cannot show every part of a moving sign.</li>
        <li><strong>Practise recalling, not just copying.</strong> Watch a demonstration, put it away, try the sign, then compare your attempt with the source.</li>
        <li><strong>Ask for feedback.</strong> A fluent signer or teacher can notice details that a beginner may miss.</li>
        <li><strong>Use what you learn in conversation.</strong> Keep practising short exchanges and return to difficult signs regularly.</li></ol>
    </section>
    <section><h2>What can you study with NoBarriers?</h2><p>Our course outlines cover greetings, the alphabet, numbers, colours, family, food, clothing, time and school vocabulary. The learning app combines study activities with quizzes and progress tracking.</p><p><Link href="/courses">Explore the sign language course topics</Link>.</p></section>
    <section><h2>Common questions</h2>
      <h3>Can I learn sign language online?</h3><p>Online resources can support vocabulary study and regular practice. Pair them with feedback and conversation with fluent signers so you can check your understanding.</p>
      <h3>Is learning the alphabet enough?</h3><p>The alphabet is one part of learning. You also need vocabulary, grammar, movement and the facial and body expressions used in the language.</p>
      <h3>How long does learning take?</h3><p>It depends on your goal, practice and opportunities to communicate. Start with a manageable routine and measure progress by the conversations you can have, rather than a fixed promise of fluency.</p>
    </section>
    <section><h2>Resources to explore</h2><p>The <a href="https://wfdeaf.org/our-work/">World Federation of the Deaf</a> shares information about sign languages and Deaf communities. For Rwanda-specific learning resources, see the <a href="https://www.rnud.org/resources-center/">Rwanda National Union of the Deaf resources centre</a>.</p></section>
  </PublicGuide>
}
