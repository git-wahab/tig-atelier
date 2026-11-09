import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CartProvider, useCart, type CartItem } from "@/lib/cart";

const STORAGE_KEY = "hoodieCart";

/** Reads the cart back out of storage the way a reload would. */
function stored(): CartItem[] | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === null ? null : JSON.parse(raw);
}

function seed(items: unknown) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/** Exposes the context so tests drive the real provider, not a reimplementation. */
function Harness() {
  const { items, ready, count, add, setQty, remove, clear } = useCart();
  return (
    <div>
      <span data-testid="ready">{String(ready)}</span>
      <span data-testid="count">{count}</span>
      <span data-testid="items">{JSON.stringify(items)}</span>
      <button onClick={() => add("midnight-bloom", "M")}>add bloom M</button>
      <button onClick={() => add("midnight-bloom", "L")}>add bloom L</button>
      <button onClick={() => add("whispering-crane-bird", "M")}>add crane M</button>
      <button onClick={() => setQty("midnight-bloom", "M", 4)}>set bloom M to 4</button>
      <button onClick={() => setQty("midnight-bloom", "M", 0)}>set bloom M to 0</button>
      <button onClick={() => setQty("midnight-bloom", "M", -3)}>set bloom M to -3</button>
      <button onClick={() => setQty("no-such-slug", "M", 9)}>set unknown to 9</button>
      <button onClick={() => remove("midnight-bloom", "M")}>remove bloom M</button>
      <button onClick={() => clear()}>clear</button>
    </div>
  );
}

function mount() {
  return render(
    <CartProvider>
      <Harness />
    </CartProvider>,
  );
}

const items = () => JSON.parse(screen.getByTestId("items").textContent ?? "[]") as CartItem[];
const count = () => Number(screen.getByTestId("count").textContent);

describe("CartProvider: loading", () => {
  it("starts empty and reports ready once storage has been read", () => {
    mount();
    expect(screen.getByTestId("ready")).toHaveTextContent("true");
    expect(items()).toEqual([]);
  });

  it("restores a saved cart", () => {
    seed([{ slug: "midnight-bloom", size: "L", qty: 2 }]);
    mount();
    expect(items()).toEqual([{ slug: "midnight-bloom", size: "L", qty: 2 }]);
    expect(count()).toBe(2);
  });

  it("falls back to empty when the stored value is corrupt JSON", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not json");
    mount();
    expect(items()).toEqual([]);
    expect(screen.getByTestId("ready")).toHaveTextContent("true");
  });

  it("falls back to empty when the stored value is not an array", () => {
    seed({ slug: "midnight-bloom" });
    mount();
    expect(items()).toEqual([]);
  });

  it("falls back to empty when the stored value is null", () => {
    seed(null);
    mount();
    expect(items()).toEqual([]);
  });

  it("stays usable when localStorage.getItem throws, as in private mode", () => {
    const spy = vi
      .spyOn(window.localStorage, "getItem")
      .mockImplementation(() => {
        throw new Error("blocked");
      });
    mount();
    expect(items()).toEqual([]);
    expect(screen.getByTestId("ready")).toHaveTextContent("true");
    spy.mockRestore();
  });

  it("does not overwrite storage before the saved cart has been read", () => {
    seed([{ slug: "midnight-bloom", size: "L", qty: 2 }]);
    mount();
    // The save effect must not have fired with the initial empty array.
    expect(stored()).toEqual([{ slug: "midnight-bloom", size: "L", qty: 2 }]);
  });
});

