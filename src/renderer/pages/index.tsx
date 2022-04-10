import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Game from "../components/Game";
import Button from "../components/Button";
import Layout from "../components/Layout";
import GlobalContext from "../components/GlobalContext";

const IndexPage = () => {
  const { settingsStore: state } = useContext(GlobalContext);
  const [quota, setQuota] = useState({});

  const games = state?.games && Object.values(state?.games);
  console.log({ games });
  console.log({ quota });

  const getQuota = useCallback(async () => {
    setQuota(await window.electron.getQuota());
  }, [setQuota]);

  useEffect(() => {
    getQuota();
  }, [getQuota]);

  return (
    <Layout>
      <Header>
        <h1>Games</h1>

        <div>{JSON.stringify(quota, null, 2)}</div>

        <Button
          icon="add"
          to="/games/new/settings"
          // href="/games/[id]/settings" as="/games/new/settings"
        >
          Add game
        </Button>

        {/* <Button href="/games/[id]/settings" as="/games/new/settings">
          Add game
        </Button>

        <Button href="/games/[id]/settings" isDisabled={true}>
          Add game
        </Button>

        <Button href="/games/[id]/settings" isLoading={true}>
          Add game
        </Button>

        <Button icon="add" href="/games/[id]/settings" /> */}
      </Header>

      <Games>
        {games?.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </Games>
    </Layout>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Games = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  margin-top: 20px;
`;

export default IndexPage;
