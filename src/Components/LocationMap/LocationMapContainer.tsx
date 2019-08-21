import React from "react";
import LocationMapPresenter from "./LocationMapPresenter";
import ReactDOM from "react-dom";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {
  google: any;
  latitude: number;
  longitude: number;
  modal: boolean;
  type: string;
}

class LocationMapContainer extends React.Component<IProps> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    const { latitude, longitude, type } = this.props;
    this.loadMap(latitude, longitude, type);
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityId !== newProps.match.params.cityId) {
      const { latitude, longitude, type } = this.props;
      this.loadMap(latitude, longitude, type);
    }
  }
  public render() {
    const { modal } = this.props;
    return <LocationMapPresenter modal={modal} mapRef={this.mapRef} />;
  }

  public loadMap = async (lat: number, lng: number, type: string) => {
    const { google } = this.props;
    const maps = await google.maps;
    const mapNode = await ReactDOM.findDOMNode(this.mapRef.current);
    if (!mapNode) {
      this.loadMap(lat, lng, type);
      return;
    }
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: type === "country" ? 5 : 13,
      styles:
        localStorage.getItem("isDarkMode") === "true"
          ? [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#e6e6e6"
                  }
                ]
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    visibility: "on"
                  },
                  {
                    color: "#193341"
                  },
                  {
                    weight: 0.2
                  },
                  {
                    gamma: 0.84
                  }
                ]
              },
              {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "all",
                stylers: [
                  {
                    saturation: 0
                  },
                  {
                    hue: "#003569"
                  }
                ]
              },
              {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#1a3541"
                  }
                ]
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#212121"
                  }
                ]
              },

              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#193341"
                  }
                ]
              },
              {
                featureType: "road",
                stylers: [
                  {
                    saturation: -70
                  },
                  { lightness: -70 }
                ]
              },
              {
                featureType: "road",
                elementType: "labels.text",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "transit",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "poi",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#193341"
                  }
                ]
              }
            ]
          : [
              {
                featureType: "all",
                stylers: [
                  {
                    saturation: 0
                  },
                  {
                    hue: "#e7ecf0"
                  }
                ]
              },
              {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "road",
                stylers: [
                  {
                    saturation: -70
                  }
                ]
              },
              {
                featureType: "road",
                elementType: "labels.text",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "transit",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "poi",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "water",
                stylers: [
                  {
                    visibility: "simplified"
                  },
                  {
                    saturation: -60
                  }
                ]
              }
            ]
    };
    this.map = new maps.Map(mapNode, mapConfig);
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "#999",
        scale: 25,
        strokeWeight: 50,
        strokeOpacity: 0.3
      },
      position: {
        lat,
        lng
      }
    };
    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };
  public handleGeoWatchSuccess = () => {
    const { latitude, longitude } = this.props;
    this.map.panTo({ lat: latitude, lng: longitude });
  };
  public handleGeoWatchError = () => {
    console.log("Error watching you");
  };
}

export default withRouter(LocationMapContainer);
