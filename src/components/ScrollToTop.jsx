import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll on route change
    window.scrollTo(0, 0);
    
    // Fallback for same-page clicks or complex navigation
    const handleScroll = () => window.scrollTo(0, 0);
    window.addEventListener('popstate', handleScroll);
    
    return () => window.removeEventListener('popstate', handleScroll);
  }, [pathname]);

  return null;
}
