import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "./Wrapper";
import Helmet from "react-helmet";

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
`;

const SWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const Bold = styled.p`
  font-weight: 400;
  text-align: center;
  font-size: 40px;
  margin-bottom: 30px;
  color: ${props => props.theme.color};
`;

const GreyText = styled.p`
  font-weight: 100;
  text-align: center;
  font-size: 12px;
  color: grey;
  line-height: 14px;
`;

const Image = styled.img`
  display: flex;
  width: 450px;
  height: 450px;
  background-position: center center;
  object-fit: cover;
  margin-bottom: 30px;
`;

const NotFound: React.FunctionComponent<any> = () => (
  <Container>
    <Helmet>
      <title>Pinner</title>
    </Helmet>
    <SWrapper>
      <Image src={require(`../Images/notFound/Balloon Lost-big.png`)} />
      <Bold>This link appears to be expired and is no longer valid</Bold>
      <GreyText>
        The child had looked so excited when the clown had presented a large red
        balloon.
        <br /> You had seen this, but in the throes of your morning commute you
        didn’t register it until it was too late.
        <br /> Who asked the government to support a fair right through Main
        Street during a week day anyway?
        <br />
        Your bike barrelled right between the child and the clown and sent the
        balloon on its merry way.
        <br /> You didn’t turn back to see the damage you had done. Later you
        saw the balloon floating outside your office window.
        <br />
      </GreyText>
    </SWrapper>
  </Container>
);

export default NotFound;
