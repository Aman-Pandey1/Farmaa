import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const PetAIChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { initialTopic } = route.params as any;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (initialTopic) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: initialTopic,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages([userMessage]);
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Ask about symptoms, care tips, or general health questions.',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);
    }
  }, [initialTopic]);

  const suggestedTopics = [
    'Pet Health Guidance?',
    'Find Nearby Vet Clinics?',
    'Pet Nutrition Advice?',
    'Behavior & Training Tips?',
    'Grooming & Hygiene?',
    'Lost & Found Support?',
    'Pet Adoption Guidance?',
    'Pet Events Information?',
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Ask about symptoms, care tips, or general health questions.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSuggestedTopic = (topic: string) => {
    handleSendMessage(topic);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.isUser ? styles.userMessageText : styles.aiMessageText,
        ]}
      >
        {item.text}
      </Text>
      {!item.isUser && (
        <View style={styles.messageActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👎</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatHistory' as never)}
        >
          <View style={styles.historyButton}>
            <Text style={styles.historyIcon}>🕐</Text>
            <Text style={styles.historyText}>History</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <>
            {/* Welcome Message */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>
                Welcome to Furrmaa Pet AI Chat
              </Text>
              <Text style={styles.welcomeSubtitle}>
                How can I help you today?
              </Text>
            </View>

            {/* Suggested Topics */}
            <View style={styles.suggestedTopicsContainer}>
              {suggestedTopics.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestedTopic}
                  onPress={() => handleSuggestedTopic(topic)}
                >
                  <Text style={styles.suggestedTopicText}>{topic}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            scrollEnabled={false}
          />
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.cameraButton}>
          <Text style={styles.cameraIcon}>📷</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={messages.length === 0 ? 'Ask anything' : 'Ask anything'}
          placeholderTextColor="#9CA3AF"
          value={inputText}
          onChangeText={setInputText}
          multiline
          onSubmitEditing={() => handleSendMessage(inputText)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleSendMessage(inputText)}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendIcon}>✈️</Text>
        </TouchableOpacity>
      </View>

      {/* Disclaimer */}
      <Text style={styles.disclaimer}>
        AI can make mistakes. Please double-check responses.
      </Text>
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
  headerSpacer: {
    flex: 1,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  historyIcon: {
    fontSize: 18,
  },
  historyText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  suggestedTopicsContainer: {
    gap: 12,
  },
  suggestedTopic: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  suggestedTopicText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E3A8A',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#1F2937',
  },
  messageActions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    padding: 4,
  },
  actionIcon: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 10,
  },
  cameraButton: {
    padding: 8,
  },
  cameraIcon: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  sendIcon: {
    fontSize: 24,
  },
  disclaimer: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});

export default PetAIChatScreen;

