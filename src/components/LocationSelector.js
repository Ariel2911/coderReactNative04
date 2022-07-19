import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { colors } from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const LocationSlector = ({ onLocation }) => {
  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permisos insuficientes',
        'Necesitas permisos para usar la camara',
        [{ text: 'ok' }]
      );
      return false;
    }
    return true;
  };

  const handleGetLocation = async () => {
    const isLocationPermissionsGranted = await verifyPermissions();

    if (!isLocationPermissionsGranted) return;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
    });

    const { latitude, longitude, } = location.coords;

    setPickedLocation({
      lat: latitude,
      lng: longitude,
    });

    onLocation({
      lat: latitude,
      lng: longitude,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedLocation ? (
          <Text>No hay una ubicación seleccionada</Text>
        ) : (
          <Text>{`latitud: ${pickedLocation.lat}, longitud ${pickedLocation.lng}`}</Text>
        )}
      </View>
      <Button
        title="Obtener ubicación"
        color={colors.primary}
        onPress={handleGetLocation}
      />
    </View>
  );
};

export default LocationSlector;
