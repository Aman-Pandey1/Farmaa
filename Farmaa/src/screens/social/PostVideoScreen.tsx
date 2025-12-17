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

const PostVideoScreen = () => {
  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = useState<string>('Chitty');
  const [caption, setCaption] = useState('');

  const pets = [
    {
      id: '1',
      name: 'Chitty',
      image: '🐕',
    },
    {
      id: '2',
      name: 'Otty',
      image: '🐕',
    },
  ];

  const handlePost = () => {
    // Post logic here
    navigation.goBack();
    navigation.goBack(); // Go back to feed
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video Preview */}
        <View style={styles.videoPreview}>
          <Text style={styles.videoPlaceholder}>📹</Text>
          <Text style={styles.videoText}>Video Preview</Text>
        </View>

        {/* Select Pet Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Select Pet Profile to Post Video
          </Text>
          <View style={styles.petProfilesContainer}>
            {pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={styles.petProfileButton}
                onPress={() => setSelectedPet(pet.name)}
              >
                <View
                  style={[
                    styles.petProfileImage,
                    selectedPet === pet.name && styles.petProfileImageSelected,
                  ]}
                >
                  <Text style={styles.petProfileEmoji}>{pet.image}</Text>
                </View>
                <Text
                  style={[
                    styles.petProfileName,
                    selectedPet === pet.name && styles.petProfileNameSelected,
                  ]}
                >
                  {pet.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Caption Section */}
        <View style={styles.section}>
          <View style={styles.captionHeader}>
            <Text style={styles.captionLabel}>Write Caption...</Text>
            <Text style={styles.characterCount}>
              {caption.length}/400
            </Text>
          </View>
          <TextInput
            style={styles.captionInput}
            placeholder="Write Caption..."
            placeholderTextColor="#9CA3AF"
            value={caption}
            onChangeText={setCaption}
            multiline
            maxLength={400}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Post Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.postButton,
            (!selectedPet || !caption.trim()) && styles.postButtonDisabled,
          ]}
          onPress={handlePost}
          disabled={!selectedPet || !caption.trim()}
        >
          <Text
            style={[
              styles.postButtonText,
              (!selectedPet || !caption.trim()) &&
                styles.postButtonTextDisabled,
            ]}
          >
            Post →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#000000',
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  videoPreview: {
    width: '100%',
    height: 400,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  videoPlaceholder: {
    fontSize: 80,
    marginBottom: 10,
  },
  videoText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.6,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  petProfilesContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  petProfileButton: {
    alignItems: 'center',
    gap: 8,
  },
  petProfileImage: {
    width: 70,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#374151',
  },
  petProfileImageSelected: {
    backgroundColor: '#374151',
    borderColor: '#6B7280',
  },
  petProfileEmoji: {
    fontSize: 30,
  },
  petProfileName: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  petProfileNameSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  captionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  captionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  characterCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  captionInput: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    color: '#FFFFFF',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#374151',
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#000000',
  },
  postButton: {
    backgroundColor: '#374151',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#374151',
    opacity: 0.5,
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  postButtonTextDisabled: {
    color: '#6B7280',
  },
});

export default PostVideoScreen;

