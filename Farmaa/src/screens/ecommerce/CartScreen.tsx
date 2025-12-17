import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product, quantity: initialQuantity } = (route.params as any) || {};
  
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Use product from navigation params or default
  const cartItem = product || {
    id: 1,
    name: 'Canine Creek Club Ultra Premium Dry Dog Food for All Lifestages, 20 kg Pack',
    price: 2229,
    originalPrice: 2449,
    discount: 15,
    image: '🦴',
  };

  const isCartEmpty = quantity === 0;

  // Address data
  const address = {
    name: 'John Deo',
    phone: '123456',
    address: '123, abod arera, abod city, abod state',
  };

  const itemCount = quantity;
  const originalPrice = cartItem.originalPrice * itemCount;
  const discountedPrice = cartItem.price * itemCount;
  const productDiscount = originalPrice - discountedPrice;
  const couponDiscount = couponApplied ? 100 : 0;
  const totalDiscount = productDiscount + couponDiscount;
  const deliveryFee = 40;
  const totalAmount = discountedPrice - couponDiscount + deliveryFee;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() && !couponApplied) {
      setCouponApplied(true);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
  };

  const placeOrder = () => {
    // Simulate payment processing
    // In real app, this would call payment API
    const paymentSuccess = Math.random() > 0.3; // 70% success rate for demo
    
    if (paymentSuccess) {
      navigation.navigate('PaymentSuccess' as never, {
        orderId: `#${Math.floor(Math.random() * 1000000)}`,
        expectedDelivery: '3-5 Days',
      } as never);
    } else {
      navigation.navigate('PaymentFailed' as never);
    }
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
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isCartEmpty ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Your Cart Is Feeling Light</Text>
            <Text style={styles.emptyDescription}>
              Looks like you haven't added anything yet. Browse items to start
              building your pet's perfect haul. Happy pets start with happy
              carts.
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('ProductsTab' as never)}
            >
              <Text style={styles.emptyButtonText}>Start Shopping →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Delivery Address */}
            <View style={styles.section}>
          <View style={styles.addressHeader}>
            <View style={styles.addressInfo}>
              <Text style={styles.deliverToText}>
                Deliver to: {address.name}, {address.phone}
              </Text>
              <Text style={styles.addressText}>{address.address}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => navigation.navigate('Address' as never)}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cart Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cart Item's Added</Text>
          <View style={styles.cartItem}>
            <View style={styles.productImage}>
              <Text style={styles.productEmoji}>{cartItem.image}</Text>
            </View>
            <View style={styles.productDetails}>
              <Text style={styles.productName} numberOfLines={2}>
                {cartItem.name}
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>₹{cartItem.price.toLocaleString('en-IN')}</Text>
                <Text style={styles.originalPrice}>
                  ₹{cartItem.originalPrice.toLocaleString('en-IN')}
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {cartItem.discount}% OFF
                  </Text>
                </View>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(-1)}
                >
                  <Text style={styles.quantityButtonText}>—</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Coupon Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coupon</Text>
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Enter Coupon Code"
              placeholderTextColor="#9CA3AF"
              value={couponCode}
              onChangeText={setCouponCode}
              editable={!couponApplied}
            />
            {couponApplied ? (
              <TouchableOpacity
                style={styles.appliedButton}
                onPress={handleRemoveCoupon}
              >
                <Text style={styles.appliedButtonText}>Applied</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  couponCode.trim() && styles.applyButtonActive,
                ]}
                onPress={handleApplyCoupon}
                disabled={!couponCode.trim()}
              >
                <Text
                  style={[
                    styles.applyButtonText,
                    couponCode.trim() && styles.applyButtonTextActive,
                  ]}
                >
                  Apply
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {couponApplied && (
            <Text style={styles.couponDiscount}>
              Coupon Discount ₹{couponDiscount}
            </Text>
          )}
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceDetailRow}>
            <Text style={styles.priceDetailLabel}>
              Price ({itemCount} item{itemCount > 1 ? 's' : ''})
            </Text>
            <Text style={styles.priceDetailValue}>
              ₹{originalPrice.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.priceDetailRow}>
            <Text style={styles.priceDetailLabel}>Discount</Text>
            <Text style={styles.discountValue}>
              -₹{totalDiscount.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.priceDetailRow}>
            <Text style={styles.priceDetailLabel}>Delivery Fee</Text>
            <Text style={styles.priceDetailValue}>
              ₹{deliveryFee}
            </Text>
          </View>
          <View style={[styles.priceDetailRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              ₹{totalAmount.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {/* Savings Message */}
        <View style={styles.savingsContainer}>
          <Text style={styles.savingsText}>
            You Save ₹{totalDiscount.toLocaleString('en-IN')} on this order
          </Text>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
          </>
        )}
      </ScrollView>

      {/* Footer */}
      {!isCartEmpty && (
        <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={placeOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
        <View style={styles.footerTotal}>
          <View style={styles.footerPriceRow}>
            <Text style={styles.footerTotalPrice}>
              ₹{totalAmount.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.footerOriginalPrice}>
              ₹{originalPrice.toLocaleString('en-IN')}
            </Text>
          </View>
          <Text style={styles.footerText}>Inclusive of all texts</Text>
        </View>
      </View>
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
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addressInfo: {
    flex: 1,
  },
  deliverToText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  changeButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  productEmoji: {
    fontSize: 50,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
    flexWrap: 'wrap',
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
  discountBadge: {
    backgroundColor: '#EF4444',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    minWidth: 30,
    textAlign: 'center',
  },
  couponContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 14,
    color: '#1F2937',
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonActive: {
    backgroundColor: '#1F2937',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  applyButtonTextActive: {
    color: '#FFFFFF',
  },
  appliedButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appliedButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  couponDiscount: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 4,
  },
  priceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceDetailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceDetailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  savingsContainer: {
    margin: 15,
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 200,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 20,
  },
  placeOrderButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footerTotal: {
    alignItems: 'center',
  },
  footerPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  footerTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  footerOriginalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
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
});

export default CartScreen;
