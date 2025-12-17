import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NAVY = '#1E3A8A';

type LocationItem = { id: string; title: string; subtitle?: string };

const CremationChangeLocationScreen = () => {
  const navigation = useNavigation();
  const [q, setQ] = useState('');

  const suggestions: LocationItem[] = [
    { id: '1', title: 'Pratap Nagar, Jaipur', subtitle: 'Rajasthan, India' },
    { id: '2', title: 'Mansarovar, Jaipur', subtitle: 'Rajasthan, India' },
    { id: '3', title: 'Vaishali Nagar, Jaipur', subtitle: 'Rajasthan, India' },
  ];

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return suggestions;
    return suggestions.filter(
      (i) =>
        i.title.toLowerCase().includes(s) ||
        (i.subtitle || '').toLowerCase().includes(s),
    );
  }, [q]);

  const select = (loc: LocationItem) => {
    navigation.navigate('Cremation' as never, { selectedLocation: loc.title } as never);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select Location</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search location"
            placeholderTextColor="#9CA3AF"
            value={q}
            onChangeText={setQ}
            autoFocus
          />
          <Text style={styles.micIcon}>🎤</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.currentLocBtn} onPress={() => select(suggestions[0])}>
        <View style={styles.currentLocIcon}>
          <Text style={styles.pin}>📍</Text>
        </View>
        <Text style={styles.currentLocText}>Use my Current Location</Text>
      </TouchableOpacity>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.locRow} onPress={() => select(item)}>
            <Text style={styles.locTitle}>{item.title}</Text>
            {!!item.subtitle && <Text style={styles.locSub}>{item.subtitle}</Text>}
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
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
  searchWrap: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: { fontSize: 16, color: '#6B7280' },
  micIcon: { fontSize: 18, color: '#6B7280' },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },
  currentLocBtn: {
    marginHorizontal: 16,
    marginTop: 6,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  currentLocIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pin: { color: '#FFFFFF' },
  currentLocText: { fontSize: 14, fontWeight: '800', color: '#111827' },
  listContent: { padding: 16, paddingTop: 10, paddingBottom: 24 },
  locRow: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  locTitle: { fontSize: 15, fontWeight: '800', color: '#111827' },
  locSub: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});

export default CremationChangeLocationScreen;


