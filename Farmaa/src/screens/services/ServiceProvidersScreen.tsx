import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ServiceProvidersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceType } = route.params as any;
  const [providers] = useState([
    { _id: '1', name: 'John Smith', rating: 4.5, experience: '5 years', price: 500 },
    { _id: '2', name: 'Sarah Johnson', rating: 4.8, experience: '8 years', price: 600 },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{serviceType} Providers</Text>
      </View>

      <FlatList
        data={providers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.providerCard}
            onPress={() => navigation.navigate('Booking' as never, { provider: item, serviceType } as never)}
          >
            <View style={styles.providerInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <View style={styles.providerDetails}>
                <Text style={styles.providerName}>{item.name}</Text>
                <Text style={styles.providerRating}>⭐ {item.rating}</Text>
                <Text style={styles.providerExperience}>{item.experience} experience</Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{item.price}</Text>
              <Text style={styles.priceLabel}>per session</Text>
            </View>
          </TouchableOpacity>
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
  providerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  providerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 30,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  providerRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  providerExperience: {
    fontSize: 12,
    color: '#999',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  priceLabel: {
    fontSize: 12,
    color: '#999',
  },
});

export default ServiceProvidersScreen;

