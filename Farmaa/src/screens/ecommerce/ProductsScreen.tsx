import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// @ts-ignore
import logoImage from '../../assets/images/Logo.png';

const { width } = Dimensions.get('window');

const ProductsScreen = () => {
  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = useState('dog');

  const quickCategories = [
    { id: 1, name: 'Shop by Pet', icon: '🐾' },
    { id: 2, name: 'Food', icon: '🍖' },
    { id: 3, name: 'Medicine', icon: '💊' },
    { id: 4, name: 'Toys', icon: '🎾' },
    { id: 5, name: 'Accessories', icon: '🦴' },
    { id: 6, name: 'Grooming', icon: '✂️' },
    { id: 7, name: 'Training', icon: '🎓' },
  ];

  const everydayEssentials = [
    { id: 1, name: 'Food', icon: '🍽️' },
    { id: 2, name: 'Treats', icon: '🦴' },
    { id: 3, name: 'Diet', icon: '🥫' },
    { id: 4, name: 'Supplements', icon: '💊' },
    { id: 5, name: 'Toys', icon: '🎾' },
    { id: 6, name: 'Grooming', icon: '✂️' },
    { id: 7, name: 'Bowls', icon: '🥣' },
    { id: 8, name: 'Premium', icon: '⭐' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerAppName}>FLUFFMAA</Text>
            <Text style={styles.headerTagline}>WE CARE FOR YOUR PETS AS FAMILY</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>HONG KONG</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pet Category Selector */}
        <View style={styles.petSelectorContainer}>
          <TouchableOpacity
            style={[
              styles.petSelectorButton,
              selectedPet === 'dog' && styles.petSelectorButtonActive,
            ]}
            onPress={() => setSelectedPet('dog')}
          >
            <Text
              style={[
                styles.petSelectorText,
                selectedPet === 'dog' && styles.petSelectorTextActive,
              ]}
            >
              Dog Essentials
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.petSelectorButton,
              selectedPet === 'cat' && styles.petSelectorButtonActive,
            ]}
            onPress={() => setSelectedPet('cat')}
          >
            <Text
              style={[
                styles.petSelectorText,
                selectedPet === 'cat' && styles.petSelectorTextActive,
              ]}
            >
              Cat Essentials
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Text style={styles.searchPlaceholder}>
              Search beyond food, toys, brands & more...
            </Text>
            <View style={styles.searchIcons}>
              <TouchableOpacity style={styles.searchIconButton}>
                <Text style={styles.searchIcon}>🎤</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.searchIconButton}>
                <Text style={styles.searchIcon}>☰</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Access Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickCategoriesContainer}
          contentContainerStyle={styles.quickCategoriesContent}
        >
          {quickCategories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.quickCategoryItem}>
              <View style={styles.quickCategoryIcon}>
                <Text style={styles.quickCategoryIconText}>{category.icon}</Text>
              </View>
              <Text style={styles.quickCategoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Promotional Banners */}
        <View style={styles.bannersContainer}>
          <View style={styles.mainBanner}>
            <View style={styles.bannerGradient}>
              <Text style={styles.bannerTitle}>MORE FOOD, MORE JOY, MORE TAIL WAGGING.</Text>
              <Text style={styles.bannerSubtitle}>BUY 3 KG AND GET 1 KG FREE</Text>
              <View style={styles.bannerDog}>
                <Text style={styles.bannerDogEmoji}>🐕</Text>
              </View>
            </View>
          </View>
          <View style={styles.sideBanner}>
            <Text style={styles.sideBannerTitle}>TOP 3 DOG FO IN CANADA</Text>
            <Text style={styles.sideBannerSubtitle}>
              Discover what's best for your furry friend
            </Text>
          </View>
        </View>

        {/* Everyday Essentials */}
        <View style={styles.essentialsContainer}>
          <Text style={styles.essentialsTitle}>Everyday Essentials</Text>
          <View style={styles.essentialsGrid}>
            {everydayEssentials.map((item) => (
              <TouchableOpacity key={item.id} style={styles.essentialItem}>
                <View style={styles.essentialIcon}>
                  <Text style={styles.essentialIconText}>{item.icon}</Text>
                </View>
                <Text style={styles.essentialText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    marginRight: 12,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    flex: 1,
  },
  headerAppName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  headerTagline: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '300',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    fontSize: 14,
  },
  locationText: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '500',
  },
  iconButton: {
    padding: 5,
  },
  iconText: {
    fontSize: 20,
  },
  petSelectorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
  },
  petSelectorButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  petSelectorButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  petSelectorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  petSelectorTextActive: {
    color: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF',
  },
  searchIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  searchIconButton: {
    padding: 5,
  },
  searchIcon: {
    fontSize: 18,
  },
  quickCategoriesContainer: {
    marginBottom: 20,
  },
  quickCategoriesContent: {
    paddingHorizontal: 15,
    gap: 15,
  },
  quickCategoryItem: {
    alignItems: 'center',
    width: 70,
  },
  quickCategoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickCategoryIconText: {
    fontSize: 24,
  },
  quickCategoryText: {
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
  bannersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 25,
    gap: 10,
  },
  mainBanner: {
    flex: 2,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerGradient: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    padding: 20,
    justifyContent: 'space-between',
    position: 'relative',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bannerDog: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  bannerDogEmoji: {
    fontSize: 80,
  },
  sideBanner: {
    flex: 1,
    height: 180,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
  },
  sideBannerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sideBannerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  essentialsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  essentialsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  essentialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  essentialItem: {
    width: (width - 45) / 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  essentialIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  essentialIconText: {
    fontSize: 24,
  },
  essentialText: {
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
});

export default ProductsScreen;
