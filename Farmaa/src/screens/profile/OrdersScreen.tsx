import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Orders');

  const orders = [
    {
      id: '#123456',
      productName:
        'Canine Creek Club Ultra Premium Dry Dog Food for All Lifestages, 20 kg Pack',
      status: 'Ongoing',
      date: 'On 22 Nov 2025',
      image: '🦴',
    },
    {
      id: '#123457',
      productName:
        'Canine Creek Club Ultra Premium Dry Dog Food for All Lifestages, 20 kg Pack',
      status: 'Delivered',
      date: 'On 22 Nov 2025',
      image: '🦴',
    },
    {
      id: '#123458',
      productName:
        'Canine Creek Club Ultra Premium Dry Dog Food for All Lifestages, 20 kg Pack',
      status: 'Cancelled',
      date: 'On 22 Nov 2025',
      image: '🦴',
    },
    {
      id: '#123459',
      productName:
        'Canine Creek Club Ultra Premium Dry Dog Food for All Lifestages, 20 kg Pack',
      status: 'Delivered',
      date: 'On 22 Nov 2025',
      image: '🦴',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return '#3B82F6';
      case 'delivered':
        return '#10B981';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter =
      selectedFilter === 'All Orders' ||
      order.status.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

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
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search your order here"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.micButton}>
            <Text style={styles.micIcon}>🎤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() =>
              navigation.navigate('OrderDetail' as never, {
                order: {
                  ...item,
                  price: 2449,
                  discount: 220,
                  deliveryFee: 0,
                  totalAmount: 2229,
                  paymentMethod: 'UPI',
                  address: {
                    name: 'John Deo',
                    phone: '123456',
                    address: '123, abcd arera, abcd city, abcd state',
                    phoneNumber: '1234567890',
                  },
                },
              } as never)
            }
          >
            <View style={styles.orderImage}>
              <Text style={styles.orderEmoji}>{item.image}</Text>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.orderProductName} numberOfLines={2}>
                {item.productName}
              </Text>
              <Text style={styles.orderId}>Order ID: {item.id}</Text>
              <View style={styles.orderStatusRow}>
                {item.status === 'Ongoing' ? (
                  <>
                    <Text style={styles.statusTextBlue}>{item.status}</Text>
                    <Text style={styles.statusArrow}>→</Text>
                    <Text style={styles.orderDate}>{item.date}</Text>
                  </>
                ) : (
                  <Text style={styles.statusDateText}>
                    {item.status} {item.date}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.ordersList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>You Have No Orders</Text>
            <Text style={styles.emptyDescription}>
              Once you place an order, you'll see updates and delivery details
              here. Great things come to pets who wait.
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('ProductsTab' as never)}
            >
              <Text style={styles.emptyButtonText}>Start Shopping →</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            {['All Orders', 'Ongoing', 'Delivered', 'Cancelled'].map(
              (filter) => (
                <TouchableOpacity
                  key={filter}
                  style={styles.filterOption}
                  onPress={() => {
                    setSelectedFilter(filter);
                    setShowFilterModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilter === filter &&
                        styles.filterOptionTextSelected,
                    ]}
                  >
                    {filter}
                  </Text>
                  {selectedFilter === filter && (
                    <View style={styles.radioSelected}>
                      <View style={styles.radioInner} />
                    </View>
                  )}
                </TouchableOpacity>
              )
            )}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    fontSize: 18,
    color: '#6B7280',
  },
  filterButton: {
    padding: 10,
  },
  filterIcon: {
    fontSize: 20,
    color: '#1F2937',
  },
  ordersList: {
    padding: 15,
    paddingBottom: 20,
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderImage: {
    width: 80,
    height: 80,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  orderEmoji: {
    fontSize: 40,
  },
  orderDetails: {
    flex: 1,
  },
  orderProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 20,
  },
  orderId: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  orderStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusTextBlue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  statusArrow: {
    fontSize: 12,
    color: '#6B7280',
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusDateText: {
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
  closeIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#1F2937',
  },
  filterOptionTextSelected: {
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

export default OrdersScreen;
