import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This function merges Tailwind classes with potential conditional classes using clsx
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}