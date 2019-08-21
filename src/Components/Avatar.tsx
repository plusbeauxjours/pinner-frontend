import React from "react";
// import ProgressiveImage from "react-progressive-image";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { GET_CITY_PHOTO } from "./Search/SearchQueries";
import { keyframes } from "styled-components";
import { BACKEND_URL } from "src/constants";

const Animation = keyframes`
	  from{
	    opacity:0;
	  }
	  to{
	    opacity:1;
	  }
  `;

const Container = styled.img<ITheme>`
  height: ${props => {
    if (props.size === "md") {
      return "100px";
    } else if (props.size === "sm") {
      return "30px";
    } else if (props.size === "lg") {
      return "200px";
    } else {
      return "30px";
    }
  }};
  width: ${props => {
    if (props.size === "md") {
      return "100px";
    } else if (props.size === "sm") {
      return "30px";
    } else if (props.size === "lg") {
      return "200px";
    } else {
      return "30px";
    }
  }};
  background-position: center center;
  background-color: transparent;
  background-size: cover;
  object-fit: cover;
  animation: ${Animation} 0.1s linear;
  border-radius: 50%;
  border-style: none;
  display: ${props => !props.src && "none"};
`;

// const Placeholder = styled.div<ITheme>`
//   background-color: ${props => props.color};
//   height: ${props => {
//     if (props.size === "md") {
//       return "100px";
//     } else if (props.size === "sm") {
//       return "30px";
//     } else if (props.size === "lg") {
//       return "200px";
//     } else {
//       return "30px";
//     }
//   }};
//   width: ${props => {
//     if (props.size === "md") {
//       return "100px";
//     } else if (props.size === "sm") {
//       return "30px";
//     } else if (props.size === "lg") {
//       return "200px";
//     } else {
//       return "30px";
//     }
//   }};
//   border-radius: 50%;
//   animation: ${Animation} 0.1s linear;
// `;

const AvatarContainer = styled.div<ITheme>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => {
    if (props.size === "sm") {
      return "45px";
    } else {
      return null;
    }
  }};
  width: ${props => {
    if (props.size === "sm") {
      return "45px";
    } else {
      return null;
    }
  }};
`;

interface ITheme {
  size: string;
  src?: string;
}

interface IProps {
  url?: string;
  size: string;
  bg?: string;
  className?: string;
  city?: boolean;
  cityId?: string;
  countryPhoto?: string;
  continentPhoto?: string;
  onClick?: () => void;
}

const Avatar: React.FunctionComponent<IProps> = ({
  className,
  url,
  size,
  city,
  cityId,
  countryPhoto,
  continentPhoto,
  onClick
}) => {
  // const randomColor = require("randomcolor");
  // const color = randomColor({
  //   luminosity: "dark",
  //   format: "rgba",
  //   alpha: 0.9
  // });
  if (cityId) {
    const { data: cityPhotoData } = useQuery(GET_CITY_PHOTO, {
      variables: { cityId }
    });
    const { getCityPhoto: { photo = null } = {} } = cityPhotoData;
    return (
      // <ProgressiveImage delay={0} src={photo} placeholder="">
      //   {(src, loading) => {
      //     return loading ? (
      //       <AvatarContainer size={size}>
      //         <Placeholder
      //           className={className}
      //           color={"#212121"}
      //           size={size}
      //         />
      //       </AvatarContainer>
      //     ) : (
      <AvatarContainer size={size}>
        <Container className={className} src={photo} size={size} />
      </AvatarContainer>
      //     );
      //   }}
      // </ProgressiveImage>
    );
  } else if (countryPhoto) {
    return (
      // <ProgressiveImage delay={0} src={photo} placeholder="">
      //   {(src, loading) => {
      //     return loading ? (
      //       <AvatarContainer size={size}>
      //         <Placeholder
      //           className={className}
      //           color={"#212121"}
      //           size={size}
      //         />
      //       </AvatarContainer>
      //     ) : (
      <AvatarContainer size={size}>
        <Container className={className} src={countryPhoto} size={size} />
      </AvatarContainer>
      //     );
      //   }}
      // </ProgressiveImage>
    );
  } else if (continentPhoto) {
    return (
      // <ProgressiveImage delay={0} src={photo} placeholder="">
      //   {(src, loading) => {
      //     return loading ? (
      //       <AvatarContainer size={size}>
      //         <Placeholder
      //           className={className}
      //           color={"#212121"}
      //           size={size}
      //         />
      //       </AvatarContainer>
      //     ) : (
      <AvatarContainer size={size}>
        <Container className={className} src={continentPhoto} size={size} />
      </AvatarContainer>
      //     );
      //   }}
      // </ProgressiveImage>
    );
  } else if (city) {
    return (
      // <ProgressiveImage delay={0} src={url} placeholder="">
      //   {(src, loading) => {
      //     return loading ? (
      //       <AvatarContainer size={size}>
      //         <Placeholder
      //           className={className}
      //           color={"#212121"}
      //           size={size}
      //         />
      //       </AvatarContainer>
      //     ) : (
      <AvatarContainer size={size}>
        <Container
          className={className}
          src={
            url ? `${url}` : require(`../Images/notFound/Lost Tourist-big.png`)
          }
          size={size}
          onClick={onClick}
        />
      </AvatarContainer>
      //     );
      //   }}
      // </ProgressiveImage>
    );
  } else {
    const imageNumber = Math.round(Math.random() * 9);
    return (
      // <ProgressiveImage delay={0} src={url} placeholder="">
      //   {(src, loading) => {
      //     return loading ? (
      //       <AvatarContainer size={size}>
      //         <Placeholder
      //           className={className}
      //           color={"#212121"}
      //           size={size}
      //         />
      //       </AvatarContainer>
      //     ) : (
      <AvatarContainer size={size}>
        <Container
          className={className}
          src={
            url
              ? `${BACKEND_URL}/media/${url}`
              : require(`../Images/avatars/earth${imageNumber}.png`)
          }
          size={size}
          onClick={onClick}
        />
      </AvatarContainer>
      //     );
      //   }}
      // </ProgressiveImage>
    );
  }
};

export default Avatar;
