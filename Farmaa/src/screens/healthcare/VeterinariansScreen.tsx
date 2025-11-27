import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VeterinariansScreen = () => {
  const navigation = useNavigation();
  const veterinarians = [
    { _id: '1', name: 'Dr. Smith', specialization: 'General', rating: 4.8, experience: '10 years' },
    { _id: '2', name: 'Dr. Johnson', specialization: 'Surgery', rating: 4.9, experience: '15 years' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Veterinarians</Text>
      </View>

      <FlatList
        data={veterinarians}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.vetCard}
            onPress={() => navigation.navigate('Booking' as never, { provider: item, serviceType: 'Veterinary' } as never)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👨‍⚕️</Text>
            </View>
            <View style={styles.vetInfo}>
              <Text style={styles.vetName}>{item.name}</Text>
              <Text style={styles.vetSpecialization}>{item.specialization}</Text>
              <Text style={styles.vetRating}>⭐ {item.rating}</Text>
              <Text style={styles.vetExperience}>{item.experience} experience</Text>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  vetCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    margin: 15,
    borderRadius: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 30,
  },
  vetInfo: {
    flex: 1,
  },
  vetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  vetSpecialization: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  vetRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  vetExperience: {
    fontSize: 12,
    color: '#999',
  },
});

export default VeterinariansScreen;

