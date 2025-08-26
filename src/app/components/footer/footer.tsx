"use client";
import { Typography } from "@/components/typography";

function Footer(className: string | undefined | object) {
  return (
    <footer
      className={`w-full h-16 flex align-center justify-center items-center bg-mauve-12 dark:bg-mauve-1 border-b border-mauve-dark-11)/0.5 ${
        className || ""
      }`}
    >
      <Typography
        text={"2023 © Todos os direitos reservados a Cubos Movies"}
        variant="p"
        className="text-mauve-dark-11 dark:text-mauve-dark-4 mr-1"
      />
      <Typography
        text={"Cubos Movies"}
        variant="strong"
        className="text-mauve-dark-11  dark:text-mauve-dark-3"
      />
    </footer>
  );
}

export { Footer };
