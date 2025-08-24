import { Icons } from "@/components/icons/icons";
import Image from "next/image";

import Logo from "@/../public/imagens/logo-cubos-light.svg";

function Header() {
  return (
    <header className="w-full h-20 flex align-center justify-center bg-mauve-dark-1 border-b border-[color:var(--mauve-dark-1)/0.5] ">
      <div className="max-w-[1920px] w-full p-4 mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="Not found" height={36} width={120} />

          <p className="font-bold text-xl text-[color:var(--mauve-dark-12)]">
            Movies
          </p>
        </div>
        <button className="cursor-pointer w-16 h-12 rounded-l-xs bg-[color:var(--purple-dark-alpha-2)]/20 flex justify-center items-center">
          <Icons size={28} name="MoonIcon" color="var(--mauve-dark-12)" />
        </button>
      </div>
    </header>
  );
}

export { Header };
