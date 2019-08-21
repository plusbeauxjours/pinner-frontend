import axios from "axios";
import { toast } from "react-toastify";
import dotenv from "dotenv";
dotenv.config();

export const geoCode = async (address: string) => {
  const REACT_APP_GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${REACT_APP_GOOGLE_MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    const {
      geometry: {
        location: { lat, lng }
      }
    } = firstPlace;
    return { latitude: lat, longitude: lng };
  } else {
    toast.error(data.error_message);
    return false;
  }
};

export const reverseGeoCode = async (latitude: number, longitude: number) => {
  const REACT_APP_GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?&language=en&latlng=${latitude},${longitude}&key=${REACT_APP_GOOGLE_MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;

    let storableLocation = {
      cityName: "",
      cityId: "",
      countryCode: ""
    };
    for (const components of results) {
      for (const component of components.address_components) {
        if (
          component.types[0] === "locality" ||
          component.types[0] === "sublocality" ||
          component.types[0] === "colloquial_area"
        ) {
          storableLocation.cityName = component.long_name;
          storableLocation.cityId = components.place_id;
        } else if (
          !storableLocation.cityName &&
          component.types[0] === "administrative_area_level_1"
        ) {
          storableLocation.cityName = component.long_name;
        } else if (component.types.includes("country")) {
          storableLocation.countryCode = component.short_name;
        }
      }
    }
    return { storableLocation };
  } else {
    toast.error(data.error_message);
    return null;
  }
};

export const reversePlaceId = async (placeId: string) => {
  const REACT_APP_GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?&language=en&place_id=${placeId}&key=${REACT_APP_GOOGLE_MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;

    let storableLocation = {
      latitude: 0,
      longitude: 0,
      cityName: "",
      countryCode: ""
    };
    for (const component of results[0].address_components) {
      if (component.types[0] === "country") {
        storableLocation.countryCode = component.short_name;
      }
    }
    for (const components of results) {
      for (const component of components.address_components) {
        if (
          component.types[0] === "locality" ||
          component.types[0] === "sublocality" ||
          component.types[0] === "colloquial_area"
        ) {
          storableLocation.cityName = component.long_name;
        }
      }
    }
    storableLocation.latitude = results[0].geometry.location.lat;
    storableLocation.longitude = results[0].geometry.location.lng;
    return { storableLocation };
  } else {
    toast.error(data.error_message);
    return null;
  }
};
