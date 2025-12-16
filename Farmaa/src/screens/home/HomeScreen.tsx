import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  StatusBar,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

// @ts-ignore
import logoImage from '../../assets/images/Logo.png';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [selectedPet, setSelectedPet] = useState<'dog' | 'cat'>('dog');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentSideBannerIndex, setCurrentSideBannerIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const bannerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sideBannerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Banner data for carousel
  const mainBanners = [
    {
      id: 1,
      title: 'MORE FOOD. MORE JOY. MORE TAIL WAGGING.',
      buttonText: 'BUY 3 KG AND GET 1 KG FREE',
      emoji: selectedPet === 'dog' ? '🐕' : '🐱',
    },
    {
      id: 2,
      title: 'PREMIUM QUALITY FOR YOUR PET',
      buttonText: 'SHOP NOW',
      emoji: selectedPet === 'dog' ? '🦴' : '🐟',
    },
    {
      id: 3,
      title: 'HEALTHY PETS, HAPPY HOME',
      buttonText: 'EXPLORE DEALS',
      emoji: selectedPet === 'dog' ? '🎾' : '🐭',
    },
  ];

  const sideBanners = [
    { id: 1, text: `TOP 5 ${selectedPet === 'dog' ? 'DOG' : 'CAT'} FOOD`, emoji: selectedPet === 'dog' ? '🦴' : '🐟' },
    { id: 2, text: `BEST ${selectedPet === 'dog' ? 'DOG' : 'CAT'} TOYS`, emoji: selectedPet === 'dog' ? '🎾' : '🐭' },
    { id: 3, text: `TOP GROOMING PRODUCTS`, emoji: '✂️' },
    { id: 4, text: `PREMIUM ACCESSORIES`, emoji: selectedPet === 'dog' ? '🦴' : '🔔' },
    { id: 5, text: `HEALTH SUPPLEMENTS`, emoji: '💊' },
  ];

  // Calculate banner width
  const bannerWidth = (width - 40) * (2 / 3) - 10; // 2/3 of available width minus gap

  // Auto-slide banner effect
  useEffect(() => {
    // Reset timer when pet type changes
    setCurrentBannerIndex(0);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: false });
    }

    // Clear existing timer
    if (bannerTimerRef.current) {
      clearInterval(bannerTimerRef.current);
    }

    // Set up auto-slide
    bannerTimerRef.current = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % mainBanners.length;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * bannerWidth,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3000); // Change banner every 3 seconds

    return () => {
      if (bannerTimerRef.current) {
        clearInterval(bannerTimerRef.current);
      }
    };
  }, [selectedPet, bannerWidth]);

  // Auto-slide side banner effect
  useEffect(() => {
    // Reset side banner when pet type changes
    setCurrentSideBannerIndex(0);

    // Clear existing timer
    if (sideBannerTimerRef.current) {
      clearInterval(sideBannerTimerRef.current);
    }

    // Set up auto-slide for side banner
    sideBannerTimerRef.current = setInterval(() => {
      setCurrentSideBannerIndex((prevIndex) => {
        return (prevIndex + 1) % sideBanners.length;
      });
    }, 3000); // Change side banner every 3 seconds

    return () => {
      if (sideBannerTimerRef.current) {
        clearInterval(sideBannerTimerRef.current);
      }
    };
  }, [selectedPet]);

  // Category icons for horizontal scroll
  const categories = [
    { id: 1, name: 'All For You', icon: '🛍️' },
    { id: 2, name: 'Food', icon: '🦴' },
    { id: 3, name: 'Medicine', icon: '💊' },
    { id: 4, name: 'Toys', icon: '⚽' },
    { id: 5, name: 'Accessories', icon: '🦴' },
    { id: 6, name: 'Grooming', icon: '✂️' },
    { id: 7, name: 'Walk', icon: '🚶' },
    { id: 8, name: 'Feeders', icon: '🥣' },
  ];

  // Everyday Essentials
  const everydayEssentials = selectedPet === 'dog' 
    ? [
        { id: 1, name: 'Food', icon: '🦴' },
        { id: 2, name: 'Treats', icon: '🍖' },
        { id: 3, name: 'Diet', icon: '🥫' },
        { id: 4, name: 'Supplements', icon: '💊' },
      ]
    : [
        { id: 1, name: 'Food', icon: '🐟' },
        { id: 2, name: 'Treats', icon: '🍣' },
        { id: 3, name: 'Litter', icon: '📦' },
        { id: 4, name: 'Supplements', icon: '💊' },
      ];

  // All Round Wellness
  const wellnessCategories = [
    { id: 1, name: 'Kidney Care', icon: '🫘' },
    { id: 2, name: 'De-wormer', icon: '🐛' },
    { id: 3, name: 'Tick & Flea', icon: '🪲' },
    { id: 4, name: 'Joint Care', icon: '🦴' },
    { id: 5, name: 'Immune Care', icon: '💉' },
    { id: 6, name: 'Liver Care', icon: '🫀' },
    { id: 7, name: 'Skin & Hair', icon: '✨' },
    { id: 8, name: 'Dental', icon: '🦷' },
  ];

  // Top Selling Products - Dynamic based on pet type
  const topProducts = selectedPet === 'dog'
    ? [
        { id: 1, name: 'Premium Dog Food', price: '₹599', rating: 4.5, reviews: 120, image: '🦴' },
        { id: 2, name: 'Dog Treats Pack', price: '₹299', rating: 4.8, reviews: 89, image: '🍖' },
        { id: 3, name: 'Grooming Brush', price: '₹199', rating: 4.6, reviews: 156, image: '✂️' },
        { id: 4, name: 'Dog Toy Set', price: '₹399', rating: 4.7, reviews: 203, image: '🎾' },
        { id: 5, name: 'Dog Bed', price: '₹1,299', rating: 4.9, reviews: 98, image: '🛏️' },
        { id: 6, name: 'Dog Leash', price: '₹249', rating: 4.4, reviews: 142, image: '🦮' },
      ]
    : [
        { id: 1, name: 'Whiskas Adult Dry Cat Food...', price: '₹2,229', rating: 5, reviews: 265, image: '🐟' },
        { id: 2, name: 'Nabel K9000000+...', price: '₹980', rating: 5, reviews: 265, image: '💊' },
        { id: 3, name: 'Cat Litter Lavender...', price: '₹549', rating: 5, reviews: 265, image: '📦' },
        { id: 4, name: 'Premium Cat Treats', price: '₹399', rating: 4.8, reviews: 189, image: '🍣' },
        { id: 5, name: 'Cat Grooming Brush', price: '₹299', rating: 4.7, reviews: 156, image: '✂️' },
        { id: 6, name: 'Cat Toy Set', price: '₹449', rating: 4.9, reviews: 203, image: '🐭' },
      ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Image source={logoImage} style={styles.logo} resizeMode="contain" />
            <View style={styles.headerTextContainer}>
              <Text style={styles.logoText}>FURRMAA</Text>
              <Text style={styles.tagline}>WHERE EVERY TAIL FEELS AT HOME</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Cart' as never)}>
            <Text style={styles.cartIcon}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pet Type Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedPet === 'dog' && [styles.tabButtonActive, { backgroundColor: '#3B82F6', borderColor: '#3B82F6' }],
            ]}
            onPress={() => setSelectedPet('dog')}
          >
            <Text style={styles.tabIcon}>🐕</Text>
            <Text
              style={[
                styles.tabText,
                selectedPet === 'dog' && styles.tabTextActive,
              ]}
            >
              Dog Essentials
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedPet === 'cat' && [styles.tabButtonActive, { backgroundColor: '#10B981', borderColor: '#10B981' }],
            ]}
            onPress={() => setSelectedPet('cat')}
          >
            <Text style={styles.tabIcon}>🐱</Text>
            <Text
              style={[
                styles.tabText,
                selectedPet === 'cat' && styles.tabTextActive,
              ]}
            >
              Cat Essentials
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <TouchableOpacity
              style={styles.searchInputContainer}
              onPress={() => navigation.navigate('Search' as never)}
            >
              <Text style={styles.searchIcon}>🔍</Text>
              <Text style={styles.searchPlaceholder}>
                Search food, toys, meds & more...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.micButton}>
              <Text style={styles.micIcon}>🎤</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('Filter' as never)}
          >
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Category Icons - Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => navigation.navigate('Products' as never)}
            >
              <View style={styles.categoryIcon}>
                <Text style={styles.categoryIconText}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Promotional Banners */}
        <View style={styles.bannersContainer}>
          <View style={styles.mainBannerWrapper}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              style={styles.bannerScrollView}
              contentContainerStyle={{ width: bannerWidth * mainBanners.length }}
            >
              {mainBanners.map((banner, index) => (
                <View
                  key={banner.id}
                  style={[
                    styles.mainBanner,
                    selectedPet === 'cat' && styles.mainBannerCat,
                    { width: bannerWidth },
                  ]}
                >
                  <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>{banner.title}</Text>
                    <TouchableOpacity style={styles.bannerButton}>
                      <Text style={styles.bannerButtonText}>
                        {banner.buttonText}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.bannerImage}>
                    <Text style={styles.bannerEmoji}>{banner.emoji}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            {/* Banner Indicators */}
            <View style={styles.bannerIndicators}>
              {mainBanners.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicatorDot,
                    currentBannerIndex === index && styles.indicatorDotActive,
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={styles.sideBanner}>
            <View style={styles.sideBannerIndicator}>
              <Text style={styles.indicatorText}>
                {currentSideBannerIndex + 1}/{sideBanners.length}
              </Text>
            </View>
            <Text style={styles.sideBannerText}>
              {sideBanners[currentSideBannerIndex].text}
            </Text>
            <Text style={styles.sideBannerEmoji}>
              {sideBanners[currentSideBannerIndex].emoji}
            </Text>
          </View>
        </View>

        {/* Everyday Essentials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Everyday Essentials</Text>
          <View style={styles.essentialsGrid}>
            {everydayEssentials.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.essentialCard}
                onPress={() => navigation.navigate('Products' as never)}
              >
                <View style={styles.essentialIcon}>
                  <Text style={styles.essentialIconText}>{item.icon}</Text>
                </View>
                <Text style={styles.essentialName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* More Everyday Essentials Icons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.moreEssentialsScroll}
          contentContainerStyle={styles.moreEssentialsContent}
        >
          {selectedPet === 'dog' 
            ? categories.slice(4).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => navigation.navigate('Products' as never)}
                >
                  <View style={styles.categoryIcon}>
                    <Text style={styles.categoryIconText}>{category.icon}</Text>
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))
            : [
                { id: 5, name: 'Toys', icon: '🐭' },
                { id: 6, name: 'Grooming', icon: '✂️' },
                { id: 7, name: 'Walk', icon: '🚶' },
                { id: 8, name: 'Feeders', icon: '🥣' },
              ].map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => navigation.navigate('Products' as never)}
                >
                  <View style={styles.categoryIcon}>
                    <Text style={styles.categoryIconText}>{category.icon}</Text>
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))
          }
        </ScrollView>

        {/* Training Banner */}
        <View style={styles.trainingBanner}>
          <Text style={styles.trainingBannerText}>
            {selectedPet === 'dog' ? 'Dog' : 'Cat'} Training
          </Text>
          <Text style={styles.trainingBannerEmoji}>
            {selectedPet === 'dog' ? '🐕' : '🐱'}
          </Text>
        </View>

        {/* All Round Wellness */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Round Wellness</Text>
          <View style={styles.wellnessGrid}>
            {wellnessCategories.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.wellnessCard}
                onPress={() => navigation.navigate('Products' as never)}
              >
                <View style={styles.wellnessIcon}>
                  <Text style={styles.wellnessIconText}>{item.icon}</Text>
                </View>
                <Text style={styles.wellnessName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Find a New Friend Banner / We Care Banner */}
        {selectedPet === 'cat' ? (
          <View style={styles.findFriendBanner}>
            <View style={styles.findFriendContent}>
              <Text style={styles.findFriendTitle}>FIND A NEW FRIEND</Text>
            </View>
            <Text style={styles.findFriendEmoji}>🐱</Text>
          </View>
        ) : (
          <View style={styles.careBanner}>
            <View style={styles.careBannerContent}>
              <Text style={styles.careBannerTitle}>We Care About Your Pet</Text>
              <Text style={styles.careBannerSubtitle}>
                Professional veterinary care
              </Text>
            </View>
            <Text style={styles.careBannerEmoji}>👨‍⚕️</Text>
          </View>
        )}

        {/* Top Selling Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top-Selling Products</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Products' as never)}>
              <Text style={styles.seeAllText}>See All &gt;</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScrollContent}
          >
            {topProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductDetail' as never, { product } as never)}
              >
                <View style={styles.productImage}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <View style={styles.productRating}>
                  <Text style={styles.ratingStars}>
                    {'⭐'.repeat(Math.floor(product.rating))}
                  </Text>
                  <Text style={styles.reviewsText}>({product.reviews})</Text>
                </View>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>ADD</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Find Pets for Adoption Banner */}
        <TouchableOpacity
          style={styles.adoptionBanner}
          onPress={() => navigation.navigate('Adoption' as never)}
        >
          <Text style={styles.adoptionBannerText}>
            Find Pets for Adoption & Sale Near You
          </Text>
          <View style={styles.adoptionBannerIcons}>
            <Text style={styles.adoptionBannerEmoji}>🐶</Text>
            <Text style={styles.adoptionBannerEmoji}>🐱</Text>
          </View>
        </TouchableOpacity>

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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  tagline: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '400',
  },
  cartIcon: {
    fontSize: 24,
    color: '#1F2937',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabButtonActive: {
    backgroundColor: '#3B82F6', // Blue for dog, will be overridden for cat
    borderColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 15,
    gap: 10,
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF',
  },
  micButton: {
    marginLeft: 10,
    padding: 5,
  },
  micIcon: {
    fontSize: 20,
    color: '#6B7280',
  },
  filterIcon: {
    fontSize: 20,
    color: '#1F2937',
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 15,
  },
  categoryItem: {
    alignItems: 'center',
    width: 70,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
  bannersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  mainBannerWrapper: {
    flex: 2,
    height: 160,
    position: 'relative',
  },
  bannerScrollView: {
    flex: 1,
  },
  mainBanner: {
    height: 160,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  mainBannerCat: {
    backgroundColor: '#60A5FA', // Lighter blue for cat
  },
  bannerIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    gap: 6,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorDotActive: {
    backgroundColor: '#FFFFFF',
    width: 20,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  bannerImage: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerEmoji: {
    fontSize: 60,
  },
  sideBanner: {
    flex: 1,
    height: 160,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  sideBannerIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  indicatorText: {
    fontSize: 10,
    color: '#1F2937',
    fontWeight: '600',
  },
  sideBannerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  sideBannerEmoji: {
    fontSize: 50,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  essentialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  essentialCard: {
    width: (width - 60) / 4,
    alignItems: 'center',
    marginBottom: 15,
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
  essentialName: {
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
  moreEssentialsScroll: {
    marginBottom: 20,
  },
  moreEssentialsContent: {
    paddingHorizontal: 20,
    gap: 15,
  },
  trainingBanner: {
    marginHorizontal: 20,
    marginBottom: 25,
    height: 100,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trainingBannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  trainingBannerEmoji: {
    fontSize: 50,
  },
  wellnessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wellnessCard: {
    width: (width - 60) / 4,
    alignItems: 'center',
    marginBottom: 15,
  },
  wellnessIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  wellnessIconText: {
    fontSize: 24,
  },
  wellnessName: {
    fontSize: 11,
    color: '#1F2937',
    textAlign: 'center',
  },
  careBanner: {
    marginHorizontal: 20,
    marginBottom: 25,
    height: 120,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  findFriendBanner: {
    marginHorizontal: 20,
    marginBottom: 25,
    height: 120,
    backgroundColor: '#60A5FA',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  findFriendContent: {
    flex: 1,
  },
  findFriendTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  findFriendEmoji: {
    fontSize: 60,
  },
  careBannerContent: {
    flex: 1,
  },
  careBannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  careBannerSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  careBannerEmoji: {
    fontSize: 50,
  },
  productsScrollContent: {
    paddingRight: 20,
    gap: 15,
  },
  productCard: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 15,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  ratingStars: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  adoptionBanner: {
    marginHorizontal: 20,
    marginBottom: 25,
    height: 100,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adoptionBannerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 10,
  },
  adoptionBannerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  adoptionBannerEmoji: {
    fontSize: 40,
  },
  bottomPadding: {
    height: 100,
  },
});

export default HomeScreen;
