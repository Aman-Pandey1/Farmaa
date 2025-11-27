import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SocialFeedScreen = () => {
  const navigation = useNavigation();
  const [posts] = useState([
    {
      _id: '1',
      user: { name: 'John Doe', profileImage: '👤' },
      content: 'My dog Max loves playing in the park! 🐕',
      images: ['🐕'],
      likes: 25,
      comments: 5,
      pet: { name: 'Max', type: 'Dog' },
    },
    {
      _id: '2',
      user: { name: 'Jane Smith', profileImage: '👤' },
      content: 'Luna enjoying her new toy 🐱',
      images: ['🐱'],
      likes: 18,
      comments: 3,
      pet: { name: 'Luna', type: 'Cat' },
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social Feed</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost' as never)}>
          <Text style={styles.addIcon}>➕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.user.profileImage}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.user.name}</Text>
                <Text style={styles.petName}>with {item.pet.name}</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{item.content}</Text>

            {item.images && item.images.length > 0 && (
              <View style={styles.postImage}>
                <Text style={styles.postEmoji}>{item.images[0]}</Text>
              </View>
            )}

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>❤️</Text>
                <Text style={styles.actionText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>📤</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addIcon: {
    fontSize: 28,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  petName: {
    fontSize: 14,
    color: '#666',
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  postEmoji: {
    fontSize: 100,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
  },
});

export default SocialFeedScreen;

