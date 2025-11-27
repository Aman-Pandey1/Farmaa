import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TrainingScreen = () => {
  const navigation = useNavigation();

  const programs = [
    { id: 1, name: 'Basic Training', icon: '🎯', description: 'Basic commands and obedience' },
    { id: 2, name: 'Advanced Training', icon: '🏆', description: 'Advanced skills and tricks' },
    { id: 3, name: 'Behavioral', icon: '🧠', description: 'Behavior correction' },
    { id: 4, name: 'Puppy Training', icon: '🐶', description: 'Specialized for puppies' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Training Programs</Text>
      </View>

      <View style={styles.programsGrid}>
        {programs.map((program) => (
          <TouchableOpacity
            key={program.id}
            style={styles.programCard}
            onPress={() => navigation.navigate('TrainingPrograms' as never, { program: program.name } as never)}
          >
            <Text style={styles.programIcon}>{program.icon}</Text>
            <Text style={styles.programName}>{program.name}</Text>
            <Text style={styles.programDescription}>{program.description}</Text>
          </TouchableOpacity>
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
  programsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  programCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  programIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  programName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  programDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default TrainingScreen;

