import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 30px;
`;

interface CoinState {
  state: {
    name: string;
  };
}

const Coin = () => {
  const { coinId } = useParams();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  return (
    <Container>
      <Header>
        <Title>{state?.name || "..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : <>hi</>}
    </Container>
  );
};

export default Coin;
