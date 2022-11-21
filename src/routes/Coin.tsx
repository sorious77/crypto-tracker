import { useParams } from "react-router-dom";

const Coin = () => {
  const { coinId } = useParams();

  return <div>{coinId}</div>;
};

export default Coin;
