import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type HopeChatThread = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
};

const NAVY = '#1E3A8A';

const HopeChatsListScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  // Keep empty by default to show empty state exactly like Figma.
  const threads: HopeChatThread[] = [];

  const myPosts: any[] = []; // empty state for "Post" tab

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter(
      (t) =>
        t.name.toLowerCase().includes(q) || t.lastMessage.toLowerCase().includes(q),
    );
  }, [query]);

  const openThread = (thread: HopeChatThread) => {
    navigation.navigate(
      'HopeChat' as never,
      {
        threadId: thread.id,
        name: thread.name,
      } as never,
    );
  };

  const renderItem = ({ item }: { item: HopeChatThread }) => (
    <TouchableOpacity style={styles.row} onPress={() => openThread(item)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarEmoji}>{item.avatar}</Text>
      </View>
      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread ? <View style={styles.unreadDot} /> : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  const [activeTab, setActiveTab] = useState<'Hope' | 'Post' | 'Chats'>('Post');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Hope Post and Chats</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Text style={styles.headerIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Text style={styles.headerIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabsRow}>
        {(['Hope', 'Post', 'Chats'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabPill, activeTab === t && styles.tabPillActive]}
            onPress={() => {
              setActiveTab(t);
              setQuery('');
              if (t === 'Hope') {
                navigation.navigate('Hope' as never);
              }
            }}
          >
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search chats"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
          />
          <Text style={styles.micIcon}>🎤</Text>
        </View>
      </View>

      {activeTab === 'Post' ? (
        myPosts.length === 0 ? (
          <View style={styles.emptyStateWrap}>
            <Text style={styles.emptyTitle}>You Haven&apos;t Created Any Hope Post</Text>
            <Text style={styles.emptySub}>
              Create your first post to help pets find a home or get support for lost &amp; found.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => navigation.navigate('AddHopePost' as never)}
            >
              <Text style={styles.emptyBtnText}>Add Hope Post</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyTab}>
            <Text style={styles.emptyTabTitle}>Posts</Text>
            <Text style={styles.emptyTabSub}>My posts list coming soon.</Text>
          </View>
        )
      ) : activeTab === 'Chats' ? (
        filtered.length === 0 ? (
          <View style={styles.emptyStateWrap}>
            <Text style={styles.emptyTitle}>No Chats Yet</Text>
            <Text style={styles.emptySub}>
              Start a conversation from any Hope post to connect with the owner.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => navigation.navigate('Hope' as never)}
            >
              <Text style={styles.emptyBtnText}>Start a Chat</Text>
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
        )
      ) : null}
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
  backIcon: { fontSize: 24, color: '#111827', fontWeight: '700' },
  title: { fontSize: 18, fontWeight: '700', color: '#111827' },
  headerRight: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  headerIconBtn: { padding: 6 },
  headerIcon: { fontSize: 18, color: '#111827' },
  searchWrap: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6 },
  tabsRow: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  tabPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  tabPillActive: { backgroundColor: NAVY, borderColor: NAVY },
  tabText: { fontSize: 13, fontWeight: '800', color: '#111827' },
  tabTextActive: { color: '#FFFFFF' },
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
  listContent: { paddingTop: 6, paddingBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarEmoji: { fontSize: 22 },
  rowBody: { flex: 1 },
  rowTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: 15, fontWeight: '700', color: '#111827', flex: 1, marginRight: 10 },
  time: { fontSize: 12, color: '#6B7280' },
  rowBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  lastMessage: { fontSize: 13, color: '#6B7280', flex: 1, marginRight: 10, marginTop: 4 },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: NAVY,
    marginTop: 6,
  },
  emptyTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTabTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 8 },
  emptyTabSub: { fontSize: 13, color: '#6B7280', textAlign: 'center' },
  emptyStateWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySub: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  emptyBtn: {
    backgroundColor: NAVY,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    minWidth: 180,
    alignItems: 'center',
  },
  emptyBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});

export default HopeChatsListScreen;


