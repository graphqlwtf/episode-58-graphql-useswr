import Link from "next/link";
import useSWR from "swr";

import { GetCartById } from "../lib/graphql";
import { client } from "../lib/client";
import { cartId } from "../lib/constants";

export const Header = () => {
  const { data, error } = useSWR([
    GetCartById,
    {
      id: cartId,
    },
  ]);

  const loading = !error && !data;

  return (
    <header className="bg-gray-100 px-6 py-3 rounded-md flex items-center justify-between">
      <h1 className="text-lg text-gray-800">
        <Link href="/">
          <a>GraphQL Goodies</a>
        </Link>
      </h1>

      <Link href="/cart">
        <a>{loading ? "" : <>Total: {data?.cart?.subTotal?.formatted}</>}</a>
      </Link>
    </header>
  );
};
