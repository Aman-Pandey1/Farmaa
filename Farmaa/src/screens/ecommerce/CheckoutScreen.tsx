import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const CheckoutScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  // Sample order data
  const orderItems = [
    { id: '1', name: 'Premium Dog Food', quantity: 2, originalPrice: 599, price: 499 },
    { id: '2', name: 'Cat Toy Set', quantity: 1, originalPrice: 299, price: 299 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalSubtotal = orderItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const deliveryFee = 50;
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const finalSubtotal = subtotal + deliveryFee - discount;

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode.toUpperCase());
      setShowCouponInput(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const placeOrder = () => {
    // Place order logic
    console.log('Order placed');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Order Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Order summary</Text>

        {/* Order Items */}
        {orderItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            </View>
            <View style={styles.itemPriceContainer}>
              {item.originalPrice !== item.price && (
                <Text style={styles.originalPrice}>₹{item.originalPrice * item.quantity}</Text>
              )}
              <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        {/* Delivery Fee */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery fee</Text>
          <Text style={styles.summaryValue}>₹{deliveryFee}</Text>
        </View>

        {/* Taxes Section */}
        <View style={styles.divider} />
        <View style={styles.taxesSection}>
          <Text style={styles.summaryLabel}>Taxes</Text>
          <Text style={styles.taxesText}>Calculated after you provide your billing address</Text>
          <Text style={styles.taxesDash}>—</Text>
        </View>

        {/* Discount/Coupon */}
        {appliedCoupon && (
          <>
            <View style={styles.divider} />
            <View style={styles.discountRow}>
              <View style={styles.couponTag}>
                <Text style={styles.couponIcon}>🏷️</Text>
                <Text style={styles.couponText}>{appliedCoupon} -10%</Text>
              </View>
              <TouchableOpacity onPress={removeCoupon}>
                <Text style={styles.removeCoupon}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.discountAmount}>-₹{discount}</Text>
            </View>
          </>
        )}

        {/* Subtotal */}
        <View style={styles.divider} />
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <View style={styles.subtotalPriceContainer}>
            {originalSubtotal !== subtotal && (
              <Text style={styles.originalSubtotal}>₹{originalSubtotal + deliveryFee}</Text>
            )}
            <Text style={styles.finalSubtotal}>₹{finalSubtotal}</Text>
          </View>
        </View>

        {/* Coupon Input */}
        {!appliedCoupon && (
          <View style={styles.couponSection}>
            {!showCouponInput ? (
              <TouchableOpacity
                style={styles.addCouponButton}
                onPress={() => setShowCouponInput(true)}
              >
                <Text style={styles.addCouponText}>+ Add coupon code</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.couponInputContainer}>
                <TextInput
                  style={styles.couponInput}
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChangeText={setCouponCode}
                  autoCapitalize="characters"
                />
                <TouchableOpacity style={styles.applyButton} onPress={applyCoupon}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {appliedCoupon && (
          <View style={styles.appliedCouponSection}>
            <Text style={styles.appliedCouponLabel}>Coupon applied:</Text>
            <View style={styles.appliedCouponTag}>
              <Text style={styles.appliedCouponText}>{appliedCoupon}</Text>
              <TouchableOpacity onPress={removeCoupon}>
                <Text style={styles.appliedCouponRemove}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Delivery Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={address.street}
          onChangeText={(text) => setAddress({ ...address, street: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={address.city}
          onChangeText={(text) => setAddress({ ...address, city: text })}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="State"
            value={address.state}
            onChangeText={(text) => setAddress({ ...address, state: text })}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Zip Code"
            value={address.zipCode}
            onChangeText={(text) => setAddress({ ...address, zipCode: text })}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={address.phone}
          onChangeText={(text) => setAddress({ ...address, phone: text })}
          keyboardType="phone-pad"
        />
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {['card', 'upi', 'cash'].map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.paymentOption,
              paymentMethod === method && styles.selectedPaymentOption,
            ]}
            onPress={() => setPaymentMethod(method)}
          >
            <Text style={styles.paymentOptionText}>
              {method === 'card' ? '💳 Card' : method === 'upi' ? '📱 UPI' : '💵 Cash on Delivery'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order - ₹{finalSubtotal}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemPriceContainer: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  taxesSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taxesText: {
    flex: 1,
    fontSize: 14,
    color: '#999',
    marginLeft: 10,
  },
  taxesDash: {
    fontSize: 18,
    color: '#999',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  couponIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  couponText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  removeCoupon: {
    fontSize: 18,
    color: '#999',
    marginLeft: 10,
  },
  discountAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtotalPriceContainer: {
    alignItems: 'flex-end',
  },
  originalSubtotal: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  finalSubtotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  couponSection: {
    marginTop: 15,
  },
  addCouponButton: {
    padding: 12,
    alignItems: 'center',
  },
  addCouponText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  couponInputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  appliedCouponSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  appliedCouponLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  appliedCouponTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  appliedCouponText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  appliedCouponRemove: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  paymentOption: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  selectedPaymentOption: {
    backgroundColor: '#FF6B6B',
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#333',
  },
  placeOrderButton: {
    backgroundColor: '#FF6B6B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
