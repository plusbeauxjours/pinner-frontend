import React from "react";
import styled from "../../../Styles/typed-components";
import Loader from "../../../Components/Loader";

import { Link } from "react-router-dom";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import { keyframes } from "styled-components";

const ModalContainer = styled.div`
  z-index: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.modalOverlayColor};
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
  `;

const InputContainer = styled.div`
  z-index: 10;
  top: 30%;
  width: 400px;
  border: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-self: center;
  @media screen and (max-width: 440px) {
    width: 90%;
  }
`;

const SearchCountriesInput = styled.input`
  z-index: 10;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  padding: 5px;
  color: ${props => props.theme.color};
  background-color: transparent;
  font-size: 12px;
  font-weight: 100;
  transition: border-bottom 0.1s linear;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
  animation: ${ModalAnimation} 0.1s linear;
  margin-top: 20px;
  font-size: 34px;
`;

const Modal = styled.div`
  z-index: 10;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  animation: ${ModalAnimation} 0.1s linear;
  height: 44vh;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    display: none !important;
    width: 3px;
    background: none;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  @media screen and (max-height: 800px) {
    height: 44vh;
  }
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 1fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;
const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;
const GreyText = styled(Bold)`
  color: ${props => props.theme.greyColor};
`;

interface IProps {
  data?: any;
  loading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  countryList: any;
  back: (event: any) => void;
}

const CountriesPresenter: React.FunctionComponent<IProps> = ({
  data: { topCountries: { countries = null } = {} } = {},
  loading,
  countryList,
  search,
  onChange,
  back
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && countries) {
    return (
      <ModalContainer>
        <ModalOverlay onClick={back} />
        <InputContainer>
          <SearchCountriesInput
            autoFocus={true}
            placeholder={"Search a Country"}
            onChange={onChange}
            value={search}
            autoComplete={"off"}
          />
          <Modal>
            {countryList.length !== 0 &&
              countryList &&
              countryList.map(country => (
                <UserRow key={country.id}>
                  <Link to={`/country/${country.countryCode}`}>
                    <Header>
                      <SAvatar
                        size={"sm"}
                        url={country.countryPhoto}
                        city={true}
                      />
                      <HeaderColumn>
                        <HeaderText text={country.countryName} />
                        <Location>{country.continent.continentName}</Location>
                      </HeaderColumn>
                    </Header>
                  </Link>
                  <GreyText text={`x ${country.count}`} />
                  {country.diff && <GreyText text={`${country.diff} d`} />}
                </UserRow>
              ))}
            {countryList.length === 0 &&
              !search &&
              countries &&
              countries.map(country => (
                <UserRow key={country.id}>
                  <Link to={`/country/${country.countryCode}`}>
                    <Header>
                      <SAvatar
                        size={"sm"}
                        url={country.countryPhoto}
                        city={true}
                      />
                      <HeaderColumn>
                        <HeaderText text={country.countryName} />
                        <Location>{country.continent.continentName}</Location>
                      </HeaderColumn>
                    </Header>
                  </Link>
                  <GreyText text={`x ${country.count}`} />
                  {country.diff && <GreyText text={`${country.diff} d`} />}
                </UserRow>
              ))}
          </Modal>
        </InputContainer>
      </ModalContainer>
    );
  }
  return null;
};

export default CountriesPresenter;
