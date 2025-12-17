import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddPetProfileScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(3);
  const totalSteps = 5;
  const [petType, setPetType] = useState<'Dog' | 'Cat'>('Dog');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('6 Months');

  const ageOptions = [
    '6 Months',
    '1 Year',
    '2 Year',
    '3 Year',
    '4 Year',
    '5 Year',
    '6 Year',
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete and navigate
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Pet Profile</Text>
        <Text style={styles.progressText}>
          {currentStep}/{totalSteps}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View style={styles.profilePictureSection}>
          <View style={styles.profilePicturePlaceholder}>
            <Text style={styles.pawIcon}>🐾</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.uploadText}>Upload Pet Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Pet Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Pet Type</Text>
          <View style={styles.petTypeContainer}>
            <TouchableOpacity
              style={[
                styles.petTypeButton,
                petType === 'Dog' && styles.petTypeButtonSelected,
              ]}
              onPress={() => setPetType('Dog')}
            >
              <Text style={styles.petTypeIcon}>🐕</Text>
              <Text
                style={[
                  styles.petTypeText,
                  petType === 'Dog' && styles.petTypeTextSelected,
                ]}
              >
                Dog
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.petTypeButton,
                petType === 'Cat' && styles.petTypeButtonSelected,
              ]}
              onPress={() => setPetType('Cat')}
            >
              <Text style={styles.petTypeIcon}>🐱</Text>
              <Text
                style={[
                  styles.petTypeText,
                  petType === 'Cat' && styles.petTypeTextSelected,
                ]}
              >
                Cat
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pet Name Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Pet Name</Text>
          <TextInput
            style={styles.input}
            value={petName}
            onChangeText={setPetName}
            placeholder="Enter Pet Name"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Pet Age Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How old is your pet?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ageContainer}
          >
            {ageOptions.map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.ageButton,
                  petAge === age && styles.ageButtonSelected,
                ]}
                onPress={() => setPetAge(age)}
              >
                <Text
                  style={[
                    styles.ageButtonText,
                    petAge === age && styles.ageButtonTextSelected,
                  ]}
                >
                  {age}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Add Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.addButton,
            (!petName.trim() || !petAge) && styles.addButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!petName.trim() || !petAge}
        >
          <Text
            style={[
              styles.addButtonText,
              (!petName.trim() || !petAge) && styles.addButtonTextDisabled,
            ]}
          >
            Add Pet Profile →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profilePicturePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  pawIcon: {
    fontSize: 50,
  },
  uploadText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 15,
  },
  petTypeContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  petTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  petTypeButtonSelected: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  petTypeIcon: {
    fontSize: 20,
  },
  petTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  petTypeTextSelected: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  ageContainer: {
    gap: 12,
    paddingRight: 20,
  },
  ageButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  ageButtonSelected: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  ageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  ageButtonTextSelected: {
    color: '#FFFFFF',
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  addButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButtonTextDisabled: {
    color: '#9CA3AF',
  },
});

export default AddPetProfileScreen;

