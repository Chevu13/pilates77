import Image from "next/image";
import { Header } from "@/components/Header";
import { Booking } from "@/components/Booking";
import { Logo } from "@/components/Logo";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/site";

import mirror from "@/assets/mirror.jpg";
import reformerKnee from "@/assets/reformer-knee.jpg";
import studioStretch from "@/assets/studio-stretch.jpg";
import groupLegs from "@/assets/group-legs.jpg";
import groupRing from "@/assets/group-ring.jpg";
import studioPink from "@/assets/studio-pink.jpg";
import studioLight from "@/assets/studio-light.jpg";
import detailParquet from "@/assets/detail-parquet.jpg";
import akcija from "@/assets/akcija-u-dvoje.jpg";
import pinkReformer from "@/assets/final.jpg";

const benefits = [
  { t: "Snaga", d: "Duboki mišići trupa rade u svakom pokretu." },
  { t: "Stabilnost", d: "Telo koje je sigurno i centrirano." },
  { t: "Mobilnost", d: "Više prostora i lakoće u zglobovima." },
  { t: "Kontrola pokreta", d: "Precizno, sporo, svesno — bez žurbe." },
  { t: "Pravilno držanje", d: "Uspravnije telo, i van studija." },
];

const services = [
  { n: "01", name: "Reformer Pilates", d: "Trening na reformeru uz sertifikovanog STOTT instruktora.", price: "Cena na upit" },
  { n: "02", name: "Presoterapija", d: "Tretman odmora i oporavka — samostalno ili posle treninga.", price: "Cena na upit" },
  { n: "03", name: "Studenti i mame", d: "Posebne ponude studija. Pitaj nas za detalje.", price: "Na upit" },
];

