import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  container: {
    margin: 100,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lavender',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(JSON.stringify(location))
    // console.log('hola')
  }
  // setLocation('esperando');
  console.log(text)

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}