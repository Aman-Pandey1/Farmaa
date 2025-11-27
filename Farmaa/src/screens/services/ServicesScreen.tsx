import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ServicesScreen = () => {
  const navigation = useNavigation();

  const services = [
    { id: 1, name: 'Grooming', icon: '✂️', color: '#FF6B6B', description: 'Professional pet grooming' },
    { id: 2, name: 'Training', icon: '🎓', color: '#4ECDC4', description: 'Expert pet training' },
    { id: 3, name: 'Walking', icon: '🚶', color: '#45B7D1', description: 'Daily dog walking' },
    { id: 4, name: 'Sitting', icon: '🏠', color: '#96CEB4', description: 'Pet sitting services' },
    { id: 5, name: 'Boarding', icon: '🏨', color: '#FFE66D', description: 'Pet boarding facilities' },
    { id: 6, name: 'Veterinary', icon: '🏥', color: '#FF6B6B', description: 'Vet appointments' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
      </View>

      <View style={styles.servicesGrid}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[styles.serviceCard, { backgroundColor: service.color }]}
            onPress={() => navigation.navigate('ServiceProviders' as never, { serviceType: service.name } as never)}
          >
            <Text style={styles.serviceIcon}>{service.icon}</Text>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.myBookingsButton}
        onPress={() => navigation.navigate('MyBookings' as never)}
      >
        <Text style={styles.myBookingsText}>My Bookings</Text>
      </TouchableOpacity>
    </ScrollView>
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
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  serviceIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  myBookingsButton: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  myBookingsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});

export default ServicesScreen;

