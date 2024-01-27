import { useEffect, useRef, useState } from "react";

// Custom hook to handle toggling state when clicking outside a specified ref
const useClickOutsideToggle = () => {
  // State to manage the expanded (toggled) state
  const [expanded, setExpanded] = useState(false);
  
  // Ref to store the reference to the element that triggers the toggle
  const ref = useRef(null);

  useEffect(() => {
    // Function to handle click outside the specified ref
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;