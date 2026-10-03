import Link from 'next/link'
import PublicGuide from '../../src/components/public/PublicGuide'
import { publicMetadata } from '../../src/lib/seo'

export const metadata = publicMetadata('Rwandan Sign Language: beginner guide and resources', 'Explore Rwandan Sign Language with NoBarriers: beginner learning guidance, course topics and resources for communicating with the Deaf community in Rwanda.', '/rwandan-sign-language')

export default function Page() {
  return <PublicGuide path="/rwandan-sign-language" title="Learn Rwandan Sign Language." intro="NoBarriers helps people study Rwandan Sign Language, with a learning path that starts with everyday vocabulary and builds through regular practice.">
    <section><h2>A language rooted in Rwanda’s Deaf community</h2><p>Rwandan Sign Language is a visual language used in Rwanda’s Deaf community. Learning it means paying attention to how fluent signers communicate, including movement and expression as well as hand positions.</p><p>Kinyarwanda and English can be used to explain a lesson, but the language being studied here is Rwandan Sign Language. Translating a word label does not make the sign itself a different language.</p></section>
    <section><h2>Where to begin</h2><p>Start with daily conversation, the alphabet and basic numbers. Then practise vocabulary for family, food, clothing, days and months. Our <Link href="/courses">course outlines</Link> show the topics in each learning stage.</p><p>Study a few signs at a time, revisit them and ask a fluent Rwandan signer to check your attempts. When a sign involves movement, use a complete demonstration rather than relying only on a still image.</p></section>
    <section><h2>Is Rwandan Sign Language the same as ASL?</h2><p>No. Some signs may look similar, but that does not mean the languages share every sign or the same grammar. An ASL demonstration alone does not establish how a word is signed in Rwanda.</p><p>Use a Rwandan source to check a sign. The Rwandan Sign Language Dictionary provides descriptions and illustrations in Kinyarwanda and English.</p></section>
    <section><h2>Who is NoBarriers for?</h2><p>The platform is for people who want to learn to communicate with Rwandan signers, including families, friends, students and colleagues. Learning is most useful when it supports real conversations and respects the people whose language you are studying.</p></section>
    <section><h2>Rwandan learning references</h2><ul>
      <li><a href="https://www.rnud.org/resources-center/">Rwanda National Union of the Deaf resources centre</a> — explore Rwandan sign-language resources.</li>
      <li><a href="https://www.ncpd.gov.rw/fileadmin/user_upload/NCPD/Publication/Reports/INKORANYAMAGAMBO_Y_URURIMI_RW_AMARENGA_NYARWANDA.pdf">Rwandan Sign Language Dictionary, second edition (PDF)</a> — consult the dictionary hosted by Rwanda’s National Council of Persons with Disabilities.</li>
    </ul><p>These are reference links; they do not imply that these organisations endorse NoBarriers.</p></section>
    <section><h2>Take your next step</h2><p>Read our <Link href="/sign-language">beginner’s guide to learning sign language</Link> and <Link href="/courses">browse the course topics</Link>. The <Link href="/">homepage</Link> shows when our new experience is due to return.</p></section>
  </PublicGuide>
}
