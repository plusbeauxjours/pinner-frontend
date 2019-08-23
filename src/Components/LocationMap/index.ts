import LocationMapContainer from "./LocationMapContainer";
import { GoogleApiWrapper } from "google-maps-react";

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(LocationMapContainer);
