import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {

  const [theme, setTheme] = useState("dark");

  useEffect(() => {

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [theme]);

  return (

    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="p-2 rounded-lg bg-gray-800 dark:bg-white text-white dark:text-black"
    >

      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}

    </button>

  );

};

export default ThemeToggle;