import Image from "next/image";
import useSWR, { mutate } from "swr";

import { GetCartById, RemoveFromCart } from "../lib/graphql";
import { cartId } from "../lib/constants";
import { client } from "../lib/client";

export default function CartPage() {
  const { data, error } = useSWR([
    GetCartById,
    {
      id: cartId,
    },
  ]);

  const loading = !error && !data;

  const removeItem = async (id) => {
    mutate(
      [
        GetCartById,
        {
          id: cartId,
        },
      ],
      async () => {
        const { removeItem } = await client.request(RemoveFromCart, {
          input: {
            cartId,
            id,
          },
        });

        return {
          cart: removeItem,
        };
      },
      false
    );
  };

  if (loading) return <p>Loading!</p>;

  return (
    <ul className="space-y-3 divide-y divide-gray-200">
      {data?.cart?.items?.map(({ id, name, images, lineTotal }) => (
        <li key={id} className="flex items-center space-x-6 py-3">
          <div className="w-32 h-32 flex items-center justify-center">
            <Image
              src={`/images/${images[0]}`}
              width={400}
              height={400}
              className="block"
              alt={name}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="space-y-3">
              <p className="text-gray-500">{name}</p>
              <p className="text-gray-800">{lineTotal.formatted}</p>
            </div>

            <div>
              <button
                onClick={() => removeItem(id)}
                className="bg-red-500 text-white font-medium rounded-md px-3 py-2.5"
              >
                &times; Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
