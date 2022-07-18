import React, { useState } from 'react';
import { View, Image, Text, Alert, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
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

const ImageSlector = ({ onImage }) => {
  const [pickerUrl, setPickerUrl] = useState('');

  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

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

  const handleTakeImage = async () => {
    const isCameraPermissionsGranted = await verifyPermissions();

    if(!isCameraPermissionsGranted) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7, 
    });

    setPickerUrl(image.uri);
    onImage(image.uri);
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickerUrl ? (
          <Text>No hay una imagen seleccionada</Text>
        ) : (
          <Image source={{ uri: pickerUrl }} style={styles.image} />
        )}
      </View>
      <Button
        title="Tomar Foto"
        color={colors.primary}
        onPress={handleTakeImage}
      />
    </View>
  );
};

export default ImageSlector;