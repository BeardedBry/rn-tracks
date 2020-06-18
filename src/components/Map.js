import React from 'react';
import {Text, StyleSheet} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';

const Map = ({position, updateLocation}) => {
  //   let points = [];
  //   for (let i = 0; i < 20; i++) {
  //     if (i % 4 === 0) {
  //       points.push({
  //         latitude: 39.758949 + i * 0.001,
  //         longitude: -84.191605 + i * 0.001,
  //       });
  //     } else {
  //       points.push({
  //         latitude: 39.758949 - i * 0.002,
  //         longitude: -84.191605 - i * 0.001,
  //       });
  //     }
  //   }

  return (
    <MapView
      style={styles.map}
      initialRegion={position}
      region={position}
      onRegionChange={updateLocation}>
      {/* <Polyline coordinates={points} /> */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
