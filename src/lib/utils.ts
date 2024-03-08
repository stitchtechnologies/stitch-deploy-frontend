import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseEnvString(envString: string) {
  // make sure this isn't a buffer
  return envString.toString()
    // split on new line
    .split(/\r?\n|\r/)

    // filter comments
    .filter(line => /^[^#]/.test(line))

    // needs equal sign
    .filter(line => /=/i.test(line))

    // turn lines into plain object
    .reduce((memo: { [key: string]: string }, line) => {

      // pull out key/values (value can have spaces, remove quotes)
      const kv = line.match(/^([^=]+)=(.*)$/) as string[];
      const key = kv[1].trim()
      const val = kv[2].trim().replace(/['"]/g, '')

      memo[key] = val
      return memo

    }, {})
}