describe("CartProvider: add", () => {
  it("adds a new line at quantity one", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    expect(items()).toEqual([{ slug: "midnight-bloom", size: "M", qty: 1 }]);
    expect(count()).toBe(1);
  });

  it("increments the existing line instead of duplicating it", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("add bloom M"));
    expect(items()).toEqual([{ slug: "midnight-bloom", size: "M", qty: 3 }]);
    expect(count()).toBe(3);
  });

  it("keeps sizes of the same design as separate lines", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("add bloom L"));
    expect(items()).toEqual([
      { slug: "midnight-bloom", size: "M", qty: 1 },
      { slug: "midnight-bloom", size: "L", qty: 1 },
    ]);
    expect(count()).toBe(2);
  });

  it("keeps different designs in the same size as separate lines", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("add crane M"));
    expect(items()).toHaveLength(2);
    expect(count()).toBe(2);
  });

  it("appends new lines after existing ones", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("add crane M"));
    expect(items().map((i) => i.slug)).toEqual(["midnight-bloom", "whispering-crane-bird"]);
  });
});

describe("CartProvider: setQty", () => {
  it("sets the quantity of the matching line", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("set bloom M to 4"));
    expect(items()).toEqual([{ slug: "midnight-bloom", size: "M", qty: 4 }]);
    expect(count()).toBe(4);
  });

  it("clamps to one rather than removing the line, so the minus button cannot empty it", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("set bloom M to 0"));
    expect(items()).toEqual([{ slug: "midnight-bloom", size: "M", qty: 1 }]);
  });

  it("clamps negative quantities to one", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("set bloom M to -3"));
    expect(items()).toEqual([{ slug: "midnight-bloom", size: "M", qty: 1 }]);
  });

  it("leaves other lines untouched", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("add bloom L"));
    await user.click(screen.getByText("set bloom M to 4"));
    expect(items()).toEqual([
      { slug: "midnight-bloom", size: "M", qty: 4 },
      { slug: "midnight-bloom", size: "L", qty: 1 },
    ]);
  });

  it("is a no-op for a line that is not in the cart", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("set unknown to 9"));
    expect(items()).toEqual([{ slug: "midnight-bloom", size: "M", qty: 1 }]);
  });
});

describe("CartProvider: remove and clear", () => {
  it("removes only the matching design and size", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("add bloom L"));
    await user.click(screen.getByText("remove bloom M"));
    expect(items()).toEqual([{ slug: "midnight-bloom", size: "L", qty: 1 }]);
  });

  it("removes the whole line however many it held", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("set bloom M to 4"));
    await user.click(screen.getByText("remove bloom M"));
    expect(items()).toEqual([]);
    expect(count()).toBe(0);
  });

  it("empties the cart on clear", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("add crane M"));
    await user.click(screen.getByText("clear"));
    expect(items()).toEqual([]);
    expect(count()).toBe(0);
  });
});

describe("CartProvider: persistence", () => {
  it("writes the cart to storage so it survives a reload", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    expect(stored()).toEqual([{ slug: "midnight-bloom", size: "M", qty: 1 }]);
  });

  it("persists a cleared cart as an empty array, not a stale one", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    await user.click(screen.getByText("clear"));
    expect(stored()).toEqual([]);
  });

  it("keeps the cart for the visit when writing is blocked", async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    mount();
    await user.click(screen.getByText("add bloom M"));
    expect(count()).toBe(1);
    spy.mockRestore();
  });
});

describe("CartProvider: other tabs", () => {
  it("picks up a cart saved by another tab", () => {
    mount();
    seed([{ slug: "whispering-crane-bird", size: "S", qty: 5 }]);
    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
    });
    expect(items()).toEqual([{ slug: "whispering-crane-bird", size: "S", qty: 5 }]);
    expect(count()).toBe(5);
  });

  it("ignores storage events for unrelated keys", async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByText("add bloom M"));
    seed([{ slug: "whispering-crane-bird", size: "S", qty: 5 }]);
    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: "somethingElse" }));
    });
    expect(items()).toEqual([{ slug: "midnight-bloom", size: "M", qty: 1 }]);
  });

  it("stops listening once unmounted", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    mount().unmount();
    expect(remove).toHaveBeenCalledWith("storage", expect.any(Function));
    remove.mockRestore();
  });
});

describe("useCart", () => {
  it("throws a named error when used outside the provider", () => {
    const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Harness />)).toThrow(/useCart must be used inside/);
    quiet.mockRestore();
  });
});
