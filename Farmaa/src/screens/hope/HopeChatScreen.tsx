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
import { useNavigation, useRoute } from '@react-navigation/native';

type ChatMsg = {
  id: string;
  text: string;
  isMe: boolean;
};

const NAVY = '#1E3A8A';

const HopeChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name } = (route.params as any) || {};

  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { id: '1', text: 'Hi! I saw your post.', isMe: false },
    { id: '2', text: 'Hello 👋', isMe: true },
  ]);

  const quickChip = useMemo(() => 'PET HEALTH GUIDANCE?', []);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    const mine: ChatMsg = { id: String(Date.now()), text: t, isMe: true };
    setMsgs((p) => [...p, mine]);
    setInput('');
  };

  const onChip = () => {
    const mine: ChatMsg = { id: String(Date.now()), text: quickChip, isMe: true };
    setMsgs((p) => [...p, mine]);
  };

  const renderItem = ({ item }: { item: ChatMsg }) => (
    <View style={[styles.bubble, item.isMe ? styles.bubbleMe : styles.bubbleOther]}>
      <Text style={[styles.bubbleText, item.isMe ? styles.bubbleTextMe : styles.bubbleTextOther]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {name || 'Hope Chat'}
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Text style={styles.headerIcon}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Text style={styles.headerIcon}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          data={msgs}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.centerChipWrap}>
          <TouchableOpacity style={styles.centerChip} onPress={onChip}>
            <Text style={styles.centerChipText}>{quickChip}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.attachBtn}>
          <Text style={styles.attachIcon}>＋</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]} onPress={send}>
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
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
  backIcon: { fontSize: 24, color: '#111827', fontWeight: '700' },
  title: { fontSize: 18, fontWeight: '700', color: '#111827', flex: 1, marginLeft: 10 },
  headerRight: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  headerIconBtn: { padding: 6 },
  headerIcon: { fontSize: 18, color: '#111827' },
  body: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 100 },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 10,
  },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: NAVY, borderTopRightRadius: 4 },
  bubbleOther: { alignSelf: 'flex-start', backgroundColor: '#F3F4F6', borderTopLeftRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 18 },
  bubbleTextMe: { color: '#FFFFFF', fontWeight: '600' },
  bubbleTextOther: { color: '#111827', fontWeight: '500' },
  centerChipWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '45%',
    alignItems: 'center',
  },
  centerChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  centerChipText: { fontSize: 12, fontWeight: '800', color: '#111827', letterSpacing: 0.6 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  attachBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachIcon: { fontSize: 18, color: '#111827', fontWeight: '800' },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.5 },
  sendIcon: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});

export default HopeChatScreen;


