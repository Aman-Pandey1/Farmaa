import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExploreScreen = () => {
  const navigation = useNavigation();

  const exploreCategories = [
    { id: 1, name: 'Training', icon: '🎓', screen: 'Training' },
    { id: 2, name: 'Adoption', icon: '🐾', screen: 'Adoption' },
    { id: 3, name: 'Healthcare', icon: '🏥', screen: 'Healthcare' },
    { id: 4, name: 'Services', icon: '📅', screen: 'ServicesTab' },
    { id: 5, name: 'Emergency', icon: '🚨', screen: 'Emergency' },
    { id: 6, name: 'Hotels', icon: '🏨', screen: 'ServicesTab' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerSubtitle}>Discover amazing services for your pet</Text>
      </View>

      <View style={styles.categoriesContainer}>
        {exploreCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate(category.screen as never)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default ExploreScreen;

