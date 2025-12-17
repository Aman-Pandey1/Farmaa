import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VeterinariansScreen = () => {
  const navigation = useNavigation();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Pratap Nagar, Jaipur');
  const [sortBy, setSortBy] = useState<'Nearest to Farthest' | 'Farthest to Nearest'>('Nearest to Farthest');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const categories = [
    'All',
    'Veterinarians',
    'Pet Shops',
    'Hospitals',
    'Pet Hotels/Hostels',
    'NGOs',
    'Shelters',
    'Rescue Centers',
    'Pet Cremation',
  ];

  const services = [
    {
      id: '1',
      name: 'DOG MART',
      distance: '0.6 km away',
      address:
        'Plot No 173, 200 NH9Co, Sangamner Sector 17, Pratap Nagar, Jaipur, Rajasthan',
      image: '🏪',
      category: 'Pet Shops',
    },
    {
      id: '2',
      name: 'DOG MART',
      distance: '0.8 km away',
      address:
        'Plot No 173, 200 NH9Co, Sangamner Sector 17, Pratap Nagar, Jaipur, Rajasthan',
      image: '🏪',
      category: 'Pet Shops',
    },
    {
      id: '3',
      name: 'DOG MART',
      distance: '1.2 km away',
      address:
        'Plot No 173, 200 NH9Co, Sangamner Sector 17, Pratap Nagar, Jaipur, Rajasthan',
      image: '🏪',
      category: 'Veterinarians',
    },
    {
      id: '4',
      name: 'DOG MART',
      distance: '1.5 km away',
      address:
        'Plot No 173, 200 NH9Co, Sangamner Sector 17, Pratap Nagar, Jaipur, Rajasthan',
      image: '🏪',
      category: 'NGOs',
    },
  ];

  let filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter((service) => service.category === selectedCategory);

  // Sort services based on sortBy
  if (sortBy === 'Farthest to Nearest') {
    filteredServices = [...filteredServices].reverse();
  }

  // Show empty state if no services
  const shouldShowEmpty = showEmptyState || filteredServices.length === 0;

  const handleCall = (serviceId: string) => {
    // Call logic
    console.log('Calling service:', serviceId);
  };

  const handleDirection = (serviceId: string) => {
    // Direction logic
    console.log('Getting directions to:', serviceId);
  };

  const handleSearch = () => {
    navigation.navigate('VetSearch' as never, { searchQuery } as never);
  };

  const renderServiceItem = ({ item }: { item: any }) => (
    <View style={styles.serviceCard}>
      <View style={styles.serviceImage}>
        <Text style={styles.serviceImageEmoji}>{item.image}</Text>
      </View>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDistance}>{item.distance}</Text>
        <Text style={styles.serviceAddress}>{item.address}</Text>
        <View style={styles.serviceActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleCall(item.id)}
          >
            <Text style={styles.actionButtonIcon}>📞</Text>
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDirection(item.id)}
          >
            <Text style={styles.actionButtonIcon}>🧭</Text>
            <Text style={styles.actionButtonText}>Direction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vet Services</Text>
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() => navigation.navigate('ChangeLocation' as never)}
        >
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>{currentLocation}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Vet Services"
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Text style={styles.micIcon}>🎤</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortIcon}
          onPress={() => setShowSortModal(true)}
        >
          <Text style={styles.sortIconText}>⇅</Text>
        </TouchableOpacity>
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category &&
                  styles.categoryButtonTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Services List or Empty State */}
      {shouldShowEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Vet Services Nearby</Text>
          <Text style={styles.emptyDescription}>
            We couldn't find any veterinary services in your current area. Try
            changing your location to discover available options.
          </Text>
          <Text style={styles.emptySubtext}>
            Healthy pets start with the right care.
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('ChangeLocation' as never)}
          >
            <Text style={styles.emptyButtonText}>Change Location →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={renderServiceItem}
          contentContainerStyle={styles.servicesList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Location Permission Modal */}
      <Modal
        visible={showLocationModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.locationModalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.locationIconContainer}>
                <Text style={styles.locationModalIcon}>📍</Text>
              </View>
              <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                <Text style={styles.closeModalIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Location Access Needed</Text>
            <Text style={styles.modalDescription}>
              Allow location access to show you the most accurate nearby
              veterinary services.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.notNowButton}
                onPress={() => setShowLocationModal(false)}
              >
                <Text style={styles.notNowButtonText}>Not Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.allowButton}
                onPress={() => setShowLocationModal(false)}
              >
                <Text style={styles.allowButtonText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sort By Modal */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="slide"
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
                <View style={styles.closeSortButton}>
                  <Text style={styles.closeSortIcon}>✕</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => {
                setSortBy('Nearest to Farthest');
                setShowSortModal(false);
              }}
            >
              <View style={styles.radioButton}>
                {sortBy === 'Nearest to Farthest' && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <Text style={styles.sortOptionText}>Nearest to Farthest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => {
                setSortBy('Farthest to Nearest');
                setShowSortModal(false);
              }}
            >
              <View style={styles.radioButton}>
                {sortBy === 'Farthest to Nearest' && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <Text style={styles.sortOptionText}>Farthest to Nearest</Text>
            </TouchableOpacity>
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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationIcon: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    padding: 8,
  },
  micIcon: {
    fontSize: 20,
  },
  sortIcon: {
    padding: 8,
  },
  sortIconText: {
    fontSize: 18,
    color: '#6B7280',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  servicesList: {
    padding: 20,
    paddingBottom: 100,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  serviceImageEmoji: {
    fontSize: 50,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  serviceDistance: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '600',
    marginBottom: 6,
  },
  serviceAddress: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 12,
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonIcon: {
    fontSize: 16,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
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
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  locationIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationModalIcon: {
    fontSize: 30,
  },
  closeModalIcon: {
    fontSize: 24,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 30,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  notNowButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  notNowButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  allowButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  allowButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sortModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  sortModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  sortModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeSortButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeSortIcon: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1E3A8A',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 100,
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

export default VeterinariansScreen;
