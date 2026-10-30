import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("Waneesi Official App Routing", () => {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
  });

  const officialRoutes = [
    "/",
    "/features",
    "/for-professionals",
    "/privacy-policy",
    "/terms-and-conditions",
    "/community-guidelines",
    "/child-safety",
    "/delete-account",
    "/contact",
  ];

  officialRoutes.forEach((path) => {
    it(`matches page route correctly for "${path}"`, () => {
      const matches = router.matchRoutes(path);
      expect(matches.length).toBeGreaterThan(0);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    });
  });
});
