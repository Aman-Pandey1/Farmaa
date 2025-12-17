import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  Modal,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 50) / 2;

interface Pet {
  id: string;
  name: string;
  age: string;
  location: string;
  image: string;
  type: 'dog' | 'cat' | 'lost' | 'adoption';
  badge?: 'New Listing' | 'Adopt Now';
  badgeColor?: string;
}

const HopeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'Dog' | 'Cat' | 'Lost & Found' | 'Adoption'>('Dog');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Pratap Nagar, Jaipur');

  useEffect(() => {
    const selectedLocation = (route.params as any)?.selectedLocation;
    if (selectedLocation) setCurrentLocation(selectedLocation);
  }, [route.params]);

  const allPets: Pet[] = [
    {
      id: '1',
      name: 'Puppy (Pet Name)',
      age: '6 Months Old',
      location: 'Pratap Nagar, Jaipur',
      image: '🐕',
      type: 'dog',
      badge: 'New Listing',
      badgeColor: '#10B981',
    },
    {
      id: '2',
      name: 'Puppy (Pet Name)',
      age: '6 Months Old',
      location: 'Pratap Nagar, Jaipur',
      image: '🐕',
      type: 'dog',
      badge: 'Adopt Now',
      badgeColor: '#8B5CF6',
    },
    {
      id: '3',
      name: 'Puppy (Pet Name)',
      age: '6 Months Old',
      location: 'Pratap Nagar, Jaipur',
      image: '🐕',
      type: 'dog',
      badge: 'New Listing',
      badgeColor: '#10B981',
    },
    {
      id: '4',
      name: 'Puppy (Pet Name)',
      age: '6 Months Old',
      location: 'Pratap Nagar, Jaipur',
      image: '🐕',
      type: 'dog',
      badge: 'Adopt Now',
      badgeColor: '#8B5CF6',
    },
    {
      id: '5',
      name: 'Kitten (Pet Name)',
      age: '4 Months Old',
      location: 'Pratap Nagar, Jaipur',
      image: '🐱',
      type: 'cat',
      badge: 'New Listing',
      badgeColor: '#10B981',
    },
    {
      id: '6',
      name: 'Kitten (Pet Name)',
      age: '5 Months Old',
      location: 'Pratap Nagar, Jaipur',
      image: '🐱',
      type: 'cat',
      badge: 'Adopt Now',
      badgeColor: '#8B5CF6',
    },
    {
      id: '7',
      name: 'Lost Dog',
      age: '2 Years Old',
      location: 'Pratap Nagar, Jaipur',
      image: '🐕',
      type: 'lost',
      badge: 'New Listing',
      badgeColor: '#10B981',
    },
    {
      id: '8',
      name: 'Found Cat',
      age: '1 Year Old',
      location: 'Pratap Nagar, Jaipur',
      image: '🐱',
      type: 'lost',
    },
  ];

  const categories = ['Dog', 'Cat', 'Lost & Found', 'Adoption'];

  const filteredPets = allPets.filter((pet) => {
    if (activeCategory === 'Dog' && pet.type !== 'dog') return false;
    if (activeCategory === 'Cat' && pet.type !== 'cat') return false;
    if (activeCategory === 'Lost & Found' && pet.type !== 'lost') return false;
    if (activeCategory === 'Adoption' && pet.type !== 'adoption') return false;
    if (searchQuery) {
      return pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             pet.location.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handlePetPress = (pet: Pet) => {
    navigation.navigate('HopeDetail' as never, { pet } as never);
  };

  const renderPetCard = ({ item }: { item: Pet }) => (
    <TouchableOpacity
      style={styles.petCard}
      onPress={() => handlePetPress(item)}
    >
      <View style={styles.petImageContainer}>
        <Text style={styles.petImageEmoji}>{item.image}</Text>
        {item.badge && (
          <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petAge}>{item.age}</Text>
        <Text style={styles.petLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hope</Text>
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() => navigation.navigate('HopeChangeLocation' as never)}
        >
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>{currentLocation}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Pet Now"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Text style={styles.micIcon}>🎤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.filterIconContainer}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortIconContainer}
          onPress={() => setShowSortModal(true)}
        >
          <Text style={styles.sortIcon}>⇅</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              activeCategory === category && styles.categoryTabActive,
            ]}
            onPress={() => setActiveCategory(category as any)}
          >
            <Text
              style={[
                styles.categoryTabText,
                activeCategory === category && styles.categoryTabTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pet Listings Grid / Empty */}
      {filteredPets.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>No Hope Posts in Your Location</Text>
          <Text style={styles.emptyDesc}>
            We couldn&apos;t find any posts for this location right now. Try changing your
            location or check back soon.
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => navigation.navigate('HopeChangeLocation' as never)}
          >
            <Text style={styles.emptyBtnText}>Change location →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredPets}
          keyExtractor={(item) => item.id}
          renderItem={renderPetCard}
          numColumns={2}
          contentContainerStyle={styles.petsGrid}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      )}

      {/* Add Post Button */}
      <TouchableOpacity
        style={styles.addPostButton}
        onPress={() => navigation.navigate('AddHopePost' as never)}
      >
        <Text style={styles.addPostButtonText}>+ Add Post</Text>
      </TouchableOpacity>

      {/* Location Permission Modal (optional) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLocationModal}
        onRequestClose={() => setShowLocationModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLocationModal(false)}
        >
          <View style={styles.locationModalContent}>
            <View style={styles.locationIconCircle}>
              <Text style={styles.locationIconModal}>📍</Text>
            </View>
            <Text style={styles.locationModalTitle}>Location Access Needed</Text>
            <Text style={styles.locationModalDescription}>
              Allow location access to show you the most accurate nearby pets and services.
            </Text>
            <View style={styles.locationModalButtons}>
              <TouchableOpacity
                style={styles.locationModalButtonNotNow}
                onPress={() => setShowLocationModal(false)}
              >
                <Text style={styles.locationModalButtonTextNotNow}>Not Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationModalButtonAllow}
                onPress={() => {
                  setShowLocationModal(false);
                  navigation.navigate('HopeChangeLocation' as never);
                }}
              >
                <Text style={styles.locationModalButtonTextAllow}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.filterModalContent}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.filterPlaceholder}>Filter options coming soon...</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Sort Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSortModal}
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
        >
          <View style={styles.sortModalContent}>
            <View style={styles.sortModalHeader}>
              <Text style={styles.sortModalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sortPlaceholder}>Sort options coming soon...</Text>
          </View>
        </TouchableOpacity>
      </Modal>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  micIcon: {
    fontSize: 20,
  },
  filterIconContainer: {
    padding: 8,
  },
  filterIcon: {
    fontSize: 20,
    color: '#1F2937',
  },
  sortIconContainer: {
    padding: 8,
  },
  sortIcon: {
    fontSize: 20,
    color: '#1F2937',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    marginRight: 10,
  },
  categoryTabActive: {
    backgroundColor: '#1E3A8A',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },
  petsGrid: {
    padding: 20,
    gap: 15,
  },
  petCard: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  petImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  petImageEmoji: {
    fontSize: 60,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  petInfo: {
    padding: 12,
  },
  petName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  petAge: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  petLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  addPostButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addPostButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyWrap: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyDesc: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  emptyBtn: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  locationModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  locationIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationIconModal: {
    fontSize: 30,
  },
  locationModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  locationModalDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  locationModalButtons: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
  locationModalButtonNotNow: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  locationModalButtonTextNotNow: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  locationModalButtonAllow: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
  },
  locationModalButtonTextAllow: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filterModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    maxHeight: '80%',
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalCloseButton: {
    fontSize: 24,
    color: '#6B7280',
  },
  filterPlaceholder: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 40,
  },
  sortModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    maxHeight: '80%',
  },
  sortModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sortModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sortPlaceholder: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 40,
  },
});

export default HopeScreen;

