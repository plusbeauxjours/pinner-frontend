import LocationMapContainer from "./LocationMapContainer";
import { GoogleApiWrapper } from "google-maps-react";
import dotenv from "dotenv";
dotenv.config();

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_KEY
})(LocationMapContainer);
