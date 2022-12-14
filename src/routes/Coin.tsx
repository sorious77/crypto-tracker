import { useQuery } from "react-query";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoin, fetchCoinTicker } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;

  span:first-child {
    position: absolute;
    left: 50px;
    cursor: pointer;
  }
`;

const Loader = styled.div`
  text-align: center;
  font-size: 30px;
`;

const OverView = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 20px;
  border-radius: 10px;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  text-align: center;

  span:first-child {
    font-size: 12px;
    margin-bottom: 5px;
  }
`;

const Description = styled.div`
  margin: 20px 0;
  padding: 0 6px;
`;

const Tabs = styled.div`
  margin: 20px 0 10px 0;
  padding: 15px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
`;

const Tab = styled.div<{ isActive: boolean }>`
  width: 50%;
  text-align: center;
  height: 100%;
  transition: all 0.2s ease-in;

  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};

  &:hover {
    transform: scale(1.1);
  }
`;

const UnderLine = styled(Link)<{ isActive: boolean }>`
  width: 10px;
  padding: 0 4px 4px 4px;

  border-bottom: 1px solid
    ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

interface CoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface CoinPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();

  const { isLoading, data: info } = useQuery<CoinInfo>(["info", coinId!], () =>
    fetchCoin(coinId!)
  );

  const { isLoading: tickerLoading, data: price } = useQuery<CoinPrice>(
    ["tickers", coinId!],
    () => fetchCoinTicker(coinId!),
    {
      refetchInterval: 5000,
    }
  );

  const goBack = () => {
    navigate(-1);
  };

  const loading = isLoading || tickerLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name || info?.name || "..."}</title>
      </Helmet>
      <Header>
        <Title>
          <span onClick={goBack}>???</span>
          <span>{state?.name || info?.name || "..."}</span>
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>RANK:</span>
              <span>{info?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>SYMBOL:</span>
              <span>{info?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>PRICE:</span>
              <span>{`$${price?.quotes.USD.price.toFixed(3)}`}</span>
            </OverViewItem>
          </OverView>
          <Description>{info?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>TOTAL SUPPLY:</span>
              <span>{price?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>MAX SUPPLY:</span>
              <span>{price?.max_supply}</span>
            </OverViewItem>
          </OverView>
          <Tabs>
            <Tab isActive={pathname.indexOf("chart") !== -1}>
              <UnderLine
                to="chart"
                state={{ coinId: coinId }}
                isActive={pathname.indexOf("chart") !== -1}
              >
                Chart
              </UnderLine>
            </Tab>
            <Tab isActive={pathname.indexOf("price") !== -1}>
              <UnderLine
                to="price"
                state={{ coinId: coinId }}
                isActive={pathname.indexOf("price") !== -1}
              >
                Price
              </UnderLine>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
    </Container>
  );
};

export default Coin;
