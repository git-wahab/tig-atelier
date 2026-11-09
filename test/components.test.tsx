import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CartButton from "@/components/cart/CartButton";
import CartView from "@/components/cart/CartView";
import ProductBuyPanel from "@/components/product/ProductBuyPanel";
import ContactForm from "@/components/sections/contact/ContactForm";
import FaqList from "@/components/sections/faq/FaqList";
import { CartProvider, type CartItem } from "@/lib/cart";
import { money, priceOf, sizes } from "@/lib/config";
import { getProduct, products } from "@/lib/products";
import { faqs } from "@/lib/faq";

const STORAGE_KEY = "hoodieCart";
const bloom = getProduct("midnight-bloom")!;
const crane = getProduct("whispering-crane-bird")!;

function seed(items: CartItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function withCart(ui: React.ReactNode) {
  return render(<CartProvider>{ui}</CartProvider>);
}

/**
 * The bag row for one line, found from its unique "colour · Size" text and walked
 * up to the row that owns that line's quantity buttons. Scoping to the row keeps a
 * line total from matching the identical subtotal or total in the summary aside.
 */
function bagLine(colour: string, size: string): HTMLElement {
  let el: HTMLElement | null = screen.getByText(`${colour} · Size ${size}`);
  while (el && !el.querySelector('[aria-label="Increase quantity"]')) {
    el = el.parentElement;
  }
  if (!el) throw new Error(`no bag row for ${colour} size ${size}`);
  return el;
}

beforeEach(() => {
  // CartView scrolls to the top on each step; jsdom has no implementation.
  window.scrollTo = vi.fn();
});

describe("ProductBuyPanel", () => {
  it("shows the design number, colour, name and price", () => {
    withCart(<ProductBuyPanel product={bloom} />);
    expect(screen.getByText(`${bloom.number} · ${bloom.colour}`)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: bloom.name })).toBeInTheDocument();
    expect(screen.getByText(money(priceOf(bloom.slug)))).toBeInTheDocument();
  });

  it("offers every configured size", () => {
    withCart(<ProductBuyPanel product={bloom} />);
    const group = screen.getByRole("group", { name: "Size" });
    for (const s of sizes) {
      expect(within(group).getByRole("button", { name: s })).toBeInTheDocument();
    }
  });

  it("starts on M, marked as pressed", () => {
    withCart(<ProductBuyPanel product={bloom} />);
    expect(screen.getByRole("button", { name: "M" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Selected: M")).toBeInTheDocument();
  });

  it("moves the pressed state when another size is picked", async () => {
    const user = userEvent.setup();
    withCart(<ProductBuyPanel product={bloom} />);
    await user.click(screen.getByRole("button", { name: "XL" }));
    expect(screen.getByRole("button", { name: "XL" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "M" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("Selected: XL")).toBeInTheDocument();
  });

  it("keeps exactly one size pressed", async () => {
    const user = userEvent.setup();
    withCart(<ProductBuyPanel product={bloom} />);
    await user.click(screen.getByRole("button", { name: "S" }));
    const group = screen.getByRole("group", { name: "Size" });
    const pressed = within(group)
      .getAllByRole("button")
      .filter((b) => b.getAttribute("aria-pressed") === "true");
    expect(pressed).toHaveLength(1);
  });

  it("adds the selected size to the cart and confirms it", async () => {
    const user = userEvent.setup();
    withCart(<ProductBuyPanel product={bloom} />);
    await user.click(screen.getByRole("button", { name: "L" }));
    await user.click(screen.getByRole("button", { name: "Add to bag" }));
    expect(screen.getByRole("button", { name: "Added to bag (L)" })).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)).toEqual([
      { slug: bloom.slug, size: "L", qty: 1 },
    ]);
  });

  it("reveals the cart link only after something is added", async () => {
    const user = userEvent.setup();
    withCart(<ProductBuyPanel product={bloom} />);
    expect(screen.queryByRole("link", { name: /view cart/i })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add to bag" }));
    expect(screen.getByRole("link", { name: /view cart/i })).toHaveAttribute("href", "/cart");
  });

  it("clears the confirmation when the size changes, so it cannot mislead", async () => {
    const user = userEvent.setup();
    withCart(<ProductBuyPanel product={bloom} />);
    await user.click(screen.getByRole("button", { name: "Add to bag" }));
    expect(screen.getByRole("button", { name: "Added to bag (M)" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "XS" }));
    expect(screen.getByRole("button", { name: "Add to bag" })).toBeInTheDocument();
  });

  it("adds a second size as its own line", async () => {
    const user = userEvent.setup();
    withCart(<ProductBuyPanel product={bloom} />);
    await user.click(screen.getByRole("button", { name: "Add to bag" }));
    await user.click(screen.getByRole("button", { name: "S" }));
    await user.click(screen.getByRole("button", { name: "Add to bag" }));
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)).toEqual([
      { slug: bloom.slug, size: "M", qty: 1 },
      { slug: bloom.slug, size: "S", qty: 1 },
    ]);
  });

  it("shows the product's own thread note in the spec rows", () => {
    withCart(<ProductBuyPanel product={bloom} />);
    expect(screen.getByText(bloom.threadNote)).toBeInTheDocument();
  });
});

describe("CartButton", () => {
  it("shows zero and an accessible label when the cart is empty", () => {
    withCart(<CartButton />);
    expect(screen.getByRole("button", { name: "Cart, 0 items" })).toBeInTheDocument();
  });

  it("uses the singular for one item", () => {
    seed([{ slug: bloom.slug, size: "M", qty: 1 }]);
    withCart(<CartButton />);
    expect(screen.getByRole("button", { name: "Cart, 1 item" })).toBeInTheDocument();
  });

  it("counts quantities, not lines", () => {
    seed([
      { slug: bloom.slug, size: "M", qty: 2 },
      { slug: crane.slug, size: "L", qty: 3 },
    ]);
    withCart(<CartButton />);
    expect(screen.getByRole("button", { name: "Cart, 5 items" })).toBeInTheDocument();
  });

  it("starts collapsed", () => {
    withCart(<CartButton />);
    expect(screen.getByRole("button", { name: /^Cart,/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("opens when activated from the keyboard", async () => {
    const user = userEvent.setup();
    withCart(<CartButton />);
    const trigger = screen.getByRole("button", { name: /^Cart,/ });
    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens on hover and closes when the pointer leaves", async () => {
    const user = userEvent.setup();
    withCart(<CartButton />);
    const trigger = screen.getByRole("button", { name: /^Cart,/ });
    await user.hover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.unhover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  // A click arrives with the pointer already over the cart, so hovering has
  // opened the panel first. The click must not read as a dismiss.
  it("stays open when clicked while already open from hover", async () => {
    const user = userEvent.setup();
    withCart(<CartButton />);
    const trigger = screen.getByRole("button", { name: /^Cart,/ });
    await user.hover(trigger);
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("keeps a clicked panel open after the pointer leaves", async () => {
    const user = userEvent.setup();
    withCart(<CartButton />);
    const trigger = screen.getByRole("button", { name: /^Cart,/ });
    await user.click(trigger);
    await user.unhover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes a clicked panel on a second click", async () => {
    const user = userEvent.setup();
    withCart(<CartButton />);
    const trigger = screen.getByRole("button", { name: /^Cart,/ });
    await user.click(trigger);
    await user.click(trigger);
    await user.unhover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes a clicked panel on Escape", async () => {
    const user = userEvent.setup();
    withCart(<CartButton />);
    const trigger = screen.getByRole("button", { name: /^Cart,/ });
    await user.click(trigger);
    await user.unhover(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes a clicked panel when something else is clicked", async () => {
    const user = userEvent.setup();
    withCart(
      <>
        <CartButton />
        <button type="button">Somewhere else</button>
      </>,
    );
    const trigger = screen.getByRole("button", { name: /^Cart,/ });
    await user.click(trigger);
    await user.unhover(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.click(screen.getByRole("button", { name: "Somewhere else" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes a clicked panel once focus leaves the cart", async () => {
    const user = userEvent.setup();
    withCart(
      <>
        <CartButton />
        <button type="button">Somewhere else</button>
      </>,
    );
    const trigger = screen.getByRole("button", { name: /^Cart,/ });
    await user.tab();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    // Tab moves on through the panel's own link before leaving the cart.
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Somewhere else" })).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps the panel open while focus moves inside it", async () => {
    const user = userEvent.setup();
    withCart(<CartButton />);
    const trigger = screen.getByRole("button", { name: /^Cart,/ });
    await user.tab();
    await user.keyboard("{Enter}");
    await user.tab();
    expect(screen.getByRole("link", { name: /view cart and checkout/i })).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("explains the empty cart in the dropdown", async () => {
    const user = userEvent.setup();
    withCart(<CartButton />);
    await user.hover(screen.getByRole("button", { name: /^Cart,/ }));
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("lists each line with its size and quantity", async () => {
    const user = userEvent.setup();
    seed([{ slug: bloom.slug, size: "L", qty: 3 }]);
    withCart(<CartButton />);
    await user.hover(screen.getByRole("button", { name: /^Cart,/ }));
    expect(screen.getByText(bloom.name)).toBeInTheDocument();
    expect(screen.getByText("Size L")).toBeInTheDocument();
    expect(screen.getByText("× 3")).toBeInTheDocument();
  });

  it("drops a stored line whose design no longer exists", async () => {
    const user = userEvent.setup();
    seed([
      { slug: "discontinued-design", size: "M", qty: 1 },
      { slug: bloom.slug, size: "M", qty: 1 },
    ]);
    withCart(<CartButton />);
    await user.hover(screen.getByRole("button", { name: /^Cart,/ }));
    expect(screen.getByText(bloom.name)).toBeInTheDocument();
    expect(screen.queryByText(/discontinued/i)).not.toBeInTheDocument();
  });

  it("links through to the cart page", async () => {
    const user = userEvent.setup();
    withCart(<CartButton />);
    await user.hover(screen.getByRole("button", { name: /^Cart,/ }));
    expect(screen.getByRole("link", { name: /view cart and checkout/i })).toHaveAttribute(
      "href",
      "/cart",
    );
  });
});

describe("CartView: empty bag", () => {
  it("invites the shopper to pick a design, with a link per product", () => {
    withCart(<CartView />);
    expect(screen.getByRole("heading", { name: /nothing here yet/i })).toBeInTheDocument();
    for (const p of products) {
      expect(screen.getByRole("link", { name: p.name })).toHaveAttribute(
        "href",
        `/products/${p.slug}`,
      );
    }
  });

  it("offers no way to continue to delivery", () => {
    withCart(<CartView />);
    expect(screen.queryByRole("button", { name: /continue to delivery/i })).not.toBeInTheDocument();
  });

  it("marks the bag as the current step", () => {
    withCart(<CartView />);
    const steps = screen.getByRole("list", { name: "Checkout steps" });
    const current = within(steps)
      .getAllByRole("listitem")
      .filter((li) => li.getAttribute("aria-current") === "step");
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent("Bag");
  });
});

describe("CartView: totals", () => {
  it("multiplies the unit price by the quantity on each line", () => {
    seed([
      { slug: bloom.slug, size: "M", qty: 3 },
      { slug: crane.slug, size: "L", qty: 1 },
    ]);
    withCart(<CartView />);
    const bloomRow = bagLine(bloom.colour, "M");
    expect(within(bloomRow).getByText(`${money(priceOf(bloom.slug))} each`)).toBeInTheDocument();
    expect(within(bloomRow).getByText(money(priceOf(bloom.slug) * 3))).toBeInTheDocument();

    const craneRow = bagLine(crane.colour, "L");
    expect(within(craneRow).getByText(money(priceOf(crane.slug)))).toBeInTheDocument();
  });

  it("sums the subtotal across lines", () => {
    seed([
      { slug: bloom.slug, size: "M", qty: 2 },
      { slug: crane.slug, size: "L", qty: 1 },
    ]);
    withCart(<CartView />);
    const expected = money(priceOf(bloom.slug) * 2 + priceOf(crane.slug));
    // Shown twice: once as Subtotal, once as Total.
    expect(screen.getAllByText(expected).length).toBeGreaterThanOrEqual(2);
  });

  it("counts total items, not lines", () => {
    seed([
      { slug: bloom.slug, size: "M", qty: 2 },
      { slug: crane.slug, size: "L", qty: 3 },
    ]);
    withCart(<CartView />);
    const summary = screen.getByRole("complementary");
    expect(within(summary).getByText("Items").nextElementSibling).toHaveTextContent("5");
  });

  it("skips a stored line whose design no longer exists", () => {
    seed([
      { slug: "discontinued-design", size: "M", qty: 4 },
      { slug: bloom.slug, size: "M", qty: 1 },
    ]);
    withCart(<CartView />);
    // The removed line must not reach the total.
    const summary = screen.getByRole("complementary");
    expect(within(summary).getByText("Items").nextElementSibling).toHaveTextContent("1");
  });

  it("shows the empty state when every stored line is unknown", () => {
    seed([{ slug: "discontinued-design", size: "M", qty: 4 }]);
    withCart(<CartView />);
    expect(screen.getByRole("heading", { name: /nothing here yet/i })).toBeInTheDocument();
  });
});

describe("CartView: editing the bag", () => {
  it("increases the quantity and the line total together", async () => {
    const user = userEvent.setup();
    seed([{ slug: bloom.slug, size: "M", qty: 1 }]);
    withCart(<CartView />);
    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    const row = bagLine(bloom.colour, "M");
    expect(within(row).getByText("2")).toBeInTheDocument();
    expect(within(row).getByText(money(priceOf(bloom.slug) * 2))).toBeInTheDocument();
  });

  it("decreases the quantity", async () => {
    const user = userEvent.setup();
    seed([{ slug: bloom.slug, size: "M", qty: 3 }]);
    withCart(<CartView />);
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    const row = bagLine(bloom.colour, "M");
    expect(within(row).getByText("2")).toBeInTheDocument();
    expect(within(row).getByText(money(priceOf(bloom.slug) * 2))).toBeInTheDocument();
  });

  it("will not take a line below one", async () => {
    const user = userEvent.setup();
    seed([{ slug: bloom.slug, size: "M", qty: 1 }]);
    withCart(<CartView />);
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    const row = bagLine(bloom.colour, "M");
    expect(within(row).getByText("1")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /nothing here yet/i })).not.toBeInTheDocument();
  });

  it("removes a line and falls back to the empty state", async () => {
    const user = userEvent.setup();
    seed([{ slug: bloom.slug, size: "M", qty: 2 }]);
    withCart(<CartView />);
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(screen.getByRole("heading", { name: /nothing here yet/i })).toBeInTheDocument();
  });

  it("removes only the line whose button was pressed", async () => {
    const user = userEvent.setup();
    seed([
      { slug: bloom.slug, size: "M", qty: 1 },
      { slug: crane.slug, size: "L", qty: 1 },
    ]);
    withCart(<CartView />);
    await user.click(screen.getAllByRole("button", { name: "Remove" })[0]);
    expect(screen.queryByText(bloom.name)).not.toBeInTheDocument();
    expect(screen.getByText(crane.name)).toBeInTheDocument();
  });

  it("shows the size and colour on each line", () => {
    seed([{ slug: bloom.slug, size: "XL", qty: 1 }]);
    withCart(<CartView />);
    expect(screen.getByText(`${bloom.colour} · Size XL`)).toBeInTheDocument();
  });
});

describe("CartView: checkout", () => {
  async function toCheckout() {
    const user = userEvent.setup();
    seed([{ slug: bloom.slug, size: "M", qty: 2 }]);
    withCart(<CartView />);
    await user.click(screen.getByRole("button", { name: /continue to delivery/i }));
    return user;
  }

  it("moves to the delivery step and marks it current", async () => {
    await toCheckout();
    const steps = screen.getByRole("list", { name: "Checkout steps" });
    const current = within(steps)
      .getAllByRole("listitem")
      .filter((li) => li.getAttribute("aria-current") === "step");
    expect(current[0]).toHaveTextContent("Delivery");
  });

  it("scrolls back to the top on the step change", async () => {
    await toCheckout();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
  });

  it("asks for contact and delivery details", async () => {
    await toCheckout();
    for (const label of ["Email", "First name", "Last name", "Address", "City", "Phone"]) {
      expect(screen.getByLabelText(label)).toBeRequired();
    }
    expect(screen.getByLabelText("Postal code")).not.toBeRequired();
  });

  it("carries the total into the place-order button", async () => {
    await toCheckout();
    const total = money(priceOf(bloom.slug) * 2);
    expect(screen.getByRole("button", { name: `Place order · ${total}` })).toBeInTheDocument();
  });

  it("goes back to the bag without losing the cart", async () => {
    const user = await toCheckout();
    await user.click(screen.getByRole("button", { name: /back to bag/i }));
    expect(screen.getByText(bloom.name)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue to delivery/i })).toBeInTheDocument();
  });

  it("does not place the order while required fields are empty", async () => {
    const user = await toCheckout();
    await user.click(screen.getByRole("button", { name: /place order/i }));
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
  });
});

describe("CartView: order placed", () => {
  async function placeOrder() {
    const user = userEvent.setup();
    seed([
      { slug: bloom.slug, size: "M", qty: 2 },
      { slug: crane.slug, size: "L", qty: 1 },
    ]);
    withCart(<CartView />);
    await user.click(screen.getByRole("button", { name: /continue to delivery/i }));
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("First name"), "Ada");
    await user.type(screen.getByLabelText("Last name"), "Lovelace");
    await user.type(screen.getByLabelText("Address"), "1 Analytical Way");
    await user.type(screen.getByLabelText("City"), "London");
    await user.type(screen.getByLabelText("Phone"), "0123456789");
    await user.click(screen.getByRole("button", { name: /place order/i }));
    return user;
  }

  it("confirms the order", async () => {
    await placeOrder();
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    const steps = screen.getByRole("list", { name: "Checkout steps" });
    const current = within(steps)
      .getAllByRole("listitem")
      .filter((li) => li.getAttribute("aria-current") === "step");
    expect(current[0]).toHaveTextContent("Done");
  });

  it("still shows what was ordered and the total it was placed at", async () => {
    await placeOrder();
    expect(screen.getByText(bloom.name)).toBeInTheDocument();
    expect(screen.getByText("Size M · × 2")).toBeInTheDocument();
    expect(screen.getByText(crane.name)).toBeInTheDocument();
    expect(screen.getByText("Size L · × 1")).toBeInTheDocument();
    // Each line amount, and the order total, are all distinct here.
    expect(screen.getByText(money(priceOf(bloom.slug) * 2))).toBeInTheDocument();
    expect(screen.getByText(money(priceOf(crane.slug)))).toBeInTheDocument();
    expect(
      screen.getByText(money(priceOf(bloom.slug) * 2 + priceOf(crane.slug))),
    ).toBeInTheDocument();
  });

  it("empties the cart, so a reload cannot reorder", async () => {
    await placeOrder();
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)).toEqual([]);
  });

  it("offers a way onward from the confirmation", async () => {
    await placeOrder();
    expect(screen.getByRole("link", { name: /back to the collection/i })).toHaveAttribute(
      "href",
      "/collection",
    );
    expect(screen.getByRole("link", { name: /contact us/i })).toHaveAttribute("href", "/contact");
  });
});

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function stubFetch(impl: () => Promise<unknown>) {
    const fetchMock = vi.fn(impl as never);
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  }

  async function fill(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Which size fits?");
  }

  it("requires a name, an email and a message", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("Message")).toBeRequired();
    expect(screen.getByLabelText(/order number/i)).not.toBeRequired();
  });

  it("defaults the topic to an order", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Topic")).toHaveValue("An order");
  });

  it("posts the form fields as JSON to the contact endpoint", async () => {
    const user = userEvent.setup();
    const fetchMock = stubFetch(async () => ({ ok: true }));
    render(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ "Content-Type": "application/json" });
    expect(JSON.parse(init.body as string)).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      topic: "An order",
      order: "",
      message: "Which size fits?",
    });
  });

  it("thanks the sender on success", async () => {
    const user = userEvent.setup();
    stubFetch(async () => ({ ok: true }));
    render(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    expect(screen.getByText(/message received/i)).toBeInTheDocument();
  });

  it("offers a blank form again after a successful send", async () => {
    const user = userEvent.setup();
    stubFetch(async () => ({ ok: true }));
    render(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await user.click(screen.getByRole("button", { name: /send another message/i }));
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("reports an error when the endpoint rejects the message", async () => {
    const user = userEvent.setup();
    stubFetch(async () => ({ ok: false }));
    render(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/something went wrong/i);
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
  });

  it("reports an error when the request itself fails", async () => {
    const user = userEvent.setup();
    stubFetch(async () => {
      throw new Error("offline");
    });
    render(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("keeps what was typed when the send fails, so it can be retried", async () => {
    const user = userEvent.setup();
    stubFetch(async () => ({ ok: false }));
    render(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByLabelText("Name")).toHaveValue("Ada Lovelace");
    expect(screen.getByLabelText("Message")).toHaveValue("Which size fits?");
  });

  it("disables the button and says so while sending", async () => {
    const user = userEvent.setup();
    let release: (v: unknown) => void = () => {};
    stubFetch(() => new Promise((r) => (release = r)));
    render(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();

    // Let the request finish so the state settles inside the test.
    await act(async () => {
      release({ ok: true });
    });
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  });

  it("does not submit when required fields are blank", async () => {
    const user = userEvent.setup();
    const fetchMock = stubFetch(async () => ({ ok: true }));
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("FaqList", () => {
  it("opens the first question on mount and leaves the rest closed", () => {
    render(<FaqList />);
    const buttons = screen.getAllByRole("button", { expanded: true });
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent(faqs[0].q);
  });

  it("renders every question", () => {
    render(<FaqList />);
    for (const f of faqs) {
      expect(screen.getByRole("button", { name: new RegExp(f.q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })).toBeInTheDocument();
    }
  });

  it("shows the first answer and hides the others", () => {
    render(<FaqList />);
    expect(screen.getByText(faqs[0].a)).toBeVisible();
    const closed = faqs.find((f) => f.id !== faqs[0].id)!;
    expect(screen.getByText(closed.a)).not.toBeVisible();
  });

  it("opens the question that was clicked", async () => {
    const user = userEvent.setup();
    render(<FaqList />);
    const target = faqs[2];
    await user.click(screen.getByText(target.q));
    expect(screen.getByText(target.a)).toBeVisible();
  });

  it("keeps only one answer open at a time", async () => {
    const user = userEvent.setup();
    render(<FaqList />);
    await user.click(screen.getByText(faqs[2].q));
    expect(screen.getAllByRole("button", { expanded: true })).toHaveLength(1);
    expect(screen.getByText(faqs[0].a)).not.toBeVisible();
  });

  it("closes the open question when it is clicked again", async () => {
    const user = userEvent.setup();
    render(<FaqList />);
    await user.click(screen.getByText(faqs[0].q));
    expect(screen.queryAllByRole("button", { expanded: true })).toHaveLength(0);
    expect(screen.getByText(faqs[0].a)).not.toBeVisible();
  });

  it("points each button at the panel it controls", () => {
    render(<FaqList />);
    for (const f of faqs) {
      const panel = document.getElementById(`${f.id}-panel`);
      expect(panel, `no panel for ${f.id}`).not.toBeNull();
      expect(panel).toHaveTextContent(f.a);
    }
  });

  it("shows each group heading once", () => {
    render(<FaqList />);
    const groups = [...new Set(faqs.map((f) => f.group))];
    for (const g of groups) {
      expect(screen.getAllByText(g)).toHaveLength(1);
    }
  });

  it("swaps the plus for a minus on the open question", async () => {
    const user = userEvent.setup();
    render(<FaqList />);
    expect(screen.getAllByText("–")).toHaveLength(1);
    await user.click(screen.getByText(faqs[0].q));
    expect(screen.queryAllByText("–")).toHaveLength(0);
    expect(screen.getAllByText("+")).toHaveLength(faqs.length);
  });
});
