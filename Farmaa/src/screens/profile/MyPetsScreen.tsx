import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyPetsScreen = () => {
  const navigation = useNavigation();
  const pets = [
    { id: '1', name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: 3 },
    { id: '2', name: 'Luna', type: 'Cat', breed: 'Persian', age: 2 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Pets</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddPet' as never)}>
          <Text style={styles.addButton}>+ Add Pet</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.petCard}>
            <View style={styles.petImage}>
              <Text style={styles.petEmoji}>{item.type === 'Dog' ? '🐕' : '🐱'}</Text>
            </View>
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{item.name}</Text>
              <Text style={styles.petBreed}>{item.breed}</Text>
              <Text style={styles.petAge}>{item.age} years old</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  petCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  petImage: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  petEmoji: {
    fontSize: 40,
  },
  petInfo: {
    flex: 1,
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

export default MyPetsScreen;

