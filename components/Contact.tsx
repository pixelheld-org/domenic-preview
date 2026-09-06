"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Terminanfrage von ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:praxis@heilmasseur-domenic.at?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="kontakt"
      className="relative py-24 sm:py-32 bg-[#111] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e8654a] via-[#f2a93b] to-[#0d4f4f]" />
      <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-[#e8654a]/5" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0d4f4f]/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white/70">
            Kontakt
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            Bereit für Ihre{" "}
            <span className="text-[#f2a93b]">Behandlung?</span>
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Schreiben Sie mir oder rufen Sie einfach an — ich freue mich auf
            Sie.
          </p>
        </div>

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[
              {
                icon: MapPin,
                label: "Adresse",
                value: "Feldgasse 3/20, 1080 Wien",
                href: "https://maps.google.com/?q=Feldgasse+3,+1080+Wien",
                color: "#e8654a",
              },
              {
                icon: Phone,
                label: "Telefon",
                value: "+43 670 189 52 56",
                href: "tel:+4367018952556",
                color: "#0d4f4f",
              },
              {
                icon: Mail,
                label: "E-Mail",
                value: "praxis@heilmasseur-domenic.at",
                href: "mailto:praxis@heilmasseur-domenic.at",
                color: "#f2a93b",
              },
              {
                icon: Clock,
                label: "Termine",
                value: "Nach Vereinbarung",
                color: "#e8654a",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] p-5"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-1 block text-sm sm:text-base font-semibold text-white hover:text-[#f2a93b] transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm sm:text-base font-semibold text-white">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* CTA to booking page */}
            <a
              href="/buchen"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#e8654a]/35 hover:scale-[1.02]"
            >
              Online Termin buchen
            </a>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-3xl bg-white/[0.05] border border-white/[0.08] p-8 sm:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-bold text-white/60 mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ihr Name"
                  className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-[#f2a93b]/50 focus:ring-2 focus:ring-[#f2a93b]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-bold text-white/60 mb-2"
                >
                  E-Mail
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre@email.at"
                  className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-[#f2a93b]/50 focus:ring-2 focus:ring-[#f2a93b]/20"
                />
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="block text-sm font-bold text-white/60 mb-2"
              >
                Nachricht
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Erzählen Sie mir von Ihrem Anliegen..."
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-white placeholder-white/50 outline-none transition-all resize-none focus:border-[#f2a93b]/50 focus:ring-2 focus:ring-[#f2a93b]/20"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[#e8654a]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#e8654a]/35 hover:scale-[1.02]"
            >
              <Send size={18} />
              Nachricht senden
            </button>
            <p className="mt-3 text-xs text-white/50">
              Öffnet Ihr E-Mail-Programm mit vorausgefüllter Nachricht
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
