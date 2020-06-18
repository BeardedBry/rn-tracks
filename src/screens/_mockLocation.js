import Geolocation from '@react-native-community/geolocation';

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
  return {
    timestamp: 1000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitude: 5,
      longitude: -84.191605 + increment * tenMetersWithDegrees,
      latitude: 39.758949 + increment * tenMetersWithDegrees,
    },
  };
};

let counter = 0;
setInterval(() => {}, 1000);
