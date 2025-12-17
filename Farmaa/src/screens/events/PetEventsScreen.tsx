import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NAVY = '#1E3A8A';

type PetEvent = {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  poster: string; // emoji placeholder
  about: string;
};

const PetEventsScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState('Pratap Nagar, Jaipur');
  const [q, setQ] = useState('');
  const [showEmpty, setShowEmpty] = useState(false);

  const events: PetEvent[] = showEmpty
    ? []
    : [
        {
          id: '1',
          title: 'Jaipur Dog Show 2025',
          date: 'Sunday 15 February 2025',
          venue: 'Bharat Sanskar, Jaipur',
          city: 'Jaipur',
          poster: '🐶🎉',
          about:
            'A fun community dog show with categories, prizes, and adoption awareness. Bring your pet and join the celebration.',
        },
        {
          id: '2',
          title: 'Paws & Play Fest',
          date: 'Saturday 08 March 2025',
          venue: 'Central Park',
          city: 'Jaipur',
          poster: '🐾🎪',
          about:
            'Games, grooming demos, pet-friendly stalls, and training sessions. Family-friendly and pet-friendly event.',
        },
      ];

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return events;
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(s) ||
        e.venue.toLowerCase().includes(s) ||
        e.city.toLowerCase().includes(s),
    );
  }, [events, q]);

  const openDetail = (event: PetEvent) => {
    navigation.navigate('PetEventDetail' as never, { event } as never);
  };

  const renderItem = ({ item }: { item: PetEvent }) => (
    <TouchableOpacity style={styles.card} onPress={() => openDetail(item)}>
      <View style={styles.poster}>
        <Text style={styles.posterEmoji}>{item.poster}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.meta}>{item.date}</Text>
        <Text style={styles.meta} numberOfLines={1}>
          {item.venue}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Events</Text>
        <TouchableOpacity style={styles.locationPill} onPress={() => setShowEmpty((p) => !p)}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText} numberOfLines={1}>
            {location}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search Pet Events"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>No Pet Events Available</Text>
          <Text style={styles.emptyDesc}>
            There are no upcoming pet events in your selected area right now. Try changing your
            location or check back soon.
          </Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => setShowEmpty(false)}>
            <Text style={styles.emptyBtnText}>Explore events →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backIcon: { fontSize: 24, color: '#111827', fontWeight: '800' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#111827', flex: 1 },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 7,
    maxWidth: 160,
  },
  locationIcon: { fontSize: 14 },
  locationText: { fontSize: 12, color: '#111827', fontWeight: '700' },
  searchRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: { fontSize: 16, color: '#6B7280' },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterIcon: { fontSize: 18, color: '#111827' },
  listContent: { padding: 16, paddingBottom: 24, gap: 14 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  poster: {
    height: 190,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterEmoji: { fontSize: 56, color: '#FFFFFF' },
  cardBody: { padding: 12 },
  title: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 6 },
  meta: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 10 },
  emptyDesc: { fontSize: 13, color: '#6B7280', textAlign: 'center', lineHeight: 18, marginBottom: 18 },
  emptyBtn: { backgroundColor: NAVY, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 14 },
  emptyBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
});

export default PetEventsScreen;


