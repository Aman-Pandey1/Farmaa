import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const LikesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params as any;

  const [showEmptyState, setShowEmptyState] = useState(false);
  
  const likes = showEmptyState ? [] : [
    {
      id: '1',
      petName: 'Chitty',
      profileImage: '🐕',
      timeAgo: '30 min ago',
    },
    {
      id: '2',
      petName: 'Chitty',
      profileImage: '🐕',
      timeAgo: '30 min ago',
    },
    {
      id: '3',
      petName: 'Chitty',
      profileImage: '🐕',
      timeAgo: '30 min ago',
    },
    {
      id: '4',
      petName: 'Chitty',
      profileImage: '🐕',
      timeAgo: '30 min ago',
    },
    {
      id: '5',
      petName: 'Chitty',
      profileImage: '🐕',
      timeAgo: '30 min ago',
    },
    {
      id: '6',
      petName: 'Chitty',
      profileImage: '🐕',
      timeAgo: '30 min ago',
    },
    {
      id: '7',
      petName: 'Chitty',
      profileImage: '🐕',
      timeAgo: '30 min ago',
    },
    {
      id: '8',
      petName: 'Chitty',
      profileImage: '🐕',
      timeAgo: '30 min ago',
    },
    {
      id: '9',
      petName: 'Chitty',
      profileImage: '🐕',
      timeAgo: '30 min ago',
    },
  ];

  const handleViewProfile = (petName: string) => {
    navigation.navigate('PetProfile' as never);
  };

  const renderLikeItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.likeItem}>
      <View style={styles.profileImage}>
        <Text style={styles.profileEmoji}>{item.profileImage}</Text>
      </View>
      <View style={styles.likeInfo}>
        <Text style={styles.petName}>{item.petName} (Pet Name)</Text>
        <Text style={styles.timeAgo}>Liked • {item.timeAgo}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.viewProfileButton,
          index === 1 && styles.viewProfileButtonFocused,
        ]}
        onPress={() => handleViewProfile(item.petName)}
      >
        <Text style={styles.viewProfileButtonText}>View Profile</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Likes ({likes.length})</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Likes List or Empty State */}
      {likes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Likes Yet</Text>
          <Text style={styles.emptyDescription}>
            This post hasn't received any likes. Tap the heart to show
            appreciation.
          </Text>
          <Text style={styles.emptySubtext}>A little love goes a long way.</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => {
              setShowEmptyState(false);
              navigation.goBack();
            }}
          >
            <Text style={styles.emptyButtonText}>Like This +</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={likes}
          keyExtractor={(item) => item.id}
          renderItem={renderLikeItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  likeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileEmoji: {
    fontSize: 28,
  },
  likeInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  timeAgo: {
    fontSize: 14,
    color: '#6B7280',
  },
  viewProfileButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewProfileButtonFocused: {
    borderWidth: 2,
    borderColor: '#1E3A8A',
  },
  viewProfileButtonText: {
    fontSize: 14,
    fontWeight: '600',
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

export default LikesScreen;

