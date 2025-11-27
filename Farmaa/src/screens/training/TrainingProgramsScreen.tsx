import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TrainingProgramsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { program } = route.params as any;

  const trainers = [
    { id: '1', name: 'Expert Trainer 1', rating: 4.9, sessions: 10, price: 5000 },
    { id: '2', name: 'Expert Trainer 2', rating: 4.7, sessions: 8, price: 4000 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{program}</Text>
      </View>

      {trainers.map((trainer) => (
        <TouchableOpacity
          key={trainer.id}
          style={styles.trainerCard}
          onPress={() => navigation.navigate('Booking' as never, { provider: trainer, serviceType: 'Training' } as never)}
        >
          <View style={styles.trainerInfo}>
            <Text style={styles.trainerName}>{trainer.name}</Text>
            <Text style={styles.trainerRating}>⭐ {trainer.rating}</Text>
            <Text style={styles.trainerSessions}>{trainer.sessions} sessions</Text>
          </View>
          <Text style={styles.trainerPrice}>₹{trainer.price}</Text>
        </TouchableOpacity>
      ))}
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
  trainerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  trainerRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  trainerSessions: {
    fontSize: 12,
    color: '#999',
  },
  trainerPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});

export default TrainingProgramsScreen;

