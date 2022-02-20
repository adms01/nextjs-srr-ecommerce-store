import Layout from "../components/Layout";
import styled from "styled-components";
import { getProductsByPage } from "../utils/api";
import { ProductsResponse } from "../types";
import { Pagination } from "../components/Pagination";
import { ProductCard } from "../components/ProductCard";

type Props = {
  products: ProductsResponse;
};

export async function getServerSideProps({ query: { page = 1 } }) {
  const products: ProductsResponse = await getProductsByPage(page);
  return { props: { products } };
}

const HomePage = ({ products }: Props) => {
  return (
    <Layout>
      {products && (
        <S.Homepage>
          <S.ProductGrid>
            {products.results.map((x) => (
              <ProductCard
                key={x.gtin}
                gtin={x.gtin}
                name={x.name}
                recommendedRetailPrice={x.recommendedRetailPrice}
                recommendedRetailPriceCurrency={x.recommendedRetailPriceCurrency}
                imageUrl={x.imageUrl}
                brandName={x.brandName}
                categoryName={x.categoryName}
              />
            ))}
          </S.ProductGrid>

          <S.PaginationContainer>
            <Pagination count={products.count} />
          </S.PaginationContainer>
        </S.Homepage>
      )}
    </Layout>
  );
};

export default HomePage;

const S: any = {};

S.Homepage = styled.div``;

S.ProductGrid = styled.div`
  margin: 20px 0 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

S.PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;
