import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// next/image renders a plain <img> so tests can assert on src and alt.
vi.mock("next/image", () => ({
  default: ({ src, alt, ...rest }: Record<string, unknown>) => {
    const { width, height, style, className } = rest as Record<string, unknown>;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src as string} alt={alt as string} width={width as number} height={height as number} style={style as object} className={className as string} />;
  },
}));

// next/link renders a plain <a> so href assertions work without a router.
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: Record<string, unknown> & { children: React.ReactNode }) => (
    <a href={href as string} {...(rest as object)}>
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
