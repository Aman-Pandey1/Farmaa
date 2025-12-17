import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddHopePostScreen = () => {
  const navigation = useNavigation();
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [postType, setPostType] = useState<'adoption' | 'lostFound'>('adoption');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);

  const photoThumbs = useMemo(() => ['🐶', '🐶', '🐶', '🐶', '🐶'], []);

  const canPost = !!petName.trim() && !!petAge.trim() && !!location.trim();

  const handlePost = () => {
    // Logic to post
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Post</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Top toggles */}
        <View style={styles.topToggleRow}>
          <TouchableOpacity
            style={[styles.togglePill, postType === 'adoption' && styles.togglePillActive]}
            onPress={() => setPostType('adoption')}
          >
            <Text style={[styles.toggleText, postType === 'adoption' && styles.toggleTextActive]}>
              Adoption
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.togglePill, postType === 'lostFound' && styles.togglePillActive]}
            onPress={() => setPostType('lostFound')}
          >
            <Text style={[styles.toggleText, postType === 'lostFound' && styles.toggleTextActive]}>
              Lost & Found
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.topToggleRow}>
          <TouchableOpacity
            style={[styles.togglePillSm, petType === 'dog' && styles.togglePillActive]}
            onPress={() => setPetType('dog')}
          >
            <Text style={[styles.toggleTextSm, petType === 'dog' && styles.toggleTextActive]}>
              Dog
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.togglePillSm, petType === 'cat' && styles.togglePillActive]}
            onPress={() => setPetType('cat')}
          >
            <Text style={[styles.toggleTextSm, petType === 'cat' && styles.toggleTextActive]}>
              Cat
            </Text>
          </TouchableOpacity>
        </View>

        {/* Photo preview */}
        <View style={styles.photoCard}>
          <View style={styles.photoPreview}>
            <Text style={styles.photoEmoji}>{photoThumbs[selectedPhotoIdx]}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbRow}>
            {photoThumbs.map((p, idx) => (
              <TouchableOpacity
                key={`${p}-${idx}`}
                style={[styles.thumb, idx === selectedPhotoIdx && styles.thumbActive]}
                onPress={() => setSelectedPhotoIdx(idx)}
              >
                <Text style={styles.thumbEmoji}>{p}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Pet Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Pet Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pet name"
            placeholderTextColor="#9CA3AF"
            value={petName}
            onChangeText={setPetName}
          />
        </View>

        {/* Pet Age */}
        <View style={styles.section}>
          <Text style={styles.label}>Pet Age</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 6 Months Old"
            placeholderTextColor="#9CA3AF"
            value={petAge}
            onChangeText={setPetAge}
          />
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            placeholderTextColor="#9CA3AF"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Pet Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter pet description..."
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Post Button */}
        <TouchableOpacity
          style={[styles.postButton, !canPost && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={!canPost}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
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
  headerSpacer: {
    width: 24,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  topToggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  togglePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  togglePillSm: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  togglePillActive: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  toggleTextSm: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  photoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  photoPreview: {
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  photoEmoji: { fontSize: 64 },
  thumbRow: { gap: 10, paddingVertical: 2 },
  thumb: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbActive: { borderColor: '#1E3A8A', backgroundColor: '#E5E7EB' },
  thumbEmoji: { fontSize: 26 },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 120,
  },
  postButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AddHopePostScreen;

