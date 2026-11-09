import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

/** The route logs accepted messages; keep the test output clean. */
beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
});

function post(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Which size fits a 40in chest?",
  topic: "Sizing",
  order: "",
};

describe("POST /api/contact: accepts", () => {
  it("returns ok for a complete message", async () => {
    const res = await POST(post(valid));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  it("accepts a message without the optional topic and order", async () => {
    const res = await POST(post({ name: "Ada", email: "a@b.co", message: "Hello" }));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  it("trims surrounding whitespace before validating", async () => {
    const res = await POST(
      post({ name: "  Ada  ", email: "  ada@example.com  ", message: "  Hello  " }),
    );
    expect(res.status).toBe(200);
  });

  it("logs the trimmed fields, not the raw ones", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    await POST(post({ ...valid, name: "  Ada  " }));
    expect(log).toHaveBeenCalledWith(
      "[contact]",
      expect.objectContaining({ name: "Ada", email: "ada@example.com" }),
    );
  });

  it("passes the topic and order through to the log", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    await POST(post({ ...valid, topic: "Returns and exchanges", order: "TIG-1024" }));
    expect(log).toHaveBeenCalledWith(
      "[contact]",
      expect.objectContaining({ topic: "Returns and exchanges", order: "TIG-1024" }),
    );
  });
});

describe("POST /api/contact: rejects", () => {
  it("rejects a body that is not JSON", async () => {
    const res = await POST(post("{not json"));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ ok: false, error: "Invalid request" });
  });

  it("rejects an empty body", async () => {
    const res = await POST(
      new Request("http://localhost/api/contact", { method: "POST" }),
    );
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ ok: false, error: "Invalid request" });
  });

  it.each([
    ["a missing name", { email: "a@b.co", message: "Hello" }],
    ["a blank name", { name: "   ", email: "a@b.co", message: "Hello" }],
    ["a missing email", { name: "Ada", message: "Hello" }],
    ["an email with no @", { name: "Ada", email: "not-an-email", message: "Hello" }],
    ["a blank email", { name: "Ada", email: "  ", message: "Hello" }],
    ["a missing message", { name: "Ada", email: "a@b.co" }],
    ["a blank message", { name: "Ada", email: "a@b.co", message: "   " }],
    ["every field missing", {}],
  ])("rejects %s", async (_label, body) => {
    const res = await POST(post(body));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ ok: false, error: "Missing fields" });
  });

  it("does not log a rejected message", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    await POST(post({ name: "Ada", email: "nope", message: "Hello" }));
    expect(log).not.toHaveBeenCalledWith("[contact]", expect.anything());
  });

  it("coerces non-string fields rather than throwing", async () => {
    const res = await POST(post({ name: 42, email: { a: 1 }, message: [1, 2] }));
    expect(res.status).toBe(400);
  });
});

describe("POST /api/contact: known limits of the current check", () => {
  // The route only tests email.includes("@"). These lock in today's behaviour so a
  // stricter check later shows up as a deliberate change, not a surprise.
  it.each(["@", "a@", "@b", "a@b", "has @ in the middle"])(
    "currently accepts %o as an email",
    async (email) => {
      const res = await POST(post({ name: "Ada", email, message: "Hello" }));
      expect(res.status).toBe(200);
    },
  );
});
