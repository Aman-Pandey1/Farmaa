import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  // Top picks products - matching exact design
  const topPicks = [
    {
      id: 1,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 5,
      reviews: 265,
      image: '🦴',
    },
    {
      id: 2,
      name: 'Folding Jaw Clamp Poop Sco...',
      price: '₹289',
      originalPrice: '₹465',
      rating: 5,
      reviews: 265,
      image: '🧹',
    },
    {
      id: 3,
      name: 'Self Cleaning Dog Comb & Cat Co...',
      price: '₹599',
      originalPrice: '₹1,234',
      rating: 5,
      reviews: 265,
      image: '✂️',
    },
  ];

  // Search results data
  const allSearchResults = [
    { id: 1, name: 'Dog Treats', image: '🦴', type: 'product' },
    { id: 2, name: 'Dog Food', image: '🦴', type: 'product' },
    { id: 3, name: 'Cat Food', image: '🐟', type: 'product' },
    { id: 4, name: 'Dog Toys', image: '🎾', type: 'product' },
    { id: 5, name: 'Cat Toys', image: '🐭', type: 'product' },
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Filter results based on search query
      const filtered = allSearchResults.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Navigate to products with search query
    navigation.navigate('Products' as never, { searchQuery: query } as never);
  };

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail' as never, { product } as never);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search food, toys, meds & more.."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={() => handleSearch(searchQuery)}
          />
          <TouchableOpacity style={styles.micButton}>
            <Text style={styles.micIcon}>🎤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {!showResults ? (
        // Top Picks Section
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Picks for you</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topPicksContent}
            >
              {topPicks.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => handleProductPress(product)}
                >
                  <View style={styles.productImage}>
                    <TouchableOpacity
                      style={styles.heartButton}
                      onPress={() => toggleFavorite(product.id)}
                    >
                      <Text style={styles.heartIcon}>
                        {favorites[product.id] ? '❤️' : '🤍'}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.productEmoji}>{product.image}</Text>
                  </View>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={styles.productRating}>
                    <Text style={styles.ratingStars}>
                      {'⭐'.repeat(product.rating)}
                    </Text>
                    <Text style={styles.reviewsText}>
                      ({product.reviews})
                    </Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    {product.originalPrice && (
                      <Text style={styles.originalPrice}>
                        {product.originalPrice}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>ADD</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        // Search Results
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSearch(item.name)}
            >
              <View style={styles.resultImage}>
                <Text style={styles.resultImageIcon}>{item.image}</Text>
              </View>
              <Text style={styles.resultText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Nothing Matches Your Search</Text>
              <Text style={styles.emptyDescription}>
                Try changing your keywords or adjusting filters to find what
                you're looking for. Keep exploring - your pet's perfect find is
                out there.
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => {
                  setSearchQuery('');
                  setShowResults(false);
                }}
              >
                <Text style={styles.emptyButtonText}>Try Again →</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
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
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  micButton: {
    marginLeft: 10,
    padding: 5,
  },
  micIcon: {
    fontSize: 20,
    color: '#6B7280',
  },
  section: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  topPicksContent: {
    paddingHorizontal: 15,
    gap: 15,
  },
  productCard: {
    width: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 15,
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    padding: 5,
  },
  heartIcon: {
    fontSize: 20,
  },
  productEmoji: {
    fontSize: 60,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    minHeight: 40,
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
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultImage: {
    width: 40,
    height: 40,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  resultImageIcon: {
    fontSize: 24,
  },
  resultText: {
    fontSize: 16,
    color: '#1F2937',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  emptyButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default SearchScreen;
