import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LoadableImage = styled.div<IProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  transition: filter 1s ease;
  filter: ${props => (!props.loaded ? "blur(3px)" : "unset")};
  background-image: url(${props => props.src});
  background-position: 50% 505;
  background-origin: border-box;
  background-size: cover;
`;

interface IProps {
  placeholder?: string;
  image?: string;
  width?: number;
  height?: number;
  loaded?: boolean;
  src?: string;
}

const BlurImageLoader: React.FunctionComponent<IProps> = ({
  placeholder,
  image,
  ...props
}) => {
  const runOnce = true;
  const [loadState, setLoadState] = useState({
    src: placeholder,
    loaded: false
  });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoadState({
        src: img.src,
        loaded: true
      });
    };
    img.src = image;
  }, [runOnce]);

  return <LoadableImage {...props} {...loadState} />;
};

export default BlurImageLoader;
