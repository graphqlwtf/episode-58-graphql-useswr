import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import products from "../data/products.json";

export const getStaticProps = async () => {
  return {
    props: {
      products,
    },
  };
};

const Home: NextPage = ({ products }) => {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {products.map(({ id, slug, name, image, price }) => (
        <li
          key={id}
          className="rounded-md shadow p-6 flex items-center flex-col transform hover:-translate-y-1 transition hover:shadow-lg group"
        >
          <Link href={`/products/${slug}`}>
            <a className="space-y-6">
              {image && (
                <Image
                  src={`/images/${image}`}
                  width={400}
                  height={400}
                  className="block"
                  alt={name}
                />
              )}
              <div className="text-center flex items-center justify-between">
                <p className="text-gray-500 group-hover:text-black transition">
                  {name}
                </p>
                <p className="text-gray-800">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(price / 100)}
                </p>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Home;
