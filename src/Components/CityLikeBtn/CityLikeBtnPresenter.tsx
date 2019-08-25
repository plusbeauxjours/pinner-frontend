import React from "react";
import styled from "src/Styles/typed-components";
import Bold from "../Bold";
import { keyframes } from "styled-components";
import {
  SmallHeartEmpty,
  SmallHeartFilled,
  BigHeartEmpty,
  BigHeartFilled
} from "../../Icons";

const RowButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  cursor: pointer;
`;

const BoxButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const LikeAnimation = keyframes`
	  from{
	    opacity:1;
      height: 110%
      width: 110%
	  }
	  to{
	    opacity:1;
      height: 100%
      width: 100%
	  }
	`;

const Button = styled.span<ITheme>`
  cursor: pointer;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 10px;
  }
  transition: all 0.5s ease-in-out;
  width: ${props => props.type === "profile" && "45px"};
  svg {
    transition: all 0.5s ease-in-out;
    fill: ${props => (props.isLiked ? "#EC4956" : props.theme.color)};
  }
`;

const BoxButton = styled.span<ITheme>`
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  width: ${props => props.type === "profile" && "45px"};
  svg {
    animation: ${LikeAnimation} 0.1s linear;
    fill: ${props => (props.isLiked ? "#EC4956" : props.theme.greyColor)};
  }
`;

const Text = styled(Bold)<ITheme>`
  display: flex;
  align-items: center;
  font-weight: 100;
  text-transform: capitalize;
  color: ${props =>
    props.type === "row" ? props.theme.color : props.theme.color};
  /* margin-left: 8px; */
  @media screen and (max-width: 400px) {
    display: none;
  }
`;

interface ITheme {
  isLiked?: boolean;
  type?: string;
}

interface IProps {
  likeCount: number;
  isLiked: boolean;
  onLikeClick: () => void;
  type: string;
}

const CityLikeBtnPresenter: React.FunctionComponent<IProps> = ({
  likeCount,
  isLiked,
  onLikeClick,
  type
}) => (
  <>
    {(() => {
      switch (type) {
        case "row":
          return (
            <RowButtonContainer onClick={onLikeClick}>
              <Button isLiked={isLiked}>
                {isLiked ? <SmallHeartFilled /> : <SmallHeartEmpty />}
              </Button>
              <Text
                text={likeCount === 1 ? "1 like" : `${likeCount} likes`}
                type={type}
              />
            </RowButtonContainer>
          );
        case "profile":
          return (
            <BoxButtonContainer>
              <BoxButton isLiked={isLiked} onClick={onLikeClick} type={type}>
                {isLiked ? <BigHeartFilled /> : <BigHeartEmpty />}
              </BoxButton>
              <Text
                text={likeCount === 1 ? "1 like" : `${likeCount} likes`}
                type={type}
              />
            </BoxButtonContainer>
          );
        default:
          return null;
      }
    })()}
  </>
);

export default CityLikeBtnPresenter;
