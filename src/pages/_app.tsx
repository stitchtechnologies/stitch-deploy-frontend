import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { Inter, Roboto_Mono } from "next/font/google"
import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${robotoMono.variable} font-inter`}>
      <ClerkProvider {...pageProps}>
        <PostHogProvider client={posthog}>
          <Component {...pageProps} />
        </PostHogProvider>
      </ClerkProvider>
    </main>
  )
}
