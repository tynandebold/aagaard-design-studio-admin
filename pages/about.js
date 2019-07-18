import "../layout.css";

import Layout from "../components/layout";
import Nav from "../components/public/nav";

const About = () => (
  <Layout
    darkTheme={false}
    pageClass="portfolio"
    title="about · aagaard design studio."
  >
    <section className="left">
      <Nav page="about" />
    </section>
    <section className="right">
      <p>
        A Copenhagen–based, one-man army design studio. I design, advise and
        carry out purposeful solutions — as a brand strategist, futurist and
        self–taught designer. Currently working as a Senior Designer at Charlie
        Tango. Educationally I hold a Bachelors degree in Social Science and a
        Masters in E-business. I have comprehensive experience in working with
        the digitalisaion of brands — from brand values and visual identity to
        digital product design and design systems. My philosophy is to think
        brand when doing digital and to think digital when doing brand. I don’t
        believe in any certain process or methodology, nor do I religiously
        worship the latest set of buzzwords. I believe in simplicity, expertise,
        intuition, effort, logic, collaboration and trial and error — and above
        all I believe in whatever it takes.
      </p>
      <p>
        Client list: Danske Bank, Lauritz.com, SAS, Libratone, Coloplast,
        Wilhelm Lauritz Arkitekter, Dinesen, YouSee, Virk, Borger, Storebælt AS,
        3 Days of Design, Velux, Gether Conemporary, ABN Amro, Anker&co,
        Scalepoint + more.
      </p>
      <p className="date">26.06––2019</p>
    </section>
  </Layout>
);

export default About;
