import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = (route.params as any) || {};

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    productInfo: false,
    measurements: false,
  });
  const [quantity, setQuantity] = useState(1);

  const productData = product || {
    id: 1,
    name: 'Canine Creek Club Ultra Premium Dry Dog Food for All Lifestages, 20 kg Pack',
    brand: 'Canine Creek',
    price: '₹2,229',
    originalPrice: '₹2,449',
    discount: 15,
    rating: 4.6,
    reviews: 265,
    image: '🦴',
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
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = () => {
    navigation.navigate('Cart' as never);
  };

  const goToCart = () => {
    navigation.navigate('Cart' as never);
  };

  const hasItemsInCart = quantity > 0;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <View style={styles.productImage}>
            <Text style={styles.productEmoji}>{productData.image}</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <Text style={styles.productName}>{productData.name}</Text>
          <Text style={styles.brand}>Brand: {productData.brand}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStars}>
              {'⭐'.repeat(Math.floor(productData.rating))}
            </Text>
            <Text style={styles.ratingText}>
              {productData.rating} | {productData.reviews}
            </Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.productPrice}>{productData.price}</Text>
              {productData.originalPrice && (
                <Text style={styles.originalPrice}>
                  {productData.originalPrice}
                </Text>
              )}
              {productData.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {productData.discount}% OFF
                  </Text>
                </View>
              )}
            </View>
            {productData.pricePerUnit && (
              <Text style={styles.pricePerUnit}>
                ({productData.pricePerUnit})
              </Text>
            )}
          </View>

          {/* Quantity Selector */}
          {hasItemsInCart && (
            <View style={styles.quantitySection}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={decreaseQuantity}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={increaseQuantity}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Product Information Section */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('productInfo')}
          >
            <Text style={styles.sectionTitle}>Product Information</Text>
            <Text style={styles.dropdownIcon}>
              {expandedSections.productInfo ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
          {expandedSections.productInfo && (
            <View style={styles.sectionContent}>
              {/* Measurements Sub-section */}
              <View style={styles.subSection}>
                <Text style={styles.subSectionTitle}>Measurements</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Unit Count:</Text>
                  <Text style={styles.detailValue}>
                    {productData.unitCount || '200000 gram'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Number Of Items:</Text>
                  <Text style={styles.detailValue}>
                    {productData.numberOfItems || 1}
                  </Text>
                </View>
                {productData.itemWeight && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Item Weight:</Text>
                    <Text style={styles.detailValue}>
                      {productData.itemWeight}
                    </Text>
                  </View>
                )}
              </View>

              {/* Item Details Sub-section */}
              <View style={styles.subSection}>
                <Text style={styles.subSectionTitle}>Item Details</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Brand Name:</Text>
                  <Text style={styles.detailValue}>
                    {productData.brandName || productData.brand}
                  </Text>
                </View>
                {productData.flavor && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Flavor:</Text>
                    <Text style={styles.detailValue}>{productData.flavor}</Text>
                  </View>
                )}
                {productData.ageRange && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                      Age Range Description:
                    </Text>
                    <Text style={styles.detailValue}>
                      {productData.ageRange}
                    </Text>
                  </View>
                )}
                {productData.itemForm && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Item Form:</Text>
                    <Text style={styles.detailValue}>
                      {productData.itemForm}
                    </Text>
                  </View>
                )}
                {productData.specialIngredients && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                      Special Ingredients:
                    </Text>
                    <Text style={styles.detailValue}>
                      {productData.specialIngredients}
                    </Text>
                  </View>
                )}
                {productData.asin && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>ASIN:</Text>
                    <Text style={styles.detailValue}>{productData.asin}</Text>
                  </View>
                )}
                {productData.itemHSN && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Item HSN:</Text>
                    <Text style={styles.detailValue}>
                      {productData.itemHSN}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {hasItemsInCart ? (
          <View style={styles.cartFooter}>
            <Text style={styles.cartTotal}>
              {productData.price} × {quantity}
            </Text>
            <TouchableOpacity
              style={styles.goToCartButton}
              onPress={goToCart}
            >
              <Text style={styles.goToCartText}>Go to Cart +</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              navigation.navigate('Cart' as never, {
                product: productData,
                quantity: quantity,
              } as never);
            }}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 15,
    zIndex: 1,
  },
  backButton: {
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
  },
  imageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#F9FAFB',
  },
  productImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 150,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  brand: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  ratingStars: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  priceContainer: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 12,
    flexWrap: 'wrap',
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  originalPrice: {
    fontSize: 18,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#EF4444',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pricePerUnit: {
    fontSize: 14,
    color: '#6B7280',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    minWidth: 30,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  dropdownIcon: {
    fontSize: 16,
    color: '#6B7280',
  },
  sectionContent: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  subSection: {
    marginBottom: 20,
  },
  subSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  addToCartButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  goToCartButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  goToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ProductDetailScreen;

