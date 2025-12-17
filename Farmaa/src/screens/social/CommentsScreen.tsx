import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CommentsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params as any;
  const [commentText, setCommentText] = useState('');

  const [showEmptyState, setShowEmptyState] = useState(false);
  
  const comments = showEmptyState ? [] : [
    {
      _id: '1',
      petName: 'Chitty',
      profileImage: '🐕',
      comment: 'Lorem metus porttitor purus enim. Non et mauris quam porttitor faucibus id.',
      timeAgo: '30 min ago',
    },
    {
      _id: '2',
      petName: 'Max',
      profileImage: '🐕',
      comment: 'So cute! Love this post!',
      timeAgo: '1 hour ago',
    },
    {
      _id: '3',
      petName: 'Luna',
      profileImage: '🐱',
      comment: 'Amazing! Keep it up!',
      timeAgo: '2 hours ago',
    },
    {
      _id: '4',
      petName: 'Buddy',
      profileImage: '🐕',
      comment: 'Lorem metus porttitor purus enim. Non et mauris quam porttitor faucibus id.',
      timeAgo: '3 hours ago',
    },
    {
      _id: '5',
      petName: 'Charlie',
      profileImage: '🐕',
      comment: 'This is so adorable!',
      timeAgo: '5 hours ago',
    },
  ];

  const handleSend = () => {
    if (commentText.trim()) {
      // Add comment logic here
      setCommentText('');
    }
  };

  const renderComment = ({ item }: { item: any }) => (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <View style={styles.profileImage}>
          <Text style={styles.profileEmoji}>{item.profileImage}</Text>
        </View>
        <View style={styles.commentContent}>
          <View style={styles.commentHeaderRow}>
            <Text style={styles.petName}>{item.petName} (Pet Name)</Text>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
          <Text style={styles.commentText}>{item.comment}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Comments List or Empty State */}
      {comments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Comments Yet</Text>
          <Text style={styles.emptyDescription}>
            Be the first to share your thoughts or start a conversation.
          </Text>
          <Text style={styles.emptySubtext}>
            Every story grows with a voice.
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => {
              setShowEmptyState(false);
              // Focus on input
            }}
          >
            <Text style={styles.emptyButtonText}>Add Comment +</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={renderComment}
          contentContainerStyle={styles.commentsList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Bottom Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add your comment..."
          placeholderTextColor="#999999"
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!commentText.trim()}
        >
          <Text style={styles.sendIcon}>✈️</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  commentsList: {
    padding: 20,
    paddingBottom: 100,
  },
  commentCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileEmoji: {
    fontSize: 24,
  },
  commentContent: {
    flex: 1,
  },
  commentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 8,
  },
  timeAgo: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commentText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
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
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  sendIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  emptyButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CommentsScreen;

