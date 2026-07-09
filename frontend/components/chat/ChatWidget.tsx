"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface ChatLink {
  label: string;
  href: string;
}

interface ChatMessage {
  role: "bot" | "user";
  text: string;
  links?: ChatLink[];
}

const QUICK_TOPICS = [
  "Residential doors",
  "Commercial doors",
  "Openers & remotes",
  "Springs",
  "Get a quote",
  "Hours & locations",
  "Leave a message",
];

const GREETING: ChatMessage = {
  role: "bot",
  text: "Hi! I'm the Doors Direct helper. I can point you to the right page, answer quick questions, or take a message for the team. What are you looking for?",
};

/** Simple keyword router — intentionally lightweight, no external AI. */
function answer(raw: string): ChatMessage {
  const t = raw.toLowerCase();

  if (/(panel|section)/.test(t)) {
    return {
      role: "bot",
      text: "We stock replacement sections in 18\", 21\", and 24\" heights. Use the quote form, check “Looking for a door we stock?”, and pick Replacement panel(s) — width can be typed in.",
      links: [{ label: "Request panels", href: "/request-quote" }],
    };
  }
  if (/(spring|torsion|extension)/.test(t)) {
    return {
      role: "bot",
      text: "We stock torsion and extension springs in the full standard size range. Send us the specs (or just your door size) and we'll match them.",
      links: [{ label: "Request springs", href: "/spring-request" }],
    };
  }
  if (/(opener|operator|liftmaster|remote|keypad|myq|wall control)/.test(t)) {
    return {
      role: "bot",
      text: "We carry LiftMaster's current openers (Basic, Plus, and Premium series) plus remotes, keypads, and wall controls.",
      links: [
        { label: "Openers", href: "/liftmaster-products/openers" },
        { label: "Remotes & accessories", href: "/liftmaster-products/accessories" },
      ],
    };
  }
  if (/(commercial|warehouse|storefront|rolling|dock)/.test(t)) {
    return {
      role: "bot",
      text: "Commercial doors from Clopay, C.H.I., Haas, and Amarr — sectional, insulated, and full-view. We also stock the 524, 524V, 524S, and 3200 commercial doors for quick pickup.",
      links: [{ label: "Commercial doors", href: "/commercial-garage-doors" }],
    };
  }
  if (/(residential|home|house|garage door)/.test(t)) {
    return {
      role: "bot",
      text: "Residential doors from Clopay, C.H.I., Haas, and Amarr — browse every collection or jump to a brand.",
      links: [{ label: "Residential doors", href: "/residential-garage-doors" }],
    };
  }
  if (/(clopay|chi|c\.h\.i|haas|amarr)/.test(t)) {
    return {
      role: "bot",
      text: "We carry that brand! Pick residential or commercial and use the brand buttons at the top of the catalog.",
      links: [
        { label: "Residential", href: "/residential-garage-doors" },
        { label: "Commercial", href: "/commercial-garage-doors" },
      ],
    };
  }
  if (/(quote|estimate|price|pricing|cost|how much)/.test(t)) {
    return {
      role: "bot",
      text: "The fastest way to get pricing is the quote form — it goes straight to the team at the location you pick, and you can select in-stock doors or panels right on it.",
      links: [{ label: "Request a quote", href: "/request-quote" }],
    };
  }
  if (/(visualizer|design|ezdoor|see the door|preview)/.test(t)) {
    return {
      role: "bot",
      text: "Try Clopay EZDoor — upload a photo of your home and preview residential Clopay doors on it.",
      links: [{ label: "Open the visualizer", href: "/ezdoor" }],
    };
  }
  if (/(hour|open|location|address|where|direction)/.test(t)) {
    return {
      role: "bot",
      text: "We have two NJ locations: Doors Direct South in Pennsauken and Doors Direct Union. Call (856) 662-6666 for hours and pickup details — the footer has map links for both.",
      links: [{ label: "Call now", href: "tel:8566626666" }],
    };
  }
  if (/(phone|call|contact|talk|human|person)/.test(t)) {
    return {
      role: "bot",
      text: "You can call the team at (856) 662-6666, or leave a message here and it goes straight to their inbox.",
      links: [{ label: "Call now", href: "tel:8566626666" }],
    };
  }
  return {
    role: "bot",
    text: "I can help with residential or commercial doors, LiftMaster openers and remotes, springs, replacement panels, quotes, and hours/locations. Pick a topic below, or choose “Leave a message” and the team will follow up.",
  };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, showForm, open]);

  function handleTopic(topic: string) {
    if (topic === "Leave a message") {
      setMessages((m) => [
        ...m,
        { role: "user", text: topic },
        {
          role: "bot",
          text: "Sure — fill this out and it goes straight to the team.",
        },
      ]);
      setShowForm(true);
      return;
    }
    setMessages((m) => [...m, { role: "user", text: topic }, answer(topic)]);
  }

  function handleSend(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }, answer(text)]);
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFormStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "inquiry",
          location: data.get("location"),
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          fields: [{ label: "Sent from", value: "Website chat helper" }],
          details: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error();
      setFormStatus("sent");
      setShowForm(false);
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Got it — your message is on its way to the team. They'll follow up soon. Anything else I can point you to?",
        },
      ]);
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <>
      {/* Floating toggle */}
      <button
        type="button"
        aria-label={open ? "Close chat helper" : "Open chat helper"}
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-main text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-secondary"
      >
        {open ? (
          <XMarkIcon className="h-7 w-7" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-7 w-7" />
        )}
      </button>

      {/* Panel */}
      {open ? (
        <div className="fixed bottom-24 right-5 z-40 flex w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
          <div className="bg-red-main px-4 py-3 text-white">
            <p className="font-bold">Doors Direct Helper</p>
            <p className="text-xs text-white/70">
              Quick answers · door finder · leave a message
            </p>
          </div>

          <div
            ref={scrollRef}
            className="flex max-h-[46vh] min-h-[240px] flex-col gap-3 overflow-y-auto p-4"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-6 ${
                  msg.role === "bot"
                    ? "self-start bg-cream-secondary text-gray-bg"
                    : "self-end bg-red-main text-white"
                }`}
              >
                {msg.text}
                {msg.links?.length ? (
                  <span className="mt-2 flex flex-wrap gap-2">
                    {msg.links.map((link) => (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="rounded-md bg-red-main px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-secondary"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </span>
                ) : null}
              </div>
            ))}

            {showForm ? (
              <form
                onSubmit={handleFormSubmit}
                className="grid gap-2 rounded-lg border border-gray-200 p-3"
              >
                <div className="grid grid-cols-2 gap-2">
                  <input required name="firstName" placeholder="First name" className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
                  <input required name="lastName" placeholder="Last name" className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <input required type="email" name="email" placeholder="Email" className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
                <input required type="tel" name="phone" placeholder="Phone" className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
                <select required name="location" defaultValue="" className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                  <option value="" disabled>
                    Which location?
                  </option>
                  <option value="south">Doors Direct South</option>
                  <option value="union">Doors Direct Union</option>
                </select>
                <textarea required name="message" rows={3} placeholder="How can we help?" className="resize-none rounded-md border border-gray-300 px-3 py-2 text-sm" />
                {formStatus === "error" ? (
                  <p className="text-xs font-semibold text-red-main">
                    Something went wrong — please try again or call us.
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="rounded-md bg-red-main px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-secondary disabled:opacity-60"
                >
                  {formStatus === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            ) : null}
          </div>

          {/* Quick topics */}
          <div className="flex flex-wrap gap-1.5 border-t border-gray-100 px-3 py-2">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopic(topic)}
                className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 transition-colors hover:border-red-main hover:text-red-main"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex gap-2 border-t border-gray-100 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-main"
            />
            <button
              type="submit"
              aria-label="Send"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-red-main text-white transition-colors hover:bg-red-secondary"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
