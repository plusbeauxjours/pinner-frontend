import React from "react";
import styled from "src/Styles/typed-components";

const MapBox = styled.div<ITheme>`
  position: absolute;
  border-radius: 3px;
  border: 0px;
  height: ${props => {
    if (props.modal === true) {
      return "699px";
    } else {
      return "300px";
    }
  }};
  width: ${props => {
    if (props.modal === true) {
      return "699px";
    } else {
      return "300px";
    }
  }};
  @media screen and (max-width: 700px) {
    width: 100%;
    display: flex;
  }
`;

interface ITheme {
  modal: boolean;
}

interface IProps {
  mapRef: any;
  modal: boolean;
}

const LocationMapPresenter: React.SFC<IProps> = ({ mapRef, modal }) => (
  <MapBox ref={mapRef} modal={modal} />
);

export default LocationMapPresenter;
