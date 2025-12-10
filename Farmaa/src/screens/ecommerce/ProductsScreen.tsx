import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// @ts-ignore
import logoImage from '../../assets/images/Logo.png';

const { width } = Dimensions.get('window');

const ProductsScreen = () => {
  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = useState('dog');
  const [selectedCategory, setSelectedCategory] = useState('Shop by Pet');

  // Mock product data
  const dogProducts = [
    { id: 1, name: 'Dog Food', price: '11,999$', rating: 4.5, image: '🦴' },
    { id: 2, name: 'Dog Treats', price: '5,999$', rating: 4.2, image: '🍖' },
    { id: 3, name: 'Dog Toy', price: '2,999$', rating: 4.8, image: '🎾' },
    { id: 4, name: 'Dog Collar', price: '1,999$', rating: 4.3, image: '🦴' },
    { id: 5, name: 'Dog Bed', price: '8,999$', rating: 4.6, image: '🛏️' },
    { id: 6, name: 'Dog Shampoo', price: '1,499$', rating: 4.4, image: '🧴' },
    { id: 7, name: 'Dog Leash', price: '1,299$', rating: 4.7, image: '🦮' },
    { id: 8, name: 'Dog Bowl', price: '999$', rating: 4.5, image: '🥣' },
  ];

  const catProducts = [
    { id: 1, name: 'Cat Food', price: '9,999$', rating: 4.6, image: '🐟' },
    { id: 2, name: 'Cat Treats', price: '4,999$', rating: 4.3, image: '🍣' },
    { id: 3, name: 'Cat Toy', price: '2,499$', rating: 4.9, image: '🐭' },
    { id: 4, name: 'Cat Collar', price: '1,799$', rating: 4.2, image: '🔔' },
    { id: 5, name: 'Cat Bed', price: '7,999$', rating: 4.5, image: '🛏️' },
    { id: 6, name: 'Cat Litter', price: '3,999$', rating: 4.4, image: '📦' },
    { id: 7, name: 'Cat Scratcher', price: '5,999$', rating: 4.8, image: '🌳' },
    { id: 8, name: 'Cat Bowl', price: '899$', rating: 4.6, image: '🥣' },
  ];

  const quickCategories = [
    { id: 1, name: 'Shop by Pet', icon: '🐾' },
    { id: 2, name: 'Food', icon: selectedPet === 'dog' ? '🦴' : '🐟' },
    { id: 3, name: 'Medicine', icon: '💊' },
    { id: 4, name: 'Toys', icon: selectedPet === 'dog' ? '🎾' : '🐭' },
    { id: 5, name: 'Accessories', icon: selectedPet === 'dog' ? '🦴' : '🔔' },
    { id: 6, name: 'Grooming', icon: '✂️' },
    { id: 7, name: 'Training', icon: '🎓' },
  ];

  const everydayEssentials = [
    { id: 1, name: 'Food', icon: selectedPet === 'dog' ? '🦴' : '🐟' },
    { id: 2, name: 'Treats', icon: selectedPet === 'dog' ? '🍖' : '🍣' },
    { id: 3, name: 'Diet', icon: '🥫' },
    { id: 4, name: 'Supplements', icon: '💊' },
    { id: 5, name: 'Toys', icon: selectedPet === 'dog' ? '🎾' : '🐭' },
    { id: 6, name: 'Grooming', icon: '✂️' },
    { id: 7, name: 'Bowls', icon: '🥣' },
    { id: 8, name: 'Premium', icon: '⭐' },
  ];

  const products = selectedPet === 'dog' ? dogProducts : catProducts;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerAppName}>FURRMAA</Text>
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
            <TextInput
              style={styles.searchInput}
              placeholder="Search for products..."
              placeholderTextColor="#9CA3AF"
            />
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
            <TouchableOpacity
              key={category.id}
              style={[
                styles.quickCategoryItem,
                selectedCategory === category.name && styles.quickCategoryItemActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <View
                style={[
                  styles.quickCategoryIcon,
                  selectedCategory === category.name && styles.quickCategoryIconActive,
                ]}
              >
                <Text style={styles.quickCategoryIconText}>{category.icon}</Text>
              </View>
              <Text
                style={[
                  styles.quickCategoryText,
                  selectedCategory === category.name && styles.quickCategoryTextActive,
                ]}
              >
                {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

        {/* Promotional Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.mainBanner}>
            <Text style={styles.bannerText}>Get 1 Back on every 500$</Text>
            <Text style={styles.bannerSubtext}>
              {selectedPet === 'dog' ? '🐕' : '🐱'} Special Offer
            </Text>
          </View>
        </View>

        {/* Training Banners */}
        <View style={styles.trainingBannersContainer}>
          <View style={styles.trainingBanner}>
            <Text style={styles.trainingBannerTitle}>
              {selectedPet === 'dog' ? 'Dog' : 'Cat'} Training
            </Text>
            <Text style={styles.trainingBannerSubtitle}>Expert Training Programs</Text>
          </View>
        </View>

        {/* Everyday Essentials */}
        <View style={styles.essentialsContainer}>
          <Text style={styles.sectionTitle}>Everyday Essentials</Text>
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

        {/* Product Grid - All New Releases */}
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>All New Releases</Text>
          <View style={styles.productsGrid}>
            {products.slice(0, 4).map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductDetail' as never)}
              >
                <View style={styles.productImage}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <View style={styles.productRating}>
                  <Text style={styles.ratingText}>⭐ {product.rating}</Text>
                </View>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Specially Curated */}
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Specially Curated</Text>
          <View style={styles.productsGrid}>
            {products.slice(4, 8).map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductDetail' as never)}
              >
                <View style={styles.productImage}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <View style={styles.productRating}>
                  <Text style={styles.ratingText}>⭐ {product.rating}</Text>
                </View>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* New Arrivals */}
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <View style={styles.productsGrid}>
            {products.slice(0, 4).map((product) => (
              <TouchableOpacity
                key={`new-${product.id}`}
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductDetail' as never)}
              >
                <View style={styles.productImage}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <View style={styles.productRating}>
                  <Text style={styles.ratingText}>⭐ {product.rating}</Text>
                </View>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
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
  quickCategoryItemActive: {
    // Active state styling
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
  quickCategoryIconActive: {
    backgroundColor: '#8B5CF6',
  },
  quickCategoryIconText: {
    fontSize: 24,
  },
  quickCategoryText: {
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
  quickCategoryTextActive: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  bannerContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  mainBanner: {
    width: '100%',
    height: 120,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bannerSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  trainingBannersContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  trainingBanner: {
    width: '100%',
    height: 100,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
  },
  trainingBannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  trainingBannerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  essentialsContainer: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  sectionTitle: {
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
  productsContainer: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 45) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  productEmoji: {
    fontSize: 50,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 5,
    minHeight: 36,
  },
  productRating: {
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  bottomPadding: {
    height: 100,
  },
});

export default ProductsScreen;
