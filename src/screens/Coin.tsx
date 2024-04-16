import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 0px 10px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 30px;
  font-weight: 600;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

interface LocationInterface {
  state: {
    name: string;
  }
}

function Coin() {
  const [loading, setLoading] = useState(true);

  const { coinId } = useParams();
  const { state } = useLocation() as LocationInterface;

  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});

  useEffect(() => {
    (async () => {
      // const response = await (await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)).json();

      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

      setInfo(infoData);
      setPrice(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  )
}

export default Coin;