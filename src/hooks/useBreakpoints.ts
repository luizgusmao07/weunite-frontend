import { useMediaQuery } from "./useMediaQuery";

export function useBreakpoints() {

    const isMobile = useMediaQuery("(max-width: 480px)");
    const isTablet = useMediaQuery("(min-width: 481px) and (max-width: 768px)");
    const isSmallDesktop = useMediaQuery("(min-width: 769px) and (max-width: 900px)");
    const isDesktop = useMediaQuery("(min-width: 901px)");

    const maxLeftSideBar = useMediaQuery("(max-width: 840px)");

    return { isMobile, isTablet, isSmallDesktop, isDesktop, maxLeftSideBar};
}