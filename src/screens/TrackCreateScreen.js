import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import Geolocation from '@react-native-community/geolocation';
import Map from '../components/Map';

const initState = {
  latitude: 39.758949,
  longitude: -84.191605,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const TrackCreateScreen = () => {
  const [err, setErr] = useState(null);
  const [pos, setPos] = useState(initState);

  const startWatching = async () => {
    try {
      await Geolocation.requestAuthorization();
      Geolocation.watchPosition(position => {
        console.log(position);
        setPos({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      });
    } catch (e) {
      setErr(e);
    }
  };

  const onLocationChange = () => {
    return pos;
  };

  useEffect(() => {
    startWatching();
    //console.log(pos);
    onLocationChange();
  }, []);

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text h2>Create a Track</Text>
      <Map position={pos} updateLocation={onLocationChange} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
