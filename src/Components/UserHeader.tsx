import React from "react";
import styled from "styled-components";
import Bold from "./Bold";
import Input from "./Input";
import Avatar from "./Avatar";

const Header = styled.header`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const SText = styled(Bold)`
  display: flex;
`;

const ExtendedInput = styled(Input)`
  width: 287px;
  height: 48px;
`;

interface IProps {
  username: string;
  avatar: string;
  currentCity?: string;
  currentCountry?: string;
  size?: string;
  editMode?: boolean;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cityName?: string;
  type?: string;
  target?: string;
}

const UserHeader: React.FunctionComponent<IProps> = ({
  username,
  avatar,
  currentCity,
  currentCountry,
  size,
  editMode,
  onInputChange,
  cityName,
  type,
  target,
}) => {
  return (
    <Header>
      <Avatar size={size} url={avatar} />
      <HeaderColumn>
        <SText text={username} />
        <Location>
          {editMode ? (
            <>
              <ExtendedInput
                onChange={onInputChange}
                type={"text"}
                placeholder={currentCity}
                name={"cityName"}
              />
              , {currentCountry}
            </>
          ) : (
            <>
              {currentCity}, {currentCountry}
            </>
          )}
        </Location>
      </HeaderColumn>
    </Header>
  );
};

export default UserHeader;
