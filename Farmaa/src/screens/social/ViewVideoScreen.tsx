import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ViewVideoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params as any;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const post = {
    petName: 'Chitty',
    profileImage: '🐕',
    description:
      'Lorem metus porttitor purus enim. Non et mauris quam porttitor faucibus id.',
    musicName: 'Loremmetus (Music name)',
    likes: 834,
    comments: 123,
    shares: 65,
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDelete = () => {
    // Delete logic here
    setShowDeleteModal(false);
    navigation.goBack();
  };

  const handleComment = () => {
    navigation.navigate('Comments' as never, { postId } as never);
  };

  const handleShare = () => {
    // Share logic
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Video Player */}
      <View style={styles.videoContainer}>
        <View style={styles.videoPlayer}>
          <Text style={styles.videoPlaceholder}>📹</Text>
          <Text style={styles.videoText}>Video Player</Text>
        </View>

        {/* Top Right Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setShowDeleteModal(true)}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>

        {/* Right Sidebar Actions */}
        <View style={styles.actionSidebar}>
          <View style={styles.actionButton}>
            <TouchableOpacity onPress={handleLike}>
              <Text style={styles.actionIcon}>{isLiked ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Likes' as never, { postId } as never)
              }
            >
              <Text style={styles.actionCount}>{post.likes}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleComment}
          >
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionCount}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Text style={styles.actionIcon}>✈️</Text>
            <Text style={styles.actionCount}>{post.shares}</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Left Post Details */}
        <View style={styles.postDetails}>
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <Text style={styles.profileEmoji}>{post.profileImage}</Text>
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.petName}>{post.petName} (Pet Name)</Text>
              <Text style={styles.postDescription}>{post.description}</Text>
              <View style={styles.musicSection}>
                <Text style={styles.musicIcon}>🎵</Text>
                <Text style={styles.musicName}>{post.musicName}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalContent}>
            <View style={styles.deleteModalHeader}>
              <Text style={styles.deleteModalIcon}>🗑️</Text>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.closeModalIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.deleteModalTitle}>Delete Video</Text>
            <Text style={styles.deleteModalText}>
              Are you sure, you want to delete this video?
            </Text>
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteConfirmButton}
                onPress={handleDelete}
              >
                <Text style={styles.deleteConfirmButtonText}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    fontSize: 100,
    marginBottom: 20,
  },
  videoText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.6,
  },
  deleteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  deleteIcon: {
    fontSize: 24,
  },
  actionSidebar: {
    position: 'absolute',
    right: 15,
    bottom: 120,
    alignItems: 'center',
    gap: 20,
    zIndex: 10,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 5,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 5,
  },
  actionCount: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  postDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 100,
    zIndex: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileEmoji: {
    fontSize: 24,
  },
  postInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  postDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 8,
  },
  musicSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  musicIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  musicName: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: width - 40,
    maxWidth: 400,
  },
  deleteModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  deleteModalIcon: {
    fontSize: 50,
  },
  closeModalIcon: {
    fontSize: 24,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  deleteModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  deleteModalText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 25,
  },
  deleteModalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  deleteConfirmButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteConfirmButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ViewVideoScreen;

