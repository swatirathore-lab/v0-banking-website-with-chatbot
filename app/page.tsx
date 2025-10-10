import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { SiteFooter } from "@/components/site-footer"
import { Chatbot } from "@/components/chatbot"
import { SectionBreak } from "@/components/section-break"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <SectionBreak />
        <Services />
        <SectionBreak />
        <About />
      </main>
      <SiteFooter />
      <Chatbot />
    </>
  )
}
