import { useState, useEffect } from 'react';

export default function useDevice() {
    const getIsMobile = () => window.innerWidth < 768
    const getIsTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;
    const getIsDesktop = () => window.innerWidth >= 1024;

    const [isMobile, setIsMobile] = useState(getIsMobile());
    const [isTablet, setIsTablet] = useState(getIsTablet());
    const [isDesktop, setIsDesktop] = useState(getIsDesktop());

    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile());
            setIsTablet(getIsTablet());
            setIsDesktop(getIsDesktop());
        }

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [isMobile, isTablet, isDesktop]);
    ;

    return [isMobile, isTablet, isDesktop]
}
