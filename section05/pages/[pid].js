import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
    </>
  );
}

async function getData() {
  const pathName = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(pathName);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const { pid } = params;

  const data = await getData();
  const product = data.products.find((item) => item.id === pid);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((item) => item.id);
  const pathWithParams = ids.map((id) => ({ params: { pid: `${id}` } }));

  return {
    paths: pathWithParams,
    fallback: false,
  };
}

export default ProductDetailPage;
