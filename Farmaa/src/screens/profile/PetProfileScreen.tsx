import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const imageSize = (width - 60) / 3;

const PetProfileScreen = () => {
  const navigation = useNavigation();
  const [activePet, setActivePet] = useState<'Chitty' | 'Otty'>('Chitty');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const pets = {
    Chitty: {
      name: 'Chitty',
      age: '2 Years',
      description:
        'Lorem metus porttitor purus enim. Non et mauris quam porttitor faucibus id.',
      profileImage: '🐕',
      posts: [
        { id: '1', image: '🐕', views: 456 },
        { id: '2', image: '👶🐕', views: 456 },
        { id: '3', image: '🐕', views: 455 },
        { id: '4', image: '🐕', views: 456 },
        { id: '5', image: '👶🐕', views: 456 },
        { id: '6', image: '🐕', views: 455 },
      ],
    },
    Otty: {
      name: 'Otty',
      age: '1 Year',
      description:
        'Otty is a playful and energetic dog who loves to explore.',
      profileImage: '🐕',
      posts: [
        { id: '1', image: '🐕', views: 234 },
        { id: '2', image: '🐕', views: 189 },
        { id: '3', image: '🐕', views: 312 },
        { id: '4', image: '🐕', views: 267 },
        { id: '5', image: '🐕', views: 198 },
        { id: '6', image: '🐕', views: 245 },
      ],
    },
  };

  const currentPet = pets[activePet];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Profile</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddPetProfile' as never)}
        >
          <Text style={styles.addButton}>+Add Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pet Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activePet === 'Chitty' && styles.tabActive,
            ]}
            onPress={() => setActivePet('Chitty')}
          >
            <Text
              style={[
                styles.tabText,
                activePet === 'Chitty' && styles.tabTextActive,
              ]}
            >
              Chitty
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activePet === 'Otty' && styles.tabActive,
            ]}
            onPress={() => setActivePet('Otty')}
          >
            <Text
              style={[
                styles.tabText,
                activePet === 'Otty' && styles.tabTextActive,
              ]}
            >
              Otty
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileEmoji}>{currentPet.profileImage}</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.petName}>
                {currentPet.name} (Pet Name)
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate('EditPetProfile' as never, {
                    petName: currentPet.name,
                  } as never)
                }
              >
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.petAge}>{currentPet.age}</Text>
            <Text style={styles.petDescription}>{currentPet.description}</Text>
          </View>
        </View>

        {/* Posts Grid or Empty State */}
        {showEmptyState || currentPet.posts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Pet Profile Found</Text>
            <Text style={styles.emptyDescription}>
              Add your pet's details to unlock personalized recommendations and
              features.
            </Text>
            <Text style={styles.emptySubtext}>
              Every great journey begins with a pawprint.
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => {
                setShowEmptyState(false);
                navigation.navigate('AddPetProfile' as never);
              }}
            >
              <Text style={styles.emptyButtonText}>Add Pet Profile →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.postsGrid}>
            {currentPet.posts.map((post) => (
              <TouchableOpacity
                key={post.id}
                style={styles.postItem}
                onPress={() =>
                  navigation.navigate('ViewVideo' as never, {
                    postId: post.id,
                  } as never)
                }
              >
                <View style={styles.postImage}>
                  <Text style={styles.postEmoji}>{post.image}</Text>
                  <View style={styles.viewOverlay}>
                    <Text style={styles.viewIcon}>👁️</Text>
                    <Text style={styles.viewCount}>{post.views}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  addButton: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 30,
  },
  tab: {
    paddingBottom: 10,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#1E3A8A',
  },
  tabText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  tabTextActive: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  profileHeader: {
    padding: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmoji: {
    fontSize: 70,
  },
  profileInfo: {
    width: '100%',
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  editButton: {
    padding: 4,
  },
  editIcon: {
    fontSize: 18,
  },
  petAge: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  petDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 15,
  },
  postItem: {
    width: imageSize,
    height: imageSize,
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  postEmoji: {
    fontSize: 50,
  },
  viewOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },
  viewIcon: {
    fontSize: 12,
  },
  viewCount: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 100,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  emptyButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default PetProfileScreen;

