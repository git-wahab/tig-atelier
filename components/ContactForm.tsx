"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center gap-[18px]">
        <span className="eyebrow !text-lavender">Message received</span>
        <h3 className="display text-[clamp(32px,3.6vw,48px)] leading-[1.05]">Thank you.</h3>
        <p className="max-w-[420px] text-base leading-[1.7] text-mute">
          We will reply within [RESPONSE TIME].
        </p>
        <button type="button" className="btn btn-line" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[22px]">
      <div className="flex flex-wrap gap-[22px]">
        <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-2">
          <label className="lbl" htmlFor="f-name">Name</label>
          <input className="field" id="f-name" name="name" type="text" required placeholder="Your name" autoComplete="name" />
        </div>
        <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-2">
          <label className="lbl" htmlFor="f-email">Email</label>
          <input className="field" id="f-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
        </div>
      </div>
      <div className="flex flex-wrap gap-[22px]">
        <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-2">
          <label className="lbl" htmlFor="f-topic">Topic</label>
          <select className="field" id="f-topic" name="topic" defaultValue="An order">
            <option>An order</option>
            <option>Sizing</option>
            <option>The designs</option>
            <option>Returns and exchanges</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-2">
          <label className="lbl" htmlFor="f-order">Order number (optional)</label>
          <input className="field" id="f-order" name="order" type="text" placeholder="[ORDER NUMBER FORMAT]" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="lbl" htmlFor="f-msg">Message</label>
        <textarea className="field min-h-[150px] resize-y leading-relaxed" id="f-msg" name="message" required placeholder="How can we help?" />
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-copper">
          Something went wrong. Please try again.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-fill min-h-14 text-[15px] disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
