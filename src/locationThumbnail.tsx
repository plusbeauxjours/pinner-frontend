// import axios from "axios";
// import { toast } from "react-toastify";

// export const cityThumbnail = async cityName => {
//   const REACT_APP_UNSPLASH_ACCESS_KEY =
//     process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
//   const URL = `https://api.unsplash.com/search/photos/?page=1&fit=crop&w=300&h=300&query=${cityName}&client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}`;
//   const { data } = await axios(URL);
//   if (!data.error_message) {
//     const { results } = data;
//     const cityPhotoURL = await results[0].urls.regular;
//     return cityPhotoURL;
//   } else {
//     toast.error(data.error_message);
//     return null;
//   }
// };

// export const countryThumbnail = async countryName => {
//   const REACT_APP_UNSPLASH_ACCESS_KEY =
//     process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
//   const URL = `https://api.unsplash.com/search/photos/?page=1&fit=crop&w=300&h=300&query=${countryName}&client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}`;
//   const { data } = await axios(URL);
//   if (!data.error_message) {
//     const { results } = data;
//     const countryPhotoURL = await results[0].urls.regular;
//     return countryPhotoURL;
//   } else {
//     toast.error(data.error_message);
//     return null;
//   }
// };

// export const continentThumbnail = async continentName => {
//   const REACT_APP_UNSPLASH_ACCESS_KEY =
//     process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
//   const URL = `https://api.unsplash.com/search/photos/?page=1&fit=crop&w=300&h=300&query=${continentName}&client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}`;
//   const { data } = await axios(URL);
//   if (!data.error_message) {
//     const { results } = data;
//     const continentPhotoURL = await results[0].urls.regular;
//     return continentPhotoURL;
//   } else {
//     toast.error(data.error_message);
//     return null;
//   }
// };
