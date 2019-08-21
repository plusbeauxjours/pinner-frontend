import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "./Wrapper";
import browserHistory from "../Apollo/browserHistory";
import Button from "src/Components/Button";
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

const SButton = styled(Button)`
  width: 50px;
  margin-top: 20px;
`;

const back = event => {
  event.stopPropagation();
  browserHistory.push("/");
};

const NotFound: React.FunctionComponent<any> = () => (
  <Container>
    <Helmet>
      <title>404 | Pinner</title>
    </Helmet>
    <SWrapper>
      <Image src={require(`../Images/notFound/Astronaut-big.png`)} />
      <Bold>This page is lost in space </Bold>
      <GreyText>
        You thought this mission to the moon would be a quick six month thing.
        <br />
        Your neighbor offered to look after your dog. Your high school math
        teacher was impressed.
        <br />
        He once said you wouldn’t amount to anything. <br />
        You sure showed him. But now here you are, fifty feet from your
        spaceship with no way to get back.
        <br />
        Your dog will be so sad. Your math teacher will be so smug. Pretty
        devastating.
        <br />
      </GreyText>
      <SButton onClick={back} text={"HOME"} />
    </SWrapper>
  </Container>
);

export default NotFound;
