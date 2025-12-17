import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const NAVY = '#1E3A8A';

const PetEventDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = (route.params as any) || {};

  const data = event || {
    title: 'Jaipur Dog Show 2025',
    date: 'Sunday 15 February 2025',
    venue: 'Bharat Sanskar, Jaipur',
    poster: '🐶🎉',
    about:
      'A community pet event with shows, contests, stalls, and activities. Join other pet lovers for a fun day.',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          Event Details
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.poster}>
          <Text style={styles.posterEmoji}>{data.poster}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.eventTitle}>{data.title}</Text>
          <Text style={styles.meta}>{data.date}</Text>
          <Text style={styles.meta}>{data.venue}</Text>

          <Text style={styles.sectionTitle}>About/Description of Event</Text>
          <Text style={styles.desc}>{data.about}</Text>

          <Text style={styles.sectionTitle}>Event Highlights: Jaipur Dog Show 2025</Text>
          <Text style={styles.desc}>
            - Dog show categories & prizes{'\n'}
            - Pet stalls, grooming & training demo{'\n'}
            - Adoption awareness & community meet{'\n'}
            - Photo zone and fun activities
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.ctaBtn}>
          <Text style={styles.ctaText}>Register / Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backIcon: { fontSize: 24, color: '#111827', fontWeight: '800' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  headerSpacer: { width: 24 },
  poster: {
    height: 320,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterEmoji: { fontSize: 72, color: '#FFFFFF' },
  body: { padding: 16, paddingBottom: 90 },
  eventTitle: { fontSize: 18, fontWeight: '900', color: '#111827', marginBottom: 8 },
  meta: { fontSize: 13, color: '#6B7280', marginBottom: 6 },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: '#111827', marginTop: 16, marginBottom: 8 },
  desc: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  ctaBtn: { backgroundColor: NAVY, borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  ctaText: { color: '#FFFFFF', fontWeight: '900', fontSize: 15 },
});

export default PetEventDetailScreen;


