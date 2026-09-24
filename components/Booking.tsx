"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const services = [
  { id: "reformer", name: "Reformer Pilates", note: "Trening na reformeru uz sertifikovanog STOTT instruktora" },
  { id: "preso", name: "Presoterapija", note: "Trenutak odmora i oporavka za telo" },
] as const;

const slots = [
  { time: "09:00", part: "Pre podne" },
  { time: "10:00", part: "Pre podne" },
  { time: "17:00", part: "Popodne i veče" },
  { time: "18:00", part: "Popodne i veče" },
  { time: "19:00", part: "Popodne i veče" },
];

const steps = ["Usluga", "Datum", "Termin", "Podaci"];
const weekdays = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];

const fmtLong = new Intl.DateTimeFormat("sr-Latn-RS", { weekday: "long", day: "numeric", month: "long" });
const fmtMonth = new Intl.DateTimeFormat("sr-Latn-RS", { month: "long", year: "numeric" });
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/\.$/, "");
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

// Demo availability: deterministic so the same day always shows the same booked slots.
const isBooked = (d: Date, i: number) => (d.getDate() * 3 + i) % 5 === 0;
const isFullDay = (d: Date) => d.getDate() % 9 === 4;

export function Booking() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<(typeof services)[number] | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [name, setName] = useState("");
  const [today] = useState(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  });
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const days = useMemo(() => {
    const first = new Date(month);
    const lead = (first.getDay() + 6) % 7; // Monday-first grid
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: count }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
    ];
  }, [month]);

  const isCurrentMonth = month.getMonth() === today.getMonth() && month.getFullYear() === today.getFullYear();
  const root = useRef<HTMLDivElement>(null);
  const go = (to: number) => {
    setStep(to);
    // on phones the next step can start above the fold — bring the widget back into view
    const top = root.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const advance = (to: number) => window.setTimeout(() => go(to), 260);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setName(String(new FormData(form).get("name") ?? "").split(" ")[0]);
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 1100);
  };

  const reset = () => {
    setStep(0);
    setService(null);
    setDate(null);
    setTime(null);
    setStatus("idle");
  };

  if (status === "done" && service && date && time) {
    return (
      <div className="bw bw--done" aria-live="polite">
        <svg className="bw__check" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="30" />
          <path d="M20 33 l8 8 l16 -18" />
        </svg>
        <p className="eyebrow">Termin je rezervisan</p>
        <h3 className="bw__done-title">
          Vidimo se uskoro{name ? `, ${name}` : ""}.
        </h3>
        <dl className="bw__summary">
          <div>
            <dt>Usluga</dt>
            <dd>{service.name}</dd>
          </div>
          <div>
            <dt>Datum</dt>
            <dd>{cap(fmtLong.format(date))}</dd>
          </div>
          <div>
            <dt>Vreme</dt>
            <dd>{time}</dd>
          </div>
          <div>
            <dt>Adresa</dt>
            <dd>
              {site.street}, {site.city}
            </dd>
          </div>
        </dl>
        <p className="bw__fine">Potvrda stiže na email i SMS. · Demo prikaz — rezervacija nije poslata studiju.</p>
        <button type="button" className="btn btn--line" onClick={reset}>
          Zakaži novi termin
        </button>
      </div>
    );
  }

  return (
    <div className="bw" ref={root}>
      <ol className="bw__steps" aria-label="Koraci zakazivanja">
        {steps.map((label, i) => {
          const reachable = i === 0 || (i === 1 && service) || (i === 2 && date) || (i === 3 && time);
          return (
            <li key={label} className={i === step ? "is-current" : i < step ? "is-done" : ""}>
              <button type="button" disabled={!reachable || i === step} onClick={() => go(i)}>
                <span className="bw__stepnum">0{i + 1}</span>
                <span className="bw__steplabel">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="bw__progress" style={{ ["--p" as string]: (step + 1) / steps.length }} />

      <div className="bw__panel" key={step}>
        {step === 0 && (
          <fieldset>
            <legend className="bw__q">Izaberi uslugu</legend>
            <div className="bw__services">
              {services.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  className={`bw__service${service?.id === s.id ? " is-selected" : ""}`}
                  aria-pressed={service?.id === s.id}
                  onClick={() => {
                    setService(s);
                    advance(1);
                  }}
                >
                  <span className="bw__service-name">{s.name}</span>
                  <span className="bw__service-note">{s.note}</span>
                  <span className="bw__radio" aria-hidden="true" />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="bw__q">Izaberi datum</legend>
            <div className="cal">
              <div className="cal__head">
                <button
                  type="button"
                  aria-label="Prethodni mesec"
                  disabled={isCurrentMonth}
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                >
                  ‹
                </button>
                <span className="cal__month">{cap(fmtMonth.format(month))}</span>
                <button
                  type="button"
                  aria-label="Sledeći mesec"
                  disabled={!isCurrentMonth}
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                >
                  ›
                </button>
              </div>
              <div className="cal__grid">
                {weekdays.map((w) => (
                  <span key={w} className="cal__wd">
                    {w}
                  </span>
                ))}
                {days.map((d, i) => {
                  if (!d) return <span key={`e${i}`} />;
                  const disabled = d < today || d.getDay() === 0 || isFullDay(d);
                  const selected = date && sameDay(d, date);
                  return (
                    <button
                      type="button"
                      key={d.toISOString()}
                      className={`cal__day${selected ? " is-selected" : ""}${sameDay(d, today) ? " is-today" : ""}`}
                      disabled={disabled}
                      aria-pressed={!!selected}
                      aria-label={cap(fmtLong.format(d))}
                      onClick={() => {
                        setDate(d);
                        setTime(null);
                        advance(2);
                      }}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
              <p className="cal__legend">
                <span className="dot dot--free" /> Slobodni termini <span className="dot dot--off" /> Popunjeno
              </p>
            </div>
          </fieldset>
        )}

        {step === 2 && date && (
          <fieldset>
            <legend className="bw__q">Izaberi termin</legend>
            <p className="bw__sub">{cap(fmtLong.format(date))}</p>
            {["Pre podne", "Popodne i veče"].map((part) => (
              <div key={part} className="slots">
                <span className="slots__label">{part}</span>
                <div className="slots__row">
                  {slots.map((s, i) =>
                    s.part !== part ? null : (
                      <button
                        type="button"
                        key={s.time}
                        className={`slot${time === s.time ? " is-selected" : ""}`}
                        disabled={isBooked(date, i)}
                        aria-pressed={time === s.time}
                        onClick={() => {
                          setTime(s.time);
                          advance(3);
                        }}
                      >
                        {s.time}
                        {isBooked(date, i) && <small>popunjeno</small>}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </fieldset>
        )}

        {step === 3 && service && date && time && (
          <form className="bw__form" onSubmit={submit} noValidate={false}>
            <p className="bw__q">Tvoji podaci</p>
            <p className="bw__recap">
              {service.name} · {cap(fmtLong.format(date))} · {time}
            </p>
            <label className="field">
              <span>Ime i prezime</span>
              <input name="name" required autoComplete="name" minLength={3} />
            </label>
            <label className="field">
              <span>Telefon</span>
              <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9+ \/\-]{6,}" />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <button type="submit" className="btn btn--dark btn--block" disabled={status === "sending"}>
              {status === "sending" ? <span className="spinner" aria-label="Potvrđujemo" /> : "Potvrdi termin"}
            </button>
          </form>
        )}
      </div>

      {step > 0 && status === "idle" && (
        <button type="button" className="bw__back" onClick={() => go(step - 1)}>
          ← Nazad
        </button>
      )}
    </div>
  );
}
