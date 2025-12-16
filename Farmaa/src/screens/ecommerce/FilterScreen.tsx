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

interface FilterState {
  category: string[];
  age: string[];
  breed: string[];
  size: string[];
  dietaryNeeds: string[];
  rating: string[];
}

const FilterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialFilters = (route.params as any)?.filters || {};

  const [filters, setFilters] = useState<FilterState>({
    category: initialFilters.category || [],
    age: initialFilters.age || [],
    breed: initialFilters.breed || [],
    size: initialFilters.size || [],
    dietaryNeeds: initialFilters.dietaryNeeds || [],
    rating: initialFilters.rating || [],
  });

  const filterOptions = {
    category: ['Food', 'Medicine', 'Toys', 'Accessories', 'Grooming', 'Supplements'],
    age: ['Puppy', 'Young', 'Adult', 'Senior'],
    breed: [
      'French Bulldog',
      'Labrador',
      'Golden Retriever',
      'German Shepherd',
      'Poodle',
      'Dachshund',
    ],
    size: ['Small', 'Medium', 'Large', 'Extra Large'],
    dietaryNeeds: [
      'Grain-Free',
      'High-Protein',
      'Weight Control',
      'Senior Formula',
      'Hypoallergenic',
      'Vegan',
    ],
    rating: ['4* & up', '3* & up', '2* & up', '1* & up'],
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const current = prev[category];
      const isSelected = current.includes(value);
      return {
        ...prev,
        [category]: isSelected
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const clearAll = () => {
    setFilters({
      category: [],
      age: [],
      breed: [],
      size: [],
      dietaryNeeds: [],
      rating: [],
    });
  };

  const applyFilters = () => {
    navigation.navigate('Products' as never, { filters } as never);
  };

  const renderFilterSection = (
    title: string,
    category: keyof FilterState,
    options: string[]
  ) => {
    const selected = filters[category];
    return (
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>{title}</Text>
        <View style={styles.filterOptions}>
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterOption,
                  isSelected && styles.filterOptionSelected,
                ]}
                onPress={() => toggleFilter(category, option)}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    isSelected && styles.filterOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const hasActiveFilters = Object.values(filters).some(
    (arr) => arr.length > 0
  );

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
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderFilterSection('Category', 'category', filterOptions.category)}
        {renderFilterSection('Age', 'age', filterOptions.age)}
        {renderFilterSection('Breed', 'breed', filterOptions.breed)}
        {renderFilterSection('Size', 'size', filterOptions.size)}
        {renderFilterSection(
          'Dietary Needs',
          'dietaryNeeds',
          filterOptions.dietaryNeeds
        )}
        {renderFilterSection('Rating', 'rating', filterOptions.rating)}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.clearButton]}
          onPress={clearAll}
        >
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.applyButton]}
          onPress={applyFilters}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
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
  scrollContent: {
    padding: 15,
    paddingBottom: 100,
  },
  filterSection: {
    marginBottom: 30,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterOptionSelected: {
    backgroundColor: '#1F2937',
    borderColor: '#1F2937',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 10,
  },
  footerButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  applyButton: {
    backgroundColor: '#1F2937',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default FilterScreen;

