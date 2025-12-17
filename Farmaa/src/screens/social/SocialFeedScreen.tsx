import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SocialFeedScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'Feeds' | 'Trending'>('Feeds');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [mutedPosts, setMutedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [heartAnimations] = useState<{ [key: string]: Animated.Value }>({});
  const [showHeartOverlay, setShowHeartOverlay] = useState<{ [key: string]: boolean }>({});
  const [videoMuted, setVideoMuted] = useState<{ [key: string]: boolean }>({});
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showReportConfirmation, setShowReportConfirmation] = useState(false);

  const feedsPosts = [
    {
      _id: '1',
      petName: 'Chitty',
      profileImage: '🐕',
      image: '🐕',
      description: 'Lorem metus porttitor purus enim. Non et mauris quam porttitor faucibus id.',
      musicName: 'Lorem metus (Music name)',
      likes: 834,
      comments: 123,
      shares: 65,
    },
    {
      _id: '2',
      petName: 'Max',
      profileImage: '🐕',
      image: '🐕',
      description: 'Having fun with my favorite toy!',
      musicName: 'Happy Tunes',
      likes: 567,
      comments: 45,
      shares: 23,
    },
    {
      _id: '3',
      petName: 'Luna',
      profileImage: '🐱',
      image: '🐱',
      description: 'Beautiful day at the park!',
      musicName: 'Nature Sounds',
      likes: 234,
      comments: 89,
      shares: 34,
    },
  ];

  const trendingPosts = [
    {
      _id: '4',
      petName: 'Chitty',
      profileImage: '🐕',
      image: '👶🐕',
      description: 'Lorem metus porttitor purus enim. Non et mauris quam porttitor faucibus id.',
      musicName: 'Lorem metus (Music name)',
      likes: 834,
      comments: 123,
      shares: 65,
    },
    {
      _id: '5',
      petName: 'Buddy',
      profileImage: '🐕',
      image: '🐕',
      description: 'Trending post with lots of engagement!',
      musicName: 'Trending Music',
      likes: 1200,
      comments: 200,
      shares: 150,
    },
  ];

  const posts = activeTab === 'Feeds' ? feedsPosts : trendingPosts;
  const [showEmptyState, setShowEmptyState] = useState(false);

  const handleLike = (postId: string) => {
    const isLiked = likedPosts.has(postId);
    
    if (isLiked) {
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      setShowHeartOverlay((prev) => ({ ...prev, [postId]: false }));
    } else {
      setLikedPosts((prev) => new Set(prev).add(postId));
      
      // Show and animate heart overlay
      if (!heartAnimations[postId]) {
        heartAnimations[postId] = new Animated.Value(0);
      }
      
      setShowHeartOverlay((prev) => ({ ...prev, [postId]: true }));
      
      // Reset and animate
      heartAnimations[postId].setValue(0);
      Animated.sequence([
        Animated.timing(heartAnimations[postId], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(500),
        Animated.timing(heartAnimations[postId], {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowHeartOverlay((prev) => ({ ...prev, [postId]: false }));
      });
    }
  };

  const handleMute = (postId: string) => {
    const isMuted = mutedPosts.has(postId);
    
    if (isMuted) {
      setMutedPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    } else {
      setMutedPosts((prev) => new Set(prev).add(postId));
    }
  };

  const handleVideoMute = (postId: string) => {
    setVideoMuted((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentPress = (postId: string) => {
    navigation.navigate('Comments' as never, { postId } as never);
  };

  const handleOptionsPress = (postId: string) => {
    setSelectedPostId(postId);
    setShowOptionsModal(true);
  };

  const handleSave = () => {
    if (selectedPostId) {
      const isSaved = savedPosts.has(selectedPostId);
      if (isSaved) {
        setSavedPosts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(selectedPostId);
          return newSet;
        });
      } else {
        setSavedPosts((prev) => new Set(prev).add(selectedPostId));
      }
    }
  };

  const handleReport = () => {
    setShowOptionsModal(false);
    setShowReportConfirmation(true);
    // Auto close confirmation after 2 seconds
    setTimeout(() => {
      setShowReportConfirmation(false);
    }, 2000);
  };

  const renderPost = ({ item }: { item: any }) => {
    const isLiked = likedPosts.has(item._id);
    const isMuted = mutedPosts.has(item._id);
    const isVideoMuted = videoMuted[item._id] !== undefined ? videoMuted[item._id] : true;
    const currentLikes = isLiked ? item.likes + 1 : item.likes;
    
    const heartScale = heartAnimations[item._id]?.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1.2, 1],
    }) || 0;
    
    const heartOpacity = heartAnimations[item._id] || new Animated.Value(0);

    return (
      <View style={styles.postContainer}>
        {/* Main Image/Video */}
        <View style={styles.imageContainer}>
          <View style={styles.postImage}>
            <Text style={styles.postEmoji}>{item.image}</Text>
          </View>
          
          {/* Heart Overlay Animation - Show briefly when liked */}
          {showHeartOverlay[item._id] && heartAnimations[item._id] && (
            <Animated.View
              style={[
                styles.heartOverlay,
                {
                  opacity: heartAnimations[item._id],
                  transform: [
                    {
                      scale: heartAnimations[item._id].interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 1.3, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.heartOverlayIcon}>❤️</Text>
            </Animated.View>
          )}
          
          {/* Video Mute/Unmute Overlay */}
          {isVideoMuted && (
            <TouchableOpacity
              style={styles.unmuteOverlay}
              onPress={() => handleVideoMute(item._id)}
              activeOpacity={0.8}
            >
              <View style={styles.unmuteIconContainer}>
                <Text style={styles.unmuteIcon}>🔊</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Mute Overlay (for post muting) */}
          {isMuted && (
            <View style={styles.muteOverlay}>
              <Text style={styles.muteIcon}>🔇</Text>
            </View>
          )}

          {/* Right Sidebar Actions */}
          <View style={styles.actionSidebar}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleLike(item._id)}
            >
              <Text style={styles.actionIcon}>
                {isLiked ? '❤️' : '🤍'}
              </Text>
              <Text style={styles.actionCount}>{currentLikes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleCommentPress(item._id)}
            >
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionCount}>{item.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>✈️</Text>
              <Text style={styles.actionCount}>{item.shares}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleOptionsPress(item._id)}
            >
              <Text style={styles.actionIcon}>⋯</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Left Post Details */}
          <View style={styles.postDetails}>
          <TouchableOpacity
            style={styles.profileSection}
            onPress={() => navigation.navigate('PetProfile' as never)}
          >
            <View style={styles.profileImage}>
              <Text style={styles.profileEmoji}>{item.profileImage}</Text>
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.petName}>{item.petName} (Pet Name)</Text>
              <Text style={styles.postDescription}>{item.description}</Text>
              <View style={styles.musicSection}>
                <Text style={styles.musicIcon}>🎵</Text>
                <Text style={styles.musicName}>{item.musicName}</Text>
              </View>
            </View>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => navigation.navigate('Camera' as never)}
        >
          <Text style={styles.iconText}>📷</Text>
        </TouchableOpacity>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Feeds' && styles.tabActive]}
            onPress={() => setActiveTab('Feeds')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Feeds' && styles.tabTextActive,
              ]}
            >
              Feeds
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Trending' && styles.tabActive]}
            onPress={() => setActiveTab('Trending')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Trending' && styles.tabTextActive,
              ]}
            >
              Trending
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.navIcon}>
          <Text style={styles.iconText}>🐾</Text>
        </TouchableOpacity>
      </View>

      {/* Feed Posts or Empty State */}
      {showEmptyState || posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your Feed Is Empty</Text>
          <Text style={styles.emptyDescription}>
            No feeds are available right now. Please check back after some
            time.
          </Text>
          <Text style={styles.emptySubtext}>
            A lively pet world starts with you.
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => setShowEmptyState(false)}
          >
            <Text style={styles.emptyButtonText}>Try Again →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderPost}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          snapToInterval={height}
          snapToAlignment="start"
          decelerationRate="fast"
        />
      )}

      {/* Options Modal */}
      <Modal
        visible={showOptionsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptionsModal(false)}
        >
          <View style={styles.optionsModalContent}>
            <View style={styles.optionsModalHeader}>
              <Text style={styles.optionsModalTitle}>Options</Text>
              <TouchableOpacity onPress={() => setShowOptionsModal(false)}>
                <View style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.optionsButtonsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleSave}
              >
                <View
                  style={[
                    styles.optionIconContainer,
                    selectedPostId &&
                      savedPosts.has(selectedPostId) &&
                      styles.optionIconContainerSaved,
                  ]}
                >
                  <Text style={styles.optionIcon}>
                    {selectedPostId && savedPosts.has(selectedPostId)
                      ? '🔖'
                      : '📑'}
                  </Text>
                </View>
                <Text style={styles.optionText}>
                  {selectedPostId && savedPosts.has(selectedPostId)
                    ? 'Saved'
                    : 'Save'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleReport}
              >
                <View style={styles.reportIconContainer}>
                  <Text style={styles.reportIcon}>⚠</Text>
                </View>
                <Text style={styles.optionText}>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Report Confirmation Modal */}
      <Modal
        visible={showReportConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReportConfirmation(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowReportConfirmation(false)}
        >
          <View style={styles.reportConfirmationContent}>
            <View style={styles.reportConfirmationRow}>
              <Text style={styles.checkmarkIcon}>✓</Text>
              <Text style={styles.reportConfirmationText}>
                Thank you for reporting this Reel. We have reviewed it.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#000000',
    zIndex: 10,
  },
  navIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  tab: {
    paddingVertical: 5,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '400',
  },
  tabTextActive: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postContainer: {
    width: width,
    height: height,
    backgroundColor: '#000000',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postEmoji: {
    fontSize: 150,
  },
  heartOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30,
    marginTop: -30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartOverlayIcon: {
    fontSize: 50,
  },
  unmuteOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -40,
    marginTop: -40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unmuteIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  unmuteIcon: {
    fontSize: 40,
  },
  muteOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteIcon: {
    fontSize: 30,
  },
  actionSidebar: {
    position: 'absolute',
    right: 15,
    bottom: 120,
    alignItems: 'center',
    gap: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#000000',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  emptyButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  optionsModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  optionsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  optionsModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  optionsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionButton: {
    alignItems: 'center',
    gap: 8,
  },
  optionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionIconContainerSaved: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
  },
  optionIcon: {
    fontSize: 28,
  },
  reportIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EF4444',
  },
  reportIcon: {
    fontSize: 28,
    color: '#EF4444',
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  reportConfirmationContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 100,
  },
  reportConfirmationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkmarkIcon: {
    fontSize: 24,
    color: '#10B981',
    fontWeight: 'bold',
  },
  reportConfirmationText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
});

export default SocialFeedScreen;
