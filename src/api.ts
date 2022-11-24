const BASE_URL = `https://api.coinpaprika.com/v1`;

const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

const fetchCoin = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
};

const fetchCoinTicker = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
};

const fetchCoinHistory = (coinId: string) => {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) => response.json());
};

export { fetchCoins, fetchCoin, fetchCoinTicker, fetchCoinHistory };
