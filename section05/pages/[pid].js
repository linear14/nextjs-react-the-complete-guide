import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  return (
    <>
      <h1>{loadedProduct.title}</h1>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { pid } = params;

  const pathName = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(pathName);
  const data = JSON.parse(jsonData);

  const product = data.products.find((item) => item.id === pid);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}

export default ProductDetailPage;
