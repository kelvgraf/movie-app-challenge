"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

import { Icons } from "@/components/icons/icons";
import LogoLight from "@/../public/imagens/logo-cubos-light.svg";
import LogoDark from "@/../public/imagens/logo-cubos-dark.svg";
import { Typography } from "@/components/typography/typography";

function Header(className: object | string | undefined) {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={`w-full h-20 flex align-center justify-center bg-mauve-12 dark:bg-mauve-1 border-b border-mauve-dark-11)/0.5 ${
        className || ""
      }`}
    >
      <div className="max-w-[1920px] w-full p-4 mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={theme === "light" ? LogoLight : LogoDark}
            alt="Not found"
            height={36}
            width={120}
          />

          <Typography
            text={"Movies"}
            variant={"p"}
            className="font-bold text-xl text-mauve-dark-12 dark:text-mauve-dark-3"
          />
        </div>
        <button
          className="cursor-pointer w-16 h-12 rounded-l-xs bg-purple-dark-alpha-2/20 dark:bg-mauve-dark-8 flex justify-center items-center"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Icons
            size={28}
            name={theme === "dark" ? "MoonIcon" : "SunIcon"}
            color="-mauve-dark-12"
          />
        </button>
      </div>
    </header>
  );
}

export { Header };
