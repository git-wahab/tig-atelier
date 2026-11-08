"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
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
            {showGroup && (
              <Eyebrow as="div" className="pb-3 pt-12 first:pt-0">
                {f.group}
              </Eyebrow>
            )}
            <div className="border-t border-line-hairline">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${f.id}-panel`}
                onClick={() => setOpenId(open ? null : f.id)}
                className="display group flex w-full items-center justify-between gap-6 py-6 text-left text-display-xs text-content-primary transition-colors hover:text-[var(--accent)]"
              >
                <span>{f.q}</span>
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line-strong font-sans text-lg">
                  {open ? "–" : "+"}
                </span>
              </button>
              <p
                id={`${f.id}-panel`}
                hidden={!open}
                className="mb-7 mr-0 max-w-[620px] text-body text-content-body md:mr-14"
              >
                {f.a}
              </p>
            </div>
          </div>
        );
      })}
      <div className="border-t border-line-hairline" />
    </div>
  );
}
