import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ReturnOrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = (route.params as any) || {};

  const [selectedReason, setSelectedReason] = useState('');

  const orderData = order || {
    id: '#123456',
    productName:
      'Canine Creek Club Ultra Premium Dry Dog Food for All Lifestages, 20 kg Pack',
    image: '🦴',
  };

  const returnReasons = [
    'Received a damaged product',
    'Wrong item delivered',
    'Missing parts or accessories',
    'Poor quality or defective',
    'Not as described',
    'Other (write your reason)',
  ];

  const handleSubmit = () => {
    if (selectedReason) {
      // Submit return request
      navigation.navigate('OrderDetail' as never, {
        order: {
          ...orderData,
          status: 'Refunded',
          date: '22 Nov 2025',
        },
      } as never);
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
        <Text style={styles.headerTitle}>Return Order</Text>
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

        {/* Return Reasons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Return Reason</Text>
          {returnReasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reasonOption}
              onPress={() => setSelectedReason(reason)}
            >
              <View style={styles.radioContainer}>
                <View
                  style={[
                    styles.radio,
                    selectedReason === reason && styles.radioSelected,
                  ]}
                >
                  {selectedReason === reason && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              !selectedReason && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!selectedReason}
          >
            <Text style={styles.submitButtonText}>Submit →</Text>
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  reasonOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#3B82F6',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3B82F6',
  },
  reasonText: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 100,
  },
});

export default ReturnOrderScreen;

