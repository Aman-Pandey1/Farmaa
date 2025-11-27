import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdoptionScreen = () => {
  const navigation = useNavigation();
  const [pets] = useState([
    { _id: '1', name: 'Buddy', type: 'Dog', breed: 'Labrador', age: 2, gender: 'Male', image: '🐕' },
    { _id: '2', name: 'Whiskers', type: 'Cat', breed: 'Persian', age: 1, gender: 'Female', image: '🐱' },
    { _id: '3', name: 'Max', type: 'Dog', breed: 'German Shepherd', age: 3, gender: 'Male', image: '🐕' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Adopt a Pet</Text>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.petsList}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.petCard}
            onPress={() => navigation.navigate('PetDetail' as never, { pet: item } as never)}
          >
            <View style={styles.petImage}>
              <Text style={styles.petEmoji}>{item.image}</Text>
            </View>
            <Text style={styles.petName}>{item.name}</Text>
            <Text style={styles.petBreed}>{item.breed}</Text>
            <Text style={styles.petAge}>{item.age} years old</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  petsList: {
    padding: 15,
  },
  row: {
    justifyContent: 'space-between',
  },
  petCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  petImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  petEmoji: {
    fontSize: 60,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  petBreed: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  petAge: {
    fontSize: 12,
    color: '#999',
  },
});

export default AdoptionScreen;

