import { useLocation } from "react-router-dom";
import { fetchCoinTicker } from "../api";
import { CoinPrice } from "./Coin";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Container = styled.div``;

const OverView = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
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

const LargeText = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 25px;
`;

const Change = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ChangeItem = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 10px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Graph = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  display: flex;
  justify-content: space-around;
  width: 70%;
  font-size: 25px;
  padding-top: 10px;
`;

const Price = () => {
  const {
    state: { coinId },
  } = useLocation();

  const { isLoading, data } = useQuery<CoinPrice>(
    ["tickers", coinId!],
    () => fetchCoinTicker(coinId!),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <Container>
      <Helmet>
        <title>{`${data?.name} | Price`}</title>
      </Helmet>
      {isLoading ? (
        "Loading... "
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>MAX PRICE</span>
              <span>
                {new Date(data?.quotes.USD.ath_date!).toLocaleString()}
              </span>
            </OverViewItem>
            <OverViewItem>
              <LargeText>${data?.quotes.USD.ath_price.toFixed(3)}</LargeText>
            </OverViewItem>
          </OverView>
          <Change>
            <ChangeItem>
              <span>An hour ago</span>
              <Graph
                color={`${
                  data?.quotes.USD.percent_change_1h! > 0
                    ? "#74b9ff"
                    : data?.quotes.USD.percent_change_1h! === 0
                    ? "white"
                    : "#ff7675"
                }`}
              >
                <span>{data?.quotes.USD.percent_change_1h}%</span>
                <span>
                  {data?.quotes.USD.percent_change_1h! > 0
                    ? "↗︎"
                    : data?.quotes.USD.percent_change_1h === 0
                    ? "→"
                    : "↘"}
                </span>
              </Graph>
            </ChangeItem>
            <ChangeItem>
              <span>6 hours ago</span>
              <Graph
                color={`${
                  data?.quotes.USD.percent_change_6h! > 0
                    ? "#74b9ff"
                    : data?.quotes.USD.percent_change_6h! === 0
                    ? "white"
                    : "#ff7675"
                }`}
              >
                <span>{data?.quotes.USD.percent_change_6h}%</span>
                <span>
                  {data?.quotes.USD.percent_change_6h! > 0
                    ? "↗︎"
                    : data?.quotes.USD.percent_change_6h === 0
                    ? "→"
                    : "↘"}
                </span>
              </Graph>
            </ChangeItem>
            <ChangeItem>
              <span>12 hours ago</span>
              <Graph
                color={`${
                  data?.quotes.USD.percent_change_12h! > 0
                    ? "#74b9ff"
                    : data?.quotes.USD.percent_change_12h! === 0
                    ? "white"
                    : "#ff7675"
                }`}
              >
                <span>{data?.quotes.USD.percent_change_12h}%</span>
                <span>
                  {data?.quotes.USD.percent_change_12h! > 0
                    ? "↗︎"
                    : data?.quotes.USD.percent_change_12h === 0
                    ? "→"
                    : "↘"}
                </span>
              </Graph>
            </ChangeItem>
            <ChangeItem>
              <span>24 hours ago</span>
              <Graph
                color={`${
                  data?.quotes.USD.percent_change_24h! > 0
                    ? "#74b9ff"
                    : data?.quotes.USD.percent_change_24h! === 0
                    ? "white"
                    : "#ff7675"
                }`}
              >
                <span>{data?.quotes.USD.percent_change_24h}%</span>
                <span>
                  {data?.quotes.USD.percent_change_24h! > 0
                    ? "↗︎"
                    : data?.quotes.USD.percent_change_24h === 0
                    ? "→"
                    : "↘"}
                </span>
              </Graph>
            </ChangeItem>
            <ChangeItem>
              <span>7 days ago</span>
              <Graph
                color={`${
                  data?.quotes.USD.percent_change_7d! > 0
                    ? "#74b9ff"
                    : data?.quotes.USD.percent_change_7d! === 0
                    ? "white"
                    : "#ff7675"
                }`}
              >
                <span>{data?.quotes.USD.percent_change_7d}%</span>
                <span>
                  {data?.quotes.USD.percent_change_7d! > 0
                    ? "↗︎"
                    : data?.quotes.USD.percent_change_7d === 0
                    ? "→"
                    : "↘"}
                </span>
              </Graph>
            </ChangeItem>
            <ChangeItem>
              <span>30 days ago</span>
              <Graph
                color={`${
                  data?.quotes.USD.percent_change_30d! > 0
                    ? "#74b9ff"
                    : data?.quotes.USD.percent_change_30d! === 0
                    ? "white"
                    : "#ff7675"
                }`}
              >
                <span>{data?.quotes.USD.percent_change_30d}%</span>
                <span>
                  {data?.quotes.USD.percent_change_30d! > 0
                    ? "↗︎"
                    : data?.quotes.USD.percent_change_30d === 0
                    ? "→"
                    : "↘"}
                </span>
              </Graph>
            </ChangeItem>
          </Change>
        </>
      )}
    </Container>
  );
};

export default Price;
