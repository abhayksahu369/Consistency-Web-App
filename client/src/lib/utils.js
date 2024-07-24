import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const changeDateFormat=(date)=>{
  return date.split("-")[2]+"-"+date.split("-")[1]+"-"+date.split("-")[0];

}