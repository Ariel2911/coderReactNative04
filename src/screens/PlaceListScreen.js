import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import PlaceItems from '../components/PlaceItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PlaceListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.place.places);

  const onSelectPlace = (id) => {
    navigation.navigate('PlaceDetail', { placeId: id });
  };
  
  const renderItem = ({ item }) => (
    <PlaceItems {...item} onSelect={onSelectPlace} />
  );

  const listEmptyComponent = () => (
    <View style={styles.emptyContainer} >
      <Text>No hay lugares disponibles</Text>
    </View>
  )
  return(
    <FlatList
      style={styles.container}
      data= {places}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={listEmptyComponent}
    />
  );
};

export default PlaceListScreen;