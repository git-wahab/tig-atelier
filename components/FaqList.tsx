"use client";

import { useState } from "react";
import { faqs } from "@/lib/faq";

export default function FaqList() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <div className="flex min-w-0 flex-col">
      {faqs.map((f, i) => {
        const open = openId === f.id;
        const showGroup = i === 0 || faqs[i - 1].group !== f.group;
        return (
          <div key={f.id}>
            {showGroup && <div className="eyebrow pb-3 pt-12 first:pt-0">{f.group}</div>}
            <div className="border-t border-white/10">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${f.id}-panel`}
                onClick={() => setOpenId(open ? null : f.id)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[clamp(20px,2.2vw,28px)] leading-tight text-bone transition-colors hover:text-copper"
              >
                <span>{f.q}</span>
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-bone/30 font-sans text-lg">
                  {open ? "–" : "+"}
                </span>
              </button>
              {open && (
                <p
                  id={`${f.id}-panel`}
                  className="mb-7 mr-0 max-w-[620px] text-base leading-[1.75] text-mute md:mr-14"
                >
                  {f.a}
                </p>
              )}
            </div>
          </div>
        );
      })}
      <div className="border-t border-white/10" />
    </div>
  );
}
