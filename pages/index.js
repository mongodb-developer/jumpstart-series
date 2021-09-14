import Head from "next/head";
import clientPromise from "../lib/mongodb";
import Category from "../components/Category";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import Products from "../components/Products";

import "tailwindcss/tailwind.css";

export default function Home({ isConnected, products }) {
  return (
    <>
      {isConnected && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="bg-white w-full min-h-screen">
            <Header />
            <Container>
              <Hero />
              <Category
                category="Tech Wear"
                categoryCount={`${products.length} Products`}
              />
              <Products products={products} />
              <Pagination />
            </Container>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const isConnected = await client.isConnected();
  const db = client.db("store");
  const collection = db.collection("products");
  const products = await collection.find({}).toArray();

  return {
    props: {
      isConnected,
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
