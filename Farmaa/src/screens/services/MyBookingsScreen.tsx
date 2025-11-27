import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

const MyBookingsScreen = () => {
  const bookings = [
    { id: '1', service: 'Grooming', provider: 'John Smith', date: '2024-01-15', time: '10:00 AM', status: 'confirmed' },
    { id: '2', service: 'Training', provider: 'Sarah Johnson', date: '2024-01-20', time: '2:00 PM', status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#4ECDC4';
      case 'pending': return '#FFE66D';
      case 'completed': return '#96CEB4';
      default: return '#999';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <Text style={styles.serviceName}>{item.service}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.providerName}>Provider: {item.provider}</Text>
            <Text style={styles.bookingDate}>Date: {item.date}</Text>
            <Text style={styles.bookingTime}>Time: {item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 15,
    borderRadius: 12,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  providerName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  bookingDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  bookingTime: {
    fontSize: 14,
    color: '#999',
  },
});

export default MyBookingsScreen;

