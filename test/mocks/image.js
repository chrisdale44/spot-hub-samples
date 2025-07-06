import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props) => <img {...props} />, // Bypass Next.js image optimization
}));
