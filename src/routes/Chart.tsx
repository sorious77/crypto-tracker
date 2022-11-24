import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface CoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = () => {
  const {
    state: { coinId },
  } = useLocation();

  const { isLoading, data: history } = useQuery<CoinHistory[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="line"
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: "dark" },
            xaxis: {
              labels: {
                show: false,
              },
              categories: history?.map((h) => h.time_close * 1000),
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#10ac84"], stops: [0, 100] },
            },
            colors: ["#2e86de"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
          series={[
            {
              name: "price",
              data: history!.map((h) => +h.close),
            },
          ]}
        />
      )}
    </div>
  );
};

export default Chart;
