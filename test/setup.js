import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { cleanup, screen } from "@testing-library/react";

// Global Mock NextJS Router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: "/",
  }),
}));

// Reset DOM after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks(); // Reset all mocks
});

// Add debug to window object so it doesn't need to be imported in every test
window.debug = () => screen.debug();
