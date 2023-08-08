import type { Router } from "vue-router";

/**
 * To use router outside component and avoid dependency cycle
 * https://forum.vuejs.org/t/how-i-avoid-circular-dependencies-between-router-and-store/127604
 */
function closeOverRouter() {
  let router: Router;
  return {
    getRouter() {
      return router;
    },
    setRouter(r: Router) {
      router = r;
    },
  };
}

export const { getRouter, setRouter } = closeOverRouter();

export default getRouter;
