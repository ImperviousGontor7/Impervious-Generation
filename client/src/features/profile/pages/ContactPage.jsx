import {
  FaWhatsapp,
  FaInstagram,
  FaDiscord,
  FaTelegramPlane,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { FiMail, FiArrowRight, FiInfo } from "react-icons/fi";

import contact from "../../../assets/images/Jami Emas.webp";

const contactItems = [
  {
    icon: FiMail,
    title: "Email",
    value: "hello@aistudio.com",
    color: "text-violet-500",
  },
  {
    icon: FaWhatsapp,
    title: "Whatsapp",
    value: "+62 815 4721 2932",
    color: "text-green-500",
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    value: "@impervious.generation.g7",
    color: "text-pink-500",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Location",
    value: "Kalianda, Lampung Selatan",
    color: "text-violet-500",
  },
  {
    icon: FiInfo,
    title: "Status Online",
    value: "Usually replies within 1 hour",
    color: "text-violet-500",
  },
];

const quickContacts = [
  {
    icon: FaWhatsapp,
    title: "Whatsapp",
    subtitle: "Chat Now",
    color: "text-green-500",
  },
  {
    icon: FaDiscord,
    title: "Discord",
    subtitle: "Join Server",
    color: "text-indigo-500",
  },
  {
    icon: FaTelegramPlane,
    title: "Telegram",
    subtitle: "Send Message",
    color: "text-sky-500",
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    subtitle: "Message Us",
    color: "text-pink-500",
  },
];

const faqs = [
  "What is Impervious Generation?",
  "How can I join Impervious Generation?",
  "Is this website free to use?",
  "I found a bug or technical issue. What should I do?",
];

function ContactCard({ icon: Icon, title, value, color }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/3 p-4 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 sm:p-5">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 sm:h-16 sm:w-16">
          <Icon className={`${color} text-2xl sm:text-3xl`} />
        </div>

        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white sm:text-base">
            {title}
          </h4>
          <p className="truncate text-sm text-white/55 sm:text-base">{value}</p>
        </div>
      </div>

      <FiArrowRight className="shrink-0 text-lg text-white/45" />
    </div>
  );
}

function QuickContactCard({ icon: Icon, title, subtitle, color }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 p-4 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 sm:p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 sm:h-14 sm:w-14">
          <Icon className={`${color} text-xl sm:text-2xl`} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-white sm:text-base">
            {title}
          </h2>
          <h5 className="mt-1 text-xs text-white/50 sm:text-sm">{subtitle}</h5>
        </div>

        <FiArrowRight className="shrink-0 text-base text-white/45 sm:text-lg" />
      </div>
    </div>
  );
}

function FaqItem({ question }) {
  return (
    <button
      type="button"
      className="group flex w-full items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/3 p-4 text-left transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/40 sm:p-5"
      aria-label={question}
    >
      <h3 className="text-sm font-medium leading-relaxed text-white sm:text-base">
        {question}
      </h3>
      <FiArrowRight className="shrink-0 text-base text-white/45 transition-transform duration-200 group-hover:translate-x-1 sm:text-lg" />
    </button>
  );
}

function Contact() {
  return (
    <div className="w-full">
      <div className="w-full max-w-500 mx-auto px-5 sm:px-8 -mt-24 relative z-10 pt-24 sm:pt-28 lg:pt-32">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <section className="w-full max-w-xl mb-15 space-y-5 sm:space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-white/75 backdrop-blur-md sm:text-sm">
              <span className="text-amber-400">•</span>
              CONTACT US
            </span>

            <div className="space-y-3">
              <h1 className="max-w-lg text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                Let’s Connect To Improve What’s Needed
              </h1>

              <p className="max-w-md text-sm leading-7 text-white/60 sm:text-base">
                Experiencing issues with this website? Stuck, bugs, errors, or
                unexpected logouts? Feel free to contact us for a better
                experience.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:h-12 sm:px-7 sm:text-base"
              >
                Send Message
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 active:scale-[0.98] sm:h-12 sm:px-7 sm:text-base"
              >
                View Services
              </button>
            </div>
          </section>

          <div className="relative w-full aspect-video overflow-hidden self-end lg:mt-0">
            <img
              src={contact}
              alt="Contact"
              loading="lazy"
              className="block h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-r from-bg-main via-bg-main/5 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-l from-bg-main via-bg-main/5 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-bg-main/50 via-transparent to-transparent" />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_1.35fr]">
          <section className="rounded-3xl border border-white/10 bg-white/3 p-4 sm:p-6 lg:p-7">
            <h2 className="mb-5 text-xl font-semibold text-white sm:text-2xl">
              Contact Information
            </h2>

            <div className="space-y-5">
              {contactItems.map((item) => (
                <ContactCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  value={item.value}
                  color={item.color}
                />
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/3 p-4 sm:p-6 lg:p-7">
            <form className="flex h-full min-h-130 flex-col">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Send a Message
              </h2>

              <div className="mt-5 flex flex-1 flex-col gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/3 px-4 py-4 sm:px-5 sm:py-5">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-white/75"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 sm:text-base"
                    />
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/3 px-4 py-4 sm:px-5 sm:py-5">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-white/75"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 sm:text-base"
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/3 px-4 py-4 sm:px-5 sm:py-5">
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-white/75"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can I help you?"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 sm:text-base"
                  />
                </div>

                <div className="flex-1 rounded-3xl border border-white/10 bg-white/3 px-4 py-4 sm:px-5 sm:py-5">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-white/75"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    className="min-h-60 w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/30 sm:min-h-70 sm:text-base"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-3xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] sm:w-60 sm:text-base"
              >
                Send Message
              </button>
            </form>
          </section>
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/3 p-4 sm:p-6 lg:p-7">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Quick Contact
          </h2>
          <p className="mt-2 text-sm text-white/60 sm:text-base">
            Reach out to me directly through your preferred platform.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickContacts.map((item) => (
              <QuickContactCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                color={item.color}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/3 p-4 sm:p-6 lg:p-7">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {faqs.map((question) => (
              <FaqItem key={question} question={question} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;