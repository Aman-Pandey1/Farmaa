import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { program } = (route.params as any) || {};

  const benefits = [
    'Smart Training Modules',
    'Multiple Pet Profiles',
    '50+ Expert-Led Lessons & Videos',
    'Beginner to Advanced Skill Progression',
    'Track Learning Progress',
    'Bookmark & Continue Watching',
  ];

  const handleFreeTrial = () => {
    // Navigate to payment or activate trial
    console.log('Start free trial');
  };

  const handleContinue = () => {
    // Continue to free trial
    handleFreeTrial();
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
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Image */}
        <View style={styles.imageContainer}>
          <Text style={styles.topImage}>🐕</Text>
        </View>

        {/* Main Title */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.mainTitle}>
              Unlock All Intermediate & Advanced Training Videos
            </Text>
            <Text style={styles.pawIcon}>🐾</Text>
          </View>
          <Text style={styles.description}>
            Get full access to every lesson and boost your pet's training
            journey.
          </Text>
        </View>

        {/* Free Trial Button */}
        <View style={styles.freeTrialSection}>
          <TouchableOpacity
            style={styles.freeTrialButton}
            onPress={handleFreeTrial}
          >
            <Text style={styles.freeTrialButtonText}>3-Day Free Trial</Text>
          </TouchableOpacity>
        </View>

        {/* What You Get Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>What You Get</Text>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        {/* Pricing Section */}
        <View style={styles.pricingSection}>
          <View style={styles.pricingCard}>
            <Text style={styles.pricingAmount}>Only ₹999</Text>
            <Text style={styles.pricingLabel}>One-Time Access!</Text>
            <Text style={styles.pricingSubtext}>
              No hidden fees, lifetime money-back guarantee.
            </Text>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>
            Continue to Free Trial
          </Text>
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
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  topImage: {
    fontSize: 120,
  },
  titleSection: {
    padding: 20,
    paddingBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  mainTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 30,
  },
  pawIcon: {
    fontSize: 20,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  freeTrialSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  freeTrialButton: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  freeTrialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065F46',
  },
  benefitsSection: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  checkmark: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: 'bold',
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  pricingSection: {
    padding: 20,
    paddingTop: 10,
  },
  pricingCard: {
    backgroundColor: '#D1FAE5',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
  },
  pricingAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 8,
  },
  pricingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 8,
  },
  pricingSubtext: {
    fontSize: 12,
    color: '#047857',
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  continueButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SubscriptionScreen;

