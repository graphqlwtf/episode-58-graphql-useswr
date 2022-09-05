import { GetStaticProps } from "next";
import Image from "next/image";
import { mutate } from "swr";

import products from "../../data/products.json";
import { client } from "../../lib/client";
import { cartId } from "../../lib/constants";
import { AddToCart, GetCartById } from "../../lib/graphql";

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { slug } = params;

  const product = products.find((p) => p.slug === slug);

  return {
    props: {
      product,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: products.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default function ProductPage({ product }) {
  const { id, name, price, image } = product;

  const addItem = async () => {
    mutate(
      [GetCartById, { id: cartId }],
      async () => {
        const { addItem } = await client.request(AddToCart, {
          input: {
            cartId,
            id,
            name,
            price,
            images: [image],
          },
        });

        return {
          cart: addItem,
        };
      },
      false
    );
  };

  return (
    <div className="space-y-3">
      <Image src={`/images/${image}`} width={300} height={300} alt={name} />

      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-xl font-mono">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "usd",
        }).format(price / 100)}
      </p>

      <button
        onClick={addItem}
        className="bg-pink-500 text-white font-medium rounded-md px-3 py-2.5"
      >
        Add to Cart
      </button>
    </div>
  );
}
