import "../styles/globals.css";

import { SWRConfig } from "swr";
import type { AppProps } from "next/app";

import { Header } from "../components/header";
import { client } from "../lib/client";

const fetcher = (query, variables) => client.request(query, variables);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <div className="max-w-3xl mx-auto p-6">
        <Header />
        <main className="pt-12">
          <Component {...pageProps} />
        </main>
      </div>
    </SWRConfig>
  );
}

export default MyApp;
