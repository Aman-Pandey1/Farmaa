import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatHistoryScreen = () => {
  const navigation = useNavigation();

  const chatHistory = [
    { id: '1', topic: 'Pet Health Guidance?', timestamp: '2 hours ago' },
    { id: '2', topic: 'Find Nearby Vet Clinics', timestamp: '1 day ago' },
    { id: '3', topic: 'Pet Nutrition Advice', timestamp: '2 days ago' },
    { id: '4', topic: 'Behavior & Training Tips', timestamp: '3 days ago' },
    { id: '5', topic: 'Grooming & Hygiene', timestamp: '4 days ago' },
    { id: '6', topic: 'Lost & Found Support', timestamp: '5 days ago' },
    { id: '7', topic: 'Pet Adoption Guidance', timestamp: '1 week ago' },
    { id: '8', topic: 'Pet Events Information', timestamp: '1 week ago' },
  ];

  const handleChatSelect = (topic: string) => {
    navigation.navigate('PetAIChat' as never, { initialTopic: topic } as never);
  };

  const renderChatItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatSelect(item.topic)}
    >
      <Text style={styles.chatTopic}>{item.topic}</Text>
      <Text style={styles.chatQuestionMark}>?</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat History</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Chat History List */}
      <FlatList
        data={chatHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  headerSpacer: {
    width: 24,
  },
  listContent: {
    padding: 20,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  chatTopic: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
  },
  chatQuestionMark: {
    fontSize: 20,
    color: '#9CA3AF',
  },
});

export default ChatHistoryScreen;

