"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import Eyebrow from "@/components/ui/Eyebrow";
import Field from "@/components/ui/Field";
import Lede from "@/components/ui/Lede";

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
      <div className="flex min-h-[420px] flex-col items-start justify-center gap-4">
        <Eyebrow>Message received</Eyebrow>
        <Display level={3} size="sm">
          Thank you.
        </Display>
        <Lede size="body" className="max-w-[420px]">
          We will reply within [RESPONSE TIME].
        </Lede>
        <Button variant="line" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6">
        <Field id="f-name" label="Name" className="flex-[1_1_220px]">
          <input
            className="field"
            id="f-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            autoComplete="name"
          />
        </Field>
        <Field id="f-email" label="Email" className="flex-[1_1_220px]">
          <input
            className="field"
            id="f-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-6">
        <Field id="f-topic" label="Topic" className="flex-[1_1_220px]">
          <select className="field" id="f-topic" name="topic" defaultValue="An order">
            <option>An order</option>
            <option>Sizing</option>
            <option>The designs</option>
            <option>Returns and exchanges</option>
            <option>Something else</option>
          </select>
        </Field>
        <Field id="f-order" label="Order number (optional)" className="flex-[1_1_220px]">
          <input
            className="field"
            id="f-order"
            name="order"
            type="text"
            placeholder="[ORDER NUMBER FORMAT]"
          />
        </Field>
      </div>

      <Field id="f-msg" label="Message">
        <textarea
          className="field min-h-[150px] resize-y leading-relaxed"
          id="f-msg"
          name="message"
          required
          placeholder="How can we help?"
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-small text-accent-copper">
          Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" size="tall" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
