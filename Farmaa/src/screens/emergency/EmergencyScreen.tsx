import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

const EmergencyScreen = () => {
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');

  const emergencyTypes = [
    { id: 'medical', name: 'Medical Emergency', icon: '🏥' },
    { id: 'lost', name: 'Lost Pet', icon: '🔍' },
    { id: 'accident', name: 'Accident', icon: '🚨' },
    { id: 'other', name: 'Other', icon: '⚠️' },
  ];

  const submitEmergency = () => {
    if (!emergencyType || !description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Emergency request submitted. Help is on the way!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency</Text>
        <Text style={styles.headerSubtitle}>We're here to help 24/7</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Emergency Type</Text>
        <View style={styles.emergencyTypes}>
          {emergencyTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.emergencyTypeCard,
                emergencyType === type.id && styles.emergencyTypeCardActive,
              ]}
              onPress={() => setEmergencyType(type.id)}
            >
              <Text style={styles.emergencyIcon}>{type.icon}</Text>
              <Text style={styles.emergencyTypeName}>{type.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Describe the Emergency</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Please provide details..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
        />
      </View>

      <TouchableOpacity style={styles.emergencyButton} onPress={submitEmergency}>
        <Text style={styles.emergencyButtonText}>🚨 Request Emergency Help</Text>
      </TouchableOpacity>

      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Need Immediate Help?</Text>
        <Text style={styles.helpNumber}>📞 Call: 1800-PET-HELP</Text>
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
    backgroundColor: '#FF6B6B',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emergencyTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emergencyTypeCard: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  emergencyTypeCardActive: {
    backgroundColor: '#FF6B6B',
  },
  emergencyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emergencyTypeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  emergencyButton: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  helpSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  helpNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});

export default EmergencyScreen;

