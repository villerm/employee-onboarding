import { useScreen, useGrid } from "vue-screen";

/**
 * Returns
 */
const useLayout = () => {
  return {
    screen: useScreen(),
    grid: useGrid({
      mobile: 0, // 0 - 599
      tablet: 600, // 600 - 834
      desktop: 835, // 835 - 1440. and up
    }),
  };
};

export default useLayout;
