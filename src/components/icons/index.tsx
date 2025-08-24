// components/icons/index.ts
import { ArrowDownIcon } from "./arrowDown";
import { ArrowLeftIcon } from "./arrowLeft";
import { ArrowUpIcon } from "./arrownUp";
import { ArrowRightIcon } from "./arrowRight";
import { FilterIcon } from "./filter";
import { MoonIcon } from "./moon";
import { SearchIcon } from "./search";
import { SunIcon } from "./sun";
import { CloseIcon } from "./close";

export const LetsIcons = {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  FilterIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  CloseIcon,
};

export type LetsIconNames = keyof typeof LetsIcons;
