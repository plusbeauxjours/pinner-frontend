import React from "react";
import styled from "src/Styles/typed-components";
import { getAqi, getWeather } from "../weatherHelper";
import LoaderData from "./LoaderData";

const colorMidium = "#FFA500";
const colorHigh = "#FF4500";
const colorVeryHigh = "#FF0000";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const WeatherInfo = styled.div<ITheme>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${props => {
    if (props.type === "feed") {
      return "20px";
    } else if (props.type === "profile") {
      return "25px";
    } else {
      return "100%";
    }
  }};
  flex-wrap: wrap;
`;

const WeatherImage = styled.img<ITheme>`
  height: ${props => {
    if (props.size === "md") {
      return "22px";
    } else if (props.size === "sm") {
      return "22px";
    } else {
      return "60px";
    }
  }};
  width: ${props => {
    if (props.size === "md") {
      return "22px";
    } else if (props.size === "sm") {
      return "22px";
    } else {
      return "60px";
    }
  }};
  margin-right: 3px;
`;

const TempNumber = styled.div<ITheme>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3px;
  margin-right: 5px;
  font-size: ${props => {
    if (props.size === "sm") {
      return "8px";
    } else if (props.size === "md") {
      return "12px";
    } else {
      return "12px";
    }
  }};
  font-weight: 100;
  color: ${props => {
    if (-10 <= props.chill && props.aqi <= -5) {
      return "#1E90FF";
    } else if (-20 <= props.chill && props.aqi < -10) {
      return "#0000FF";
    } else if (props.aqi < -20) {
      return "#00008B";
    } else if (30 <= props.temp && props.temp < 35) {
      return colorMidium;
    } else if (35 <= props.temp && props.temp < 40) {
      return colorHigh;
    } else if (40 <= props.temp) {
      return colorVeryHigh;
    } else {
      return props.theme.color;
    }
  }};
`;

const AqiNumber = styled(TempNumber)`
  color: ${props => {
    if (100 <= props.aqi && props.aqi < 150) {
      return colorMidium;
    } else if (150 <= props.aqi && props.aqi < 200) {
      return colorHigh;
    } else if (200 <= props.aqi) {
      return colorVeryHigh;
    } else {
      return props.theme.color;
    }
  }};
`;

const HumidityNumber = styled(TempNumber)`
  color: ${props => {
    if (40 <= props.humidity && props.humidity < 70) {
      return props.theme.color;
    } else {
      return "#008d62";
    }
  }};
`;

interface ITheme {
  size?: string;
  type?: string;
  temp?: number;
  chill?: number;
  aqi?: number;
  humidity?: number;
}

interface IProps {
  latitude: number;
  longitude: number;
  size?: string;
  type?: string;
  aqi?: number;
}

interface IState {
  aqi: number;
  icon: string;
  humidity: number;
  temp: number;
  chill: number;
}

class Weather extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      aqi: 0,
      icon: null,
      humidity: 0,
      temp: 0,
      chill: 0
    };
  }
  public componentDidMount() {
    const { latitude, longitude } = this.props;
    this.getWeather(latitude, longitude);
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps !== newProps) {
      this.getWeather(newProps.latitude, newProps.longitude);
    }
  }
  public render() {
    const { size, type } = this.props;
    const { aqi, icon, humidity, temp, chill } = this.state;
    return (
      <Container>
        {icon ? (
          <WeatherImage
            src={require(`../Images/weatherIcon/${icon}.svg`)}
            size={size}
          />
        ) : (
          <LoaderData type={type} />
        )}
        <WeatherInfo type={type}>
          <TempNumber
            size={size}
            temp={Math.round(temp)}
            chill={Math.round(chill)}
          >
            <p>Temp</p>
            <p> {Math.round(temp)} °C</p>
          </TempNumber>
          <TempNumber
            size={size}
            temp={Math.round(temp)}
            chill={Math.round(chill)}
          >
            <p>Feels</p>
            <p> {Math.round(chill)} °C</p>
          </TempNumber>
          <AqiNumber size={size} aqi={aqi}>
            <p>AQI</p>
            <p> {aqi}</p>
          </AqiNumber>
          <HumidityNumber size={size} humidity={humidity}>
            <p>Humidity</p>
            <p> {humidity} %</p>
          </HumidityNumber>
        </WeatherInfo>
      </Container>
    );
  }
  public getWeather = async (latitude: number, longitude: number) => {
    const aqi = await getAqi(latitude, longitude);
    const { icon, humidity, temp, chill } = await getWeather(
      latitude,
      longitude
    );
    this.setState({ aqi, icon, humidity, temp, chill });
  };
}

export default Weather;
