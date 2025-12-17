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
import { useNavigation, useRoute } from '@react-navigation/native';

const NAVY = '#1E3A8A';

type Center = {
  id: string;
  name: string;
  address: string;
  distance: string;
  poster: string; // emoji placeholder
};

const CremationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedLocation = (route.params as any)?.selectedLocation as string | undefined;

  const [q, setQ] = useState('');
  const [location, setLocation] = useState(selectedLocation || 'Pratap Nagar, Jaipur');
  const [showEmpty, setShowEmpty] = useState(false);

  const centers: Center[] = showEmpty
    ? []
    : [
        {
          id: '1',
          name: 'Go Nirvana Foundation',
          address: 'Plot No 12, Near Main Road, Pratap Nagar, Jaipur, Rajasthan',
          distance: '0.8 km',
          poster: '🕊️🐾',
        },
        {
          id: '2',
          name: 'Go Nirvana Foundation',
          address: 'Sector 5, Malviya Nagar, Jaipur, Rajasthan',
          distance: '1.9 km',
          poster: '🕊️🐾',
        },
      ];

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const base = centers;
    if (!s) return base;
    return base.filter(
      (c) => c.name.toLowerCase().includes(s) || c.address.toLowerCase().includes(s),
    );
  }, [q, centers]);

  const openRequest = (center: Center) => {
    navigation.navigate('CremationRequest' as never, { center } as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cremation</Text>
        <TouchableOpacity style={styles.locationPill} onPress={() => navigation.navigate('CremationChangeLocation' as never)}>
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
            style={styles.searchInput}
            placeholder="Search Cremation"
            placeholderTextColor="#9CA3AF"
            value={q}
            onChangeText={setQ}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowEmpty((p) => !p)}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>No Cremation Services Available</Text>
          <Text style={styles.emptyDesc}>
            We couldn&apos;t find any cremation services in your selected area. Try changing your
            location to discover available options.
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => navigation.navigate('CremationChangeLocation' as never)}
          >
            <Text style={styles.emptyBtnText}>Change location →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.poster}>
                <Text style={styles.posterEmoji}>{item.poster}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.centerName}>{item.name}</Text>
                <Text style={styles.distance}>{item.distance} away</Text>
                <Text style={styles.address} numberOfLines={2}>
                  {item.address}
                </Text>
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.iconBtn}>
                    <Text style={styles.icon}>📞</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn}>
                    <Text style={styles.icon}>📤</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryBtn} onPress={() => openRequest(item)}>
                    <Text style={styles.primaryBtnText}>Send Request for Cremation</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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
  title: { fontSize: 18, fontWeight: '800', color: '#111827', flex: 1 },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 7,
    maxWidth: 170,
  },
  locationIcon: { fontSize: 14 },
  locationText: { fontSize: 12, fontWeight: '700', color: '#111827' },
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
  poster: { height: 190, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' },
  posterEmoji: { fontSize: 56, color: '#FFFFFF' },
  cardBody: { padding: 12 },
  centerName: { fontSize: 16, fontWeight: '900', color: '#111827', marginBottom: 4 },
  distance: { fontSize: 12, color: '#6B7280', marginBottom: 6 },
  address: { fontSize: 12, color: '#6B7280', lineHeight: 16, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: { fontSize: 18, color: '#111827' },
  primaryBtn: {
    flex: 1,
    backgroundColor: NAVY,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 10, textAlign: 'center' },
  emptyDesc: { fontSize: 13, color: '#6B7280', textAlign: 'center', lineHeight: 18, marginBottom: 18 },
  emptyBtn: { backgroundColor: NAVY, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 14 },
  emptyBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
});

export default CremationScreen;


