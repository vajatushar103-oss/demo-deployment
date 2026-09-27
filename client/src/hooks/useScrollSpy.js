import { useEffect, useState } from 'react';

// export function useScrollSpy(ids) {
//   const [activeId, setActiveId] = useState(ids[0] || '');

//   useEffect(() => {
//     const onScroll = () => {
//       const y = window.scrollY;
//       let current = ids[0] || '';

//       ids.forEach((id) => {
//         const section = document.getElementById(id);
//         if (section && y >= section.offsetTop - 150) current = id;
//       });

//       setActiveId(current);
//     };

//     window.addEventListener('scroll', onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener('scroll', onScroll);
//   }, [ids]);

//   return activeId;
// }


export function useScrollSpy(sectionIds, offset = 150) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      let current = "home";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (!section) return;

        const sectionTop = section.offsetTop;

        if (y >= sectionTop - offset) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}