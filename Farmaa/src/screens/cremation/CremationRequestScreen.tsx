import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const NAVY = '#1E3A8A';

const CremationRequestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { center } = (route.params as any) || {};

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  const [pickupLocation, setPickupLocation] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<'dog' | 'cat' | 'other'>('dog');
  const [petBreed, setPetBreed] = useState('');
  const [ageYears, setAgeYears] = useState('');

  const [showSuccess, setShowSuccess] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      fullName.trim() &&
      mobile.trim() &&
      address.trim() &&
      pickupLocation.trim() &&
      petName.trim()
    );
  }, [fullName, mobile, address, pickupLocation, petName]);

  const submit = () => {
    if (!canSubmit) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigation.goBack();
    }, 1600);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Request for Cremation</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.centerName}>{center?.name || 'Go Nirvana Foundation'}</Text>
        <Text style={styles.centerSub}>Submit Request for Cremation</Text>

        <Text style={styles.sectionTitle}>Owner Information</Text>
        <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

        <Text style={styles.sectionTitle}>Pickup Location</Text>
        <TextInput style={styles.input} placeholder="Pickup Location" value={pickupLocation} onChangeText={setPickupLocation} />

        <Text style={styles.sectionTitle}>Pet Information</Text>
        <TextInput style={styles.input} placeholder="Pet Name" value={petName} onChangeText={setPetName} />

        <View style={styles.pillRow}>
          {(['dog', 'cat', 'other'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.pill, petType === t && styles.pillActive]}
              onPress={() => setPetType(t)}
            >
              <Text style={[styles.pillText, petType === t && styles.pillTextActive]}>
                {t === 'dog' ? 'Dog' : t === 'cat' ? 'Cat' : 'Others'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput style={styles.input} placeholder="Pet Breed" value={petBreed} onChangeText={setPetBreed} />
        <TextInput style={styles.input} placeholder="Age (Years)" value={ageYears} onChangeText={setAgeYears} keyboardType="numeric" />

        <TouchableOpacity
          style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
          onPress={submit}
          disabled={!canSubmit}
        >
          <Text style={styles.submitText}>Submit Request for Cremation →</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal transparent animationType="fade" visible={showSuccess} onRequestClose={() => setShowSuccess(false)}>
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <View style={styles.tickCircle}>
              <Text style={styles.tick}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Thank you</Text>
            <Text style={styles.successDesc}>
              Your request has been submitted successfully.
              {'\n'}Our team will contact you shortly.
            </Text>
          </View>
        </View>
      </Modal>
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
  content: { padding: 16, paddingBottom: 40 },
  centerName: { fontSize: 16, fontWeight: '900', color: '#111827', marginBottom: 4 },
  centerSub: { fontSize: 12, color: '#6B7280', marginBottom: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: '#111827', marginTop: 10, marginBottom: 10 },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
    marginBottom: 10,
  },
  pillRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  pill: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    paddingVertical: 10,
    alignItems: 'center',
  },
  pillActive: { backgroundColor: NAVY, borderColor: NAVY },
  pillText: { fontSize: 13, fontWeight: '800', color: '#111827' },
  pillTextActive: { color: '#FFFFFF' },
  submitBtn: {
    marginTop: 10,
    backgroundColor: NAVY,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#D1D5DB' },
  submitText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  successCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
  },
  tickCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tick: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  successTitle: { fontSize: 16, fontWeight: '900', color: '#111827', marginBottom: 6 },
  successDesc: { fontSize: 13, color: '#6B7280', textAlign: 'center', lineHeight: 18 },
});

export default CremationRequestScreen;


