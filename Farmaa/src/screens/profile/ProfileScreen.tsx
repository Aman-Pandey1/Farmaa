import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>

      {/* Pet Profile Section */}
      <TouchableOpacity
        style={styles.sectionCard}
        onPress={() => navigation.navigate('PetProfile' as never)}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🐾</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Pet Profile</Text>
            <Text style={styles.sectionSubtitle}>See All Pet Profile</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </TouchableOpacity>

      {/* All Services Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionGroupTitle}>All Services</Text>
        
        <TouchableOpacity
          style={styles.serviceItem}
          onPress={() => navigation.navigate('PetAIChat' as never)}
        >
          <Text style={styles.serviceIcon}>⚡</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Furrmaa Pet AI Chat</Text>
            <Text style={styles.serviceSubtitle}>Premium Pet AI Chatbot</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceItem}
          onPress={() => navigation.navigate('Hope' as never)}
        >
          <Text style={styles.serviceIcon}>❤️</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Hope</Text>
            <Text style={styles.serviceSubtitle}>Lost, Found & Adoption</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceItem}
          onPress={() => navigation.navigate('HopeChats' as never)}
        >
          <Text style={styles.serviceIcon}>🐾</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Hope Post and Chats</Text>
            <Text style={styles.serviceSubtitle}>Post and Chat with Pet Lovers</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceItem}
          onPress={() => navigation.navigate('PetEvents' as never)}
        >
          <Text style={styles.serviceIcon}>📅</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Pet Events</Text>
            <Text style={styles.serviceSubtitle}>See All Pet Events</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceItem}
          onPress={() => navigation.navigate('Cremation' as never)}
        >
          <Text style={styles.serviceIcon}>⚱️</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Cremation</Text>
            <Text style={styles.serviceSubtitle}>Pet Cremation Request</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceItem}
          onPress={() => navigation.navigate('Orders' as never)}
        >
          <Text style={styles.serviceIcon}>🛍️</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>My Orders</Text>
            <Text style={styles.serviceSubtitle}>View all your orders</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Account and Address Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionGroupTitle}>Account and Address</Text>
        
        <TouchableOpacity
          style={styles.serviceItem}
          onPress={() => navigation.navigate('EditProfile' as never)}
        >
          <Text style={styles.serviceIcon}>👤</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>My Account</Text>
            <Text style={styles.serviceSubtitle}>Manage your account</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

          <TouchableOpacity
          style={styles.serviceItem}
          onPress={() => navigation.navigate('Address' as never)}
        >
          <Text style={styles.serviceIcon}>🏠</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>My Address</Text>
            <Text style={styles.serviceSubtitle}>Manage your Address</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>💳</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>My Subscription Plan</Text>
            <Text style={styles.serviceSubtitle}>Manage your My Subscription Plan</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications and Settings Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionGroupTitle}>Notifications and Settings</Text>
        
        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>🔔</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Notifications</Text>
            <Text style={styles.serviceSubtitle}>See your all Notifications</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>⚙️</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Setting</Text>
            <Text style={styles.serviceSubtitle}>Manage your app settings</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionGroupTitle}>Support</Text>
        
        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>❓</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>FAQ's</Text>
            <Text style={styles.serviceSubtitle}>View all Frequently Asked Questions</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>💬</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Chat With us</Text>
            <Text style={styles.serviceSubtitle}>If you have any concerns, chat with us</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>👍</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Share Feedback</Text>
            <Text style={styles.serviceSubtitle}>Share your feedback to help improve the Furrmaa app</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </View>

      {/* General Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionGroupTitle}>General</Text>
        
        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>ℹ️</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>About us</Text>
            <Text style={styles.serviceSubtitle}>Learn more about who we are</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>📄</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Terms of Services</Text>
            <Text style={styles.serviceSubtitle}>Read our Furrmaa Terms of Service</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>📋</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Privacy and Policy</Text>
            <Text style={styles.serviceSubtitle}>Read our Furrmaa Privacy Policy</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
      </View>

      {/* Others Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionGroupTitle}>Others</Text>
        
        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>⭐</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Rate us Play Store</Text>
            <Text style={styles.serviceSubtitle}>Share your valuable feedback on the Play Store</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>✓</Text>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>App Latest Version</Text>
            <Text style={styles.serviceSubtitle}>Check the latest version of the app</Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
      </TouchableOpacity>
      </View>

      {/* App Information Footer */}
      <View style={styles.footer}>
        <View style={styles.appLogo}>
          <Text style={styles.logoEmoji}>🐾</Text>
        </View>
        <View style={styles.appInfo}>
          <Text style={styles.appName}>FURRMAA</Text>
          <Text style={styles.appTagline}>WHERE EVERY PET FEELS AT HOME</Text>
          <Text style={styles.appVersion}>App Version 1.0.0</Text>
        </View>
        <Text style={styles.footerText}>
          Made With Gentle Care in Jaipur, India
        </Text>
        <Text style={styles.footerSlogan}>
          Because Your Pet Deserves the Very Best 🐾
        </Text>
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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    paddingVertical: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  sectionGroupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    paddingHorizontal: 20,
    paddingBottom: 10,
    textTransform: 'uppercase',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  serviceIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    paddingBottom: 50,
    backgroundColor: '#FFFFFF',
    marginTop: 15,
  },
  appLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoEmoji: {
    fontSize: 50,
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  appTagline: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  appVersion: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerSlogan: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
});

export default ProfileScreen;
