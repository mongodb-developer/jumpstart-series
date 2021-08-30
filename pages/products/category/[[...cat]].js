import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import Category from "../../../components/Category";
import Container from "../../../components/Container";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Pagination from "../../../components/Pagination";
import Products from "../../../components/Products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { query } = useRouter();

  useEffect(async () => {
    // add your Realm App Id to the .env.local file
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      let getProducts;
      if (query.cat) {
        getProducts = await user.functions.getCategory(query.cat);
        setCategoryName(() => query.cat);
      } else {
        getProducts = await user.functions.getAllProducts();
        setCategoryName(() => "All Products");
      }
      setProducts(() => getProducts);
      const uniqueCategories = await user.functions.getUniqueCategories();
      setCategories(() => uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white w-full min-h-screen">
        <Header />
        <Container>
          <Category
            category={categoryName}
            categories={categories}
            productCount={`${products.length} Products`}
          />
          <Products products={products} />
          <Pagination />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
