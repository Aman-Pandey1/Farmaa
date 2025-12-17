import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const HopeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pet } = route.params as any;
  const [showOptions, setShowOptions] = useState(false);
  const [showReportDone, setShowReportDone] = useState(false);

  const petData = pet || {
    id: '1',
    name: 'Puppy (Pet Name)',
    age: '6 Months Old',
    location: 'Pratap Nagar, Jaipur',
    image: '🐕',
    badge: 'New Listing',
    badgeColor: '#10B981',
  };

  const ownerData = {
    name: 'John Doe',
    phone: '123456XXXX',
    profileImage: '👤',
  };

  const petDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const handleCall = () => {
    // Logic to make phone call
  };

  const handleChat = () => {
    navigation.navigate('HopeChat' as never, {
      name: ownerData.name,
    } as never);
  };

  const getActionButton = () => {
    if (petData.badge === 'Adopt Now') {
      return (
        <View style={styles.actionRow}>
          <View style={styles.statusPillPurple}>
            <Text style={styles.statusPillText}>Adoption</Text>
          </View>
          <TouchableOpacity style={styles.primaryAction} onPress={handleCall}>
            <Text style={styles.primaryActionText}>Adopt</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.actionRow}>
        <View style={styles.statusPillGreen}>
          <Text style={styles.statusPillText}>New Listing</Text>
        </View>
        <TouchableOpacity style={styles.primaryAction} onPress={handleCall}>
          <Text style={styles.primaryActionText}>Call Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{petData.name}</Text>
        <TouchableOpacity onPress={() => setShowOptions(true)}>
          <Text style={styles.moreIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pet Image */}
        <View style={styles.petImageContainer}>
          <Text style={styles.petImageEmoji}>{petData.image}</Text>
        </View>

        {/* Pet Information */}
        <View style={styles.section}>
          <Text style={styles.petName}>{petData.name}</Text>
          <Text style={styles.petAge}>{petData.age}</Text>
          <Text style={styles.petLocation}>{petData.location}</Text>
          {getActionButton()}
        </View>

        {/* Owner Information */}
        <View style={styles.section}>
          <View style={styles.ownerHeader}>
            <View style={styles.ownerProfileContainer}>
              <Text style={styles.ownerProfileEmoji}>{ownerData.profileImage}</Text>
            </View>
            <View style={styles.ownerInfo}>
              <Text style={styles.ownerName}>{ownerData.name}</Text>
              <Text style={styles.ownerPhone}>{ownerData.phone}</Text>
            </View>
          </View>
          <View style={styles.ownerActions}>
            <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
              <Text style={styles.chatButtonText}>Chat Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineButton} onPress={handleCall}>
              <Text style={styles.outlineButtonText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pet Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pet Details</Text>
          <Text style={styles.petDescription}>{petDescription}</Text>
        </View>
      </ScrollView>

      {/* Options Bottom Sheet */}
      <Modal
        transparent
        animationType="slide"
        visible={showOptions}
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Options</Text>
              <TouchableOpacity onPress={() => setShowOptions(false)}>
                <Text style={styles.sheetClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sheetActions}>
              <TouchableOpacity style={styles.sheetAction} onPress={handleCall}>
                <View style={[styles.sheetIconCircle, { backgroundColor: '#10B981' }]}>
                  <Text style={styles.sheetIcon}>📞</Text>
                </View>
                <Text style={styles.sheetActionText}>Make Contact</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sheetAction} onPress={handleChat}>
                <View style={[styles.sheetIconCircle, { backgroundColor: '#1E3A8A' }]}>
                  <Text style={styles.sheetIcon}>💬</Text>
                </View>
                <Text style={styles.sheetActionText}>Direct Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sheetAction}
                onPress={() => {
                  setShowOptions(false);
                  setShowReportDone(true);
                  setTimeout(() => setShowReportDone(false), 1600);
                }}
              >
                <View style={[styles.sheetIconCircle, { backgroundColor: '#EF4444' }]}>
                  <Text style={styles.sheetIcon}>🚩</Text>
                </View>
                <Text style={styles.sheetActionText}>Report Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Report Done */}
      <Modal transparent animationType="fade" visible={showReportDone}>
        <View style={styles.reportOverlay}>
          <View style={styles.reportCard}>
            <View style={styles.reportTick}>
              <Text style={styles.reportTickText}>✓</Text>
            </View>
            <Text style={styles.reportTitle}>Thanks!</Text>
            <Text style={styles.reportSub}>
              Your report has been submitted. We’ll review it shortly.
            </Text>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  moreIcon: {
    fontSize: 26,
    color: '#111827',
    fontWeight: '800',
    paddingHorizontal: 6,
  },
  petImageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petImageEmoji: {
    fontSize: 120,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  petAge: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  petLocation: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  callButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  adoptButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  adoptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ownerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ownerProfileContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ownerProfileEmoji: {
    fontSize: 30,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  ownerPhone: {
    fontSize: 14,
    color: '#6B7280',
  },
  chatButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1E3A8A',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  ownerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  outlineButton: {
    width: 90,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  statusPillGreen: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#10B981',
  },
  statusPillPurple: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#8B5CF6',
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  primaryAction: {
    flex: 1,
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  sheetClose: { fontSize: 22, color: '#6B7280' },
  sheetActions: { gap: 12, paddingBottom: 8 },
  sheetAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  sheetIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetIcon: { color: '#FFFFFF', fontSize: 18 },
  sheetActionText: { fontSize: 15, fontWeight: '700', color: '#111827' },
  reportOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  reportCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  reportTick: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  reportTickText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  reportTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 6 },
  reportSub: { fontSize: 13, color: '#6B7280', textAlign: 'center', lineHeight: 18 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  petDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
});

export default HopeDetailScreen;

