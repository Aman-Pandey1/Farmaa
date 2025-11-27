import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const PetHealthScreen = () => {
  const pets = [
    { id: '1', name: 'Max', type: 'Dog', breed: 'Golden Retriever' },
    { id: '2', name: 'Luna', type: 'Cat', breed: 'Persian' },
  ];

  const vaccinations = [
    { name: 'Rabies', date: '2024-01-01', nextDue: '2025-01-01' },
    { name: 'DHPP', date: '2024-01-15', nextDue: '2025-01-15' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pet Health</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Pets</Text>
        {pets.map((pet) => (
          <TouchableOpacity key={pet.id} style={styles.petCard}>
            <Text style={styles.petEmoji}>{pet.type === 'Dog' ? '🐕' : '🐱'}</Text>
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petBreed}>{pet.breed}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vaccinations</Text>
        {vaccinations.map((vacc, index) => (
          <View key={index} style={styles.vaccinationCard}>
            <Text style={styles.vaccinationName}>{vacc.name}</Text>
            <Text style={styles.vaccinationDate}>Last: {vacc.date}</Text>
            <Text style={styles.vaccinationNext}>Next Due: {vacc.nextDue}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
  section: {
    padding: 20,
    marginTop: 15,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  petEmoji: {
    fontSize: 40,
    marginRight: 15,
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
  },
  vaccinationCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  vaccinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  vaccinationDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  vaccinationNext: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});

export default PetHealthScreen;

