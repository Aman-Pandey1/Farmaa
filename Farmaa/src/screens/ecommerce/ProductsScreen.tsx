import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  category?: string;
  inCart?: boolean;
  quantity?: number;
}

const ProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = (route.params as any) || {};

  const [selectedPet, setSelectedPet] = useState<'dog' | 'cat'>(
    routeParams.petType || 'dog'
  );
  const [searchQuery, setSearchQuery] = useState(routeParams.searchQuery || '');
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [filters, setFilters] = useState(routeParams.filters || {});
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  // Mock product data - matching design
  const allProducts: Product[] = [
    {
      id: 1,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 4.6,
      reviews: 265,
      image: '🦴',
      category: 'Food',
    },
    {
      id: 2,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 4.6,
      reviews: 265,
      image: '🦴',
      category: 'Food',
    },
    {
      id: 3,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 4.6,
      reviews: 265,
      image: '🦴',
      category: 'Food',
    },
    {
      id: 4,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 4.6,
      reviews: 265,
      image: '🦴',
      category: 'Food',
    },
    {
      id: 5,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 4.6,
      reviews: 265,
      image: '🦴',
      category: 'Food',
    },
    {
      id: 6,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 4.6,
      reviews: 265,
      image: '🦴',
      category: 'Food',
    },
    {
      id: 7,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 4.6,
      reviews: 265,
      image: '🦴',
      category: 'Food',
    },
    {
      id: 8,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 4.6,
      reviews: 265,
      image: '🦴',
      category: 'Food',
    },
    {
      id: 9,
      name: 'Canine Creek Club Ultra Premium Dry',
      price: '₹2,229',
      originalPrice: '₹2,449',
      rating: 4.6,
      reviews: 265,
      image: '🦴',
      category: 'Food',
    },
  ];

  const [products, setProducts] = useState<Product[]>(allProducts);
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category)
      );
    }

    // Apply sort
    switch (sortBy) {
      case 'Price: Low to High':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
          const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
          const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'New Arrivals':
        filtered.reverse();
        break;
      default:
        // Popularity - sort by rating
        filtered.sort((a, b) => b.rating - a.rating);
    }

    setProducts(filtered);
  }, [searchQuery, filters, sortBy]);

  const handleAddToCart = (productId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleQuantityChange = (productId: number, change: number) => {
    setCartItems((prev) => {
      const newQuantity = (prev[productId] || 0) + change;
      if (newQuantity <= 0) {
        const newItems = { ...prev };
        delete newItems[productId];
        return newItems;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const sortOptions = [
    'Popularity',
    'New Arrivals',
    'Price: Low to High',
    'Price: High to Low',
  ];

  const hasItemsInCart = Object.keys(cartItems).length > 0;

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
        <Text style={styles.headerTitle}>Dog Food</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search and Filter Bar */}
      <View style={styles.searchFilterBar}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search food"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.micButton}>
            <Text style={styles.micIcon}>🎤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setShowSortModal(true)}
          style={styles.iconButton}
        >
          <Text style={styles.sortIcon}>⇅</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Filter' as never, { filters } as never)
          }
          style={styles.iconButton}
        >
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your Pet's Wishlist Is Waiting</Text>
          <Text style={styles.emptyDescription}>
            Browse essentials, treats, and toys curated to keep tails wagging.
            Because every good pet deserves something extra good.
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => {
              setSearchQuery('');
              setFilters({});
            }}
          >
            <Text style={styles.emptyButtonText}>Try Again →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productsGrid}
          renderItem={({ item }) => {
          const quantity = cartItems[item.id] || 0;
          const inCart = quantity > 0;

          return (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() =>
                navigation.navigate('ProductDetail' as never, {
                  product: {
                    ...item,
                    name: 'Canine Creek Club Ultra Premium Dry Dog Food for All Lifestages, 20 kg Pack',
                    brand: 'Canine Creek',
                    unitCount: '200000 gram',
                    numberOfItems: 1,
                    itemWeight: '10000 Grams',
                    brandName: 'Canine Creek',
                    flavor: 'Pumpkin',
                    ageRange: 'Adult',
                    itemForm: 'Dry',
                    specialIngredients: 'Krill oil, Salmon Oil, Beta Carotene',
                    asin: 'SDCINFM02',
                    itemHSN: '70100000',
                    pricePerUnit: '₹19.49/100 g',
                    discount: 15,
                  },
                } as never)
              }
            >
              <View style={styles.productImage}>
                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Text style={styles.heartIcon}>
                    {favorites[item.id] ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.productEmoji}>{item.image}</Text>
              </View>
              {!inCart ? (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToCart(item.id)}
                >
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, -1)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <View style={styles.productRating}>
                <Text style={styles.ratingStars}>
                  {'⭐'.repeat(Math.floor(item.rating))}
                </Text>
                <Text style={styles.reviewsText}>
                  {item.rating} | {item.reviews}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>{item.price}</Text>
                {item.originalPrice && (
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      )}

      {/* Go to Cart Button */}
      {products.length > 0 && hasItemsInCart && (
        <View style={styles.cartButton}>
          <Text style={styles.cartTotal}>
            ₹{Object.keys(cartItems).reduce((total, productId) => {
              const product = products.find((p) => p.id === parseInt(productId));
              const qty = cartItems[parseInt(productId)];
              const price = parseInt(product?.price.replace(/[₹,]/g, '') || '0');
              return total + price * qty;
            }, 0).toLocaleString('en-IN')}
          </Text>
          <TouchableOpacity
            style={styles.goToCartButton}
            onPress={() => navigation.navigate('Cart' as never)}
          >
            <Text style={styles.goToCartButtonText}>Go to Cart +</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sort Modal */}
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <View style={styles.closeButton}>
                  <Text style={styles.closeIcon}>✕</Text>
                </View>
              </TouchableOpacity>
            </View>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.sortOption}
                onPress={() => {
                  setSortBy(option);
                  setShowSortModal(false);
                }}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortBy === option && styles.sortOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {sortBy === option && (
                  <View style={styles.radioSelected}>
                    <View style={styles.radioInner} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 34,
  },
  searchFilterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#6B7280',
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
    fontSize: 18,
    color: '#6B7280',
  },
  iconButton: {
    padding: 10,
  },
  sortIcon: {
    fontSize: 20,
    color: '#1F2937',
  },
  filterIcon: {
    fontSize: 20,
    color: '#1F2937',
  },
  productsGrid: {
    padding: 10,
    paddingBottom: 100,
  },
  productCard: {
    width: (width - 40) / 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  productImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  heartButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 1,
    padding: 4,
  },
  heartIcon: {
    fontSize: 18,
  },
  productEmoji: {
    fontSize: 50,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  addButtonText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 10,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quantityButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  productName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    minHeight: 32,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  ratingStars: {
    fontSize: 10,
  },
  reviewsText: {
    fontSize: 10,
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  originalPrice: {
    fontSize: 10,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: '#1F2937',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  goToCartButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  goToCartButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#1F2937',
  },
  sortOptionTextSelected: {
    fontWeight: '600',
    color: '#3B82F6',
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3B82F6',
  },
});

export default ProductsScreen;
