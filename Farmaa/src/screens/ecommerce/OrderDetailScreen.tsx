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

const OrderDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = (route.params as any) || {};

  const [rating, setRating] = useState(order?.rating || 0);
  const [isRated, setIsRated] = useState(order?.isRated || false);

  const orderData = order || {
    id: '#123456',
    status: 'Placed', // or 'Delivered', 'Refunded'
    date: '22 Nov 2025',
    productName:
      'Canine Creek Club Ultra Premium Dry Dog Food for All Lifestages, 20 kg Pack',
    image: '🦴',
    price: 2449,
    discount: 320, // Updated to show -₹320 when coupon applied
    deliveryFee: 0,
    totalAmount: 2229,
    paymentMethod: 'UPI',
    address: {
      name: 'John Deo',
      phone: '123456',
      address: '123, abcd arera, abcd city, abcd state',
      phoneNumber: '1234567890',
    },
  };

  const isDelivered = orderData.status === 'Delivered';
  const isPlaced = orderData.status === 'Placed';
  const isRefunded = orderData.status === 'Refunded';

  const handleSeeAllUpdates = () => {
    navigation.navigate('OrderUpdate' as never, { orderId: orderData.id } as never);
  };

  const handleSubmitRating = () => {
    if (rating > 0) {
      setIsRated(true);
      // Submit rating logic
      console.log('Rating submitted:', rating);
    }
  };

  const handleReturnOrder = () => {
    navigation.navigate('ReturnOrder' as never, { order: orderData } as never);
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
        <Text style={styles.headerTitle}>Orders Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order ID */}
        <View style={styles.section}>
          <Text style={styles.orderId}>Order ID: {orderData.id}</Text>
        </View>

        {/* Product Info */}
        <View style={styles.section}>
          <View style={styles.productRow}>
            <View style={styles.productImage}>
              <Text style={styles.productEmoji}>{orderData.image}</Text>
            </View>
            <Text style={styles.productName} numberOfLines={2}>
              {orderData.productName}
            </Text>
          </View>
        </View>

        {/* Order Status */}
        <View style={styles.section}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.statusTitle}>
                {orderData.status}, {orderData.date}
              </Text>
              <Text style={styles.statusMessage}>
                {isRefunded
                  ? "Your order was cancelled. Feel free to shop again anytime."
                  : isDelivered
                  ? "Delivered safely. Hope your pet loves it!"
                  : "Your pet's goodies are almost home!"}
              </Text>
            </View>
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: isRefunded
                      ? '100%'
                      : isDelivered
                      ? '100%'
                      : '20%',
                  },
                ]}
              />
            </View>
            <View style={styles.progressLabels}>
              {isRefunded ? (
                <>
                  <View style={styles.progressLabel}>
                    <Text style={styles.progressLabelText}>
                      Orders Placed
                    </Text>
                    <Text style={styles.progressDate}>{orderData.date}</Text>
                  </View>
                  <View style={styles.progressLabel}>
                    <Text style={styles.progressLabelText}>Return</Text>
                    <Text style={styles.progressDate}>{orderData.date}</Text>
                  </View>
                  <View style={styles.progressLabel}>
                    <Text style={styles.progressLabelText}>Refund</Text>
                    <Text style={styles.progressDate}>{orderData.date}</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.progressLabel}>
                    <Text style={styles.progressLabelText}>
                      Orders Placed
                    </Text>
                    <Text style={styles.progressDate}>{orderData.date}</Text>
                  </View>
                  <View style={styles.progressLabel}>
                    <Text style={styles.progressLabelText}>Delivered</Text>
                    <Text style={styles.progressDate}>
                      {isDelivered
                        ? orderData.date
                        : `Expected ${orderData.date}`}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={handleSeeAllUpdates}
          >
            <Text style={styles.seeAllButtonText}>See All Order Update</Text>
          </TouchableOpacity>
        </View>

        {/* Refund Amount (Only for Refunded) */}
        {isRefunded && (
          <View style={styles.section}>
            <Text style={styles.refundAmount}>
              Total Refund Amount ₹{orderData.totalAmount.toLocaleString('en-IN')}
            </Text>
          </View>
        )}

        {/* Rate Your Experience (Only for Delivered) */}
        {isDelivered && (
          <View style={styles.section}>
            <Text style={styles.ratingTitle}>Rate Your Experience *</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => !isRated && setRating(star)}
                  style={styles.starButton}
                  disabled={isRated}
                >
                  <Text style={styles.star}>
                    {star <= rating ? '⭐' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (isRated || rating === 0) && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmitRating}
                disabled={isRated || rating === 0}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.returnOrderButton}
              onPress={handleReturnOrder}
            >
              <Text style={styles.returnOrderText}>Return Order →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deliver to</Text>
          <Text style={styles.deliveryName}>
            {orderData.address.name}, {orderData.address.phone}
          </Text>
          <Text style={styles.deliveryAddress}>
            {orderData.address.address} | {orderData.address.phoneNumber}
          </Text>
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price (1 item)</Text>
            <Text style={styles.priceValue}>
              ₹{orderData.price.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discount</Text>
            <Text style={styles.discountValue}>
              -₹{orderData.discount.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceValue}>
              ₹{orderData.deliveryFee}
            </Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              ₹{orderData.totalAmount.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.savingsContainer}>
            <Text style={styles.savingsText}>
              You Save ₹{orderData.discount.toLocaleString('en-IN')} on this
              order
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.paymentMethod}>{orderData.paymentMethod}</Text>
        </View>

        {/* Download Invoice */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadIcon}>📥</Text>
            <Text style={styles.downloadText}>Download Invoice</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            Made With Gentle Care in Jaipur, India
          </Text>
          <Text style={styles.footerSubText}>Because Your Pet</Text>
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
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  productEmoji: {
    fontSize: 40,
  },
  productName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statusMessage: {
    fontSize: 14,
    color: '#6B7280',
  },
  checkmarkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    alignItems: 'flex-start',
  },
  progressLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  progressDate: {
    fontSize: 11,
    color: '#6B7280',
  },
  seeAllButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  seeAllButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 15,
  },
  starButton: {
    padding: 5,
  },
  star: {
    fontSize: 24,
  },
  submitButton: {
    marginLeft: 'auto',
    backgroundColor: '#1F2937',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  refundAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    paddingVertical: 10,
  },
  returnOrderButton: {
    marginTop: 10,
  },
  returnOrderText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  deliveryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceValue: {
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
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
    textAlign: 'center',
  },
  paymentMethod: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  downloadIcon: {
    fontSize: 20,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  bottomPadding: {
    height: 100,
  },
  footerSection: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  footerSubText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default OrderDetailScreen;