const reels = [
  { src: "/media/reel-zivot", label: "Reel: u svakom slučaju idem na pilates" },
  { src: "/media/reel-grupa", label: "Reel: grupni trening na reformerima" },
  { src: "/media/reel-kreni", label: "Reel: kreni na pilates" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: site.name,
  address: { "@type": "PostalAddress", streetAddress: site.street, addressLocality: site.city, addressCountry: "RS" },
  sameAs: [site.instagram],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <RevealObserver />

      <main>
        {/* ——— HERO ——— */}
        <section id="pocetna" className="hero">
          <div className="hero__media">
            <video
              className="hero__video"
              src="/media/hero.mp4"
              poster="/media/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          </div>
          <div className="hero__content">
            <p className="eyebrow hero__eyebrow">Pilates Studio 77 · Niš</p>
            <h1 className="hero__title">
              <span className="line"><span>Pokret koji menja</span></span>
              <span className="line"><span>način na koji</span></span>
              <span className="line"><span>se <em>osećaš.</em></span></span>
            </h1>
            <p className="hero__lead">Reformer Pilates i presoterapija u prijatnom, intimnom prostoru u Nišu.</p>
            <div className="hero__ctas">
              <a href="#zakazivanje" className="btn btn--dark">Zakaži termin</a>
              <a href="#studio" className="btn btn--line">Istraži studio</a>
            </div>
            <p className="hero__meta">
              <span className="pin" aria-hidden="true" />
              {site.street} · {site.city}
            </p>
          </div>
          <p className="hero__side" aria-hidden="true">Reformer Pilates — Presoterapija</p>
        </section>

        {/* ——— INTRO ——— */}
        <section className="intro section">
          <div className="container intro__grid">
            <div className="intro__text">
              <p className="eyebrow" data-reveal>Studio 77</p>
              <h2 className="h2" data-reveal>
                Vreme posvećeno <em>sebi.</em>
              </h2>
              <p className="lead" data-reveal>
                Sat vremena bez telefona, bez žurbe. Kontrolisan pokret, dah i fokus — u studiju koji je miran,
                svetao i napravljen da se u njemu osećaš dobro.
              </p>
              <p className="intro__quote" data-reveal>
                Tvoje telo. Tvoja energija.
              </p>
              <ul className="facts" data-reveal>
                <li><span>Reformer</span> Pilates</li>
                <li><span>Presoterapija</span> za oporavak</li>
                <li><span>STOTT</span> sertifikovani instruktor</li>
              </ul>
            </div>
            <div className="intro__media">
              <figure className="arch intro__img-a" data-reveal="image">
                <Image src={mirror} alt="Vežba ispred lučnog ogledala u Studiju 77" sizes="(min-width: 900px) 34vw, 70vw" placeholder="blur" />
              </figure>
              <figure className="intro__img-b" data-reveal="image">
                <Image src={reformerKnee} alt="Vežba na reformeru u svetlom prostoru studija" sizes="(min-width: 900px) 20vw, 45vw" placeholder="blur" />
              </figure>
            </div>
          </div>
        </section>

        {/* ——— REFORMER ——— */}
        <section id="reformer" className="reformer section section--dark">
          <div className="container reformer__grid">
            <figure className="reformer__tall" data-reveal="image">
              <Image src={studioStretch} alt="Istezanje na reformeru uz prirodno svetlo" sizes="(min-width: 900px) 40vw, 100vw" placeholder="blur" />
            </figure>
            <div className="reformer__body">
              <p className="eyebrow" data-reveal>01 — Metoda</p>
              <h2 className="h1" data-reveal>
                Reformer <em>Pilates</em>
              </h2>
              <p className="lead" data-reveal>
                Opruge, klizna platforma i tvoje telo. Reformer daje otpor tamo gde ti treba snaga i podršku tamo gde ti
                treba sigurnost — zato je trening intenzivan, a opet nežan prema telu.
              </p>
              <ol className="benefits">
                {benefits.map((b, i) => (
                  <li key={b.t} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                    <span className="benefits__n">0{i + 1}</span>
                    <span className="benefits__t">{b.t}</span>
                    <span className="benefits__d">{b.d}</span>
                  </li>
                ))}
              </ol>
              <a href="#usluge" className="btn btn--light" data-reveal>Saznaj više</a>
            </div>
          </div>
          <div className="container">
            <figure className="reformer__wide" data-reveal="image">
              <Image src={groupLegs} alt="Grupni trening na reformerima u Studiju 77" sizes="(min-width: 1200px) 1160px, 100vw" placeholder="blur" />
              <figcaption>Studio 77 · Niš</figcaption>
            </figure>
          </div>
        </section>

        {/* ——— PRESOTERAPIJA ——— */}
        <section id="presoterapija" className="preso section">
          <div className="container preso__grid">
            <div className="preso__visual" data-reveal="image">
              <div className="preso__arch">
                <span className="preso__mark" aria-hidden="true" />
              </div>
              <figure className="preso__inset">
                <Image src={pinkReformer} alt="Trenutak mira na reformeru" sizes="(min-width: 900px) 16vw, 36vw" placeholder="blur" />
              </figure>
            </div>
            <div className="preso__body">
              <p className="eyebrow" data-reveal>02 — Oporavak</p>
              <h2 className="h1" data-reveal>Presoterapija</h2>
              <p className="preso__sub" data-reveal>Trenutak samo za tebe.</p>
              <p className="lead" data-reveal>
                Udobno ležiš dok se posebne manžetne ritmično pune vazduhom i nežno pritiskaju noge, od stopala naviše.
                Tišina, dah, odmor — kao lep završetak treninga ili kao zaseban mali ritual.
              </p>
              <ol className="ritual" data-reveal>
                <li><span>i.</span>Opusti se</li>
                <li><span>ii.</span>Ritmična kompresija</li>
                <li><span>iii.</span>Odmor i tišina</li>
              </ol>
              <a href="#usluge" className="btn btn--dark" data-reveal>Saznaj više</a>
              <p className="fine" data-reveal>Ako imaš zdravstvene tegobe, pre tretmana se posavetuj sa lekarom.</p>
            </div>
          </div>
        </section>

        {/* ——— USLUGE ——— */}
        <section id="usluge" className="services section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>Usluge</p>
              <h2 className="h2" data-reveal>Izaberi svoj <em>ritam.</em></h2>
            </div>
            <ul className="svc">
              {services.map((s) => (
                <li key={s.n} className="svc__row" data-reveal>
                  <span className="svc__n">{s.n}</span>
                  <span className="svc__name">{s.name}</span>
                  <span className="svc__d">{s.d}</span>
                  <span className="svc__price">{s.price}</span>
                  <a href="#zakazivanje" className="svc__link" aria-label={`Zakaži: ${s.name}`}>Zakaži <span aria-hidden="true">→</span></a>
                </li>
              ))}
            </ul>

            <article className="promo" data-reveal>
              <figure className="promo__img">
                <Image src={akcija} alt="Akcija Lepše je u dvoje — objava Studija 77" sizes="(min-width: 900px) 30vw, 90vw" placeholder="blur" />
              </figure>
              <div className="promo__body">
                <p className="eyebrow">Aktuelno sa Instagrama</p>
                <h3 className="h3">Lepše je <em>u dvoje</em></h3>
                <p>Akcija za dve devojke: 8 + 8 termina i 4 presoterapije.</p>
                <p className="promo__price">
                  15.000 <span>dinara</span>
                </p>
                <p className="fine">Prema objavi studija na Instagramu. Trajanje akcije proveri pri zakazivanju.</p>
                <a href="#zakazivanje" className="btn btn--dark">Zakaži u dvoje</a>
              </div>
            </article>
          </div>
        </section>

        {/* ——— BOOKING ——— */}
        <section id="zakazivanje" className="booking section">
          <div className="container booking__grid">
            <div className="booking__intro">
              <p className="eyebrow" data-reveal>Online zakazivanje</p>
              <h2 className="h2" data-reveal>Zakaži svoj <em>termin</em></h2>
              <p className="lead" data-reveal>
                Izaberi uslugu, pogledaj dostupne termine i rezerviši svoj trening bez čekanja na potvrdu putem poruka.
              </p>
              <div className="compare" data-reveal>
                <div className="compare__col compare__col--old">
                  <p className="compare__h">Danas — preko DM-a</p>
                  <ol>
                    <li>Pošalješ poruku</li>
                    <li>Čekaš odgovor</li>
                    <li>Dogovarate slobodan termin</li>
                    <li>Čekaš potvrdu</li>
                  </ol>
                </div>
                <div className="compare__col compare__col--new">
                  <p className="compare__h">Uz sajt</p>
                  <ol>
                    <li>Izabereš uslugu i termin</li>
                    <li>Potvrdiš — gotovo</li>
                  </ol>
                  <p className="compare__time">Manje od jednog minuta, 24/7.</p>
                </div>
              </div>
            </div>
            <div className="booking__widget" data-reveal>
              <Booking />
            </div>
          </div>
        </section>

        {/* ——— STUDIO / GALERIJA ——— */}
        <section id="studio" className="gallery section">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal>Prostor</p>
                <h2 className="h2" data-reveal>Upoznajte <em>studio</em></h2>
              </div>
              <p className="lead" data-reveal>
                Parket riblja kost, drveni reformeri, lučna ogledala i puno dnevnog svetla.
              </p>
            </div>
            <div className="mosaic">
              <figure className="mosaic__a" data-reveal="image">
                <Image src={studioPink} alt="Reformer pilates uz prozor" sizes="(min-width: 900px) 33vw, 50vw" placeholder="blur" />
              </figure>
              <figure className="mosaic__b" data-reveal="image">
                <Image src={groupRing} alt="Grupni trening sa pilates obručem" sizes="(min-width: 900px) 33vw, 50vw" placeholder="blur" />
              </figure>
              <figure className="mosaic__c" data-reveal="image">
                <Image src={detailParquet} alt="Detalj reformera i parketa" sizes="(min-width: 900px) 25vw, 50vw" placeholder="blur" />
              </figure>
              <div className="mosaic__note" data-reveal>
                <Logo stacked />
                <p>{site.street}<br />{site.city}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ——— INSTAGRAM ——— */}
        <section className="insta section">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal>{site.instagramHandle}</p>
                <h2 className="h2" data-reveal>Pratite <em>Studio 77</em></h2>
              </div>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="btn btn--line" data-reveal>Instagram</a>
            </div>
          </div>
          <div className="insta__row">
            <a href={site.instagram} target="_blank" rel="noreferrer" className="insta__tile insta__tile--logo" aria-label="Studio 77 na Instagramu">
              <Logo stacked />
            </a>
            {reels.map((r) => (
              <a key={r.src} href={site.instagram} target="_blank" rel="noreferrer" className="insta__tile" aria-label={r.label}>
                <video src={`${r.src}.mp4`} poster={`${r.src}.jpg`} autoPlay muted loop playsInline preload="metadata" />
                <span className="insta__reel" aria-hidden="true" />
              </a>
            ))}
            <a href={site.instagram} target="_blank" rel="noreferrer" className="insta__tile" aria-label="Objava: akcija Lepše je u dvoje">
              <Image src={akcija} alt="" sizes="(min-width: 900px) 20vw, 60vw" />
            </a>
          </div>
        </section>

        {/* ——— LOKACIJA ——— */}
        <section id="kontakt" className="location section">
          <div className="container location__grid">
            <div className="location__info">
              <p className="eyebrow" data-reveal>Lokacija</p>
              <h2 className="h2" data-reveal>Studio 77</h2>
              <address data-reveal>
                {site.street}
                <br />
                {site.city}
              </address>
              <dl className="location__dl" data-reveal>
                <div>
                  <dt>Instagram</dt>
                  <dd><a href={site.instagram} target="_blank" rel="noreferrer">{site.instagramHandle}</a></dd>
                </div>
                <div>
                  <dt>Kontakt / zakazivanje</dt>
                  <dd>
                    <a href="#zakazivanje">Online</a> ili <a href={site.instagramDm} target="_blank" rel="noreferrer">poruka na Instagramu</a>
                  </dd>
                </div>
              </dl>
              <a href={site.mapLink} target="_blank" rel="noreferrer" className="btn btn--dark" data-reveal>Pogledaj na mapi</a>
            </div>
            <div className="location__map" data-reveal="image">
              <iframe
                title="Mapa — Dragiše Cvetkovića 18, Niš"
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* ——— FINAL CTA ——— */}
        <section className="final">
          <Image src={studioLight} alt="" fill sizes="100vw" className="final__bg" placeholder="blur" />
          <div className="final__content">
            <p className="eyebrow" data-reveal>Pilates Studio 77 · Niš</p>
            <h2 className="final__title" data-reveal>
              Tvoj trenutak <br />
              za <em>pokret.</em>
            </h2>
            <a href="#zakazivanje" className="btn btn--light" data-reveal>Zakaži termin</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <Logo stacked />
          <p>
            {site.street}, {site.city}
            <br />
            <a href={site.instagram} target="_blank" rel="noreferrer">{site.instagramHandle}</a>
          </p>
          <p className="footer__small">© {new Date().getFullYear()} Pilates Studio 77 Niš · Demo koncept sajta</p>
        </div>
      </footer>
    </>
  );
}
