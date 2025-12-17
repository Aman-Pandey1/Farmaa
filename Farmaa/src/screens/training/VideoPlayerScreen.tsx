import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const VideoPlayerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { lesson } = (route.params as any) || {
    id: 1,
    title: '(Video Title)',
    lessonNumber: 1,
    day: 1,
    duration: '4:56',
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const totalTime = lesson.duration || '4:56';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basic Training</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <View style={styles.videoPlayer}>
            <Text style={styles.videoPlaceholder}>🐕🐕🐕🐕🐕</Text>
            {!isPlaying && (
              <TouchableOpacity
                style={styles.playOverlay}
                onPress={() => setIsPlaying(true)}
              >
                <View style={styles.playButtonLarge}>
                  <Text style={styles.playIconLarge}>▶</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {/* Video Controls */}
          <View style={styles.videoControls}>
            <Text style={styles.timeText}>{currentTime}</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.timeText}>{totalTime}</Text>
            <TouchableOpacity style={styles.fullscreenButton}>
              <Text style={styles.fullscreenIcon}>⛶</Text>
            </TouchableOpacity>
          </View>
        </View>

          {/* Video Info */}
          <View style={styles.content}>
            {/* Video Title Section */}
            <View style={styles.videoInfoSection}>
              <Text style={styles.videoTitle}>{lesson.title}</Text>
              <Text style={styles.videoSubtitle}>
                {lesson.lessonNumber} Lesson | {lesson.day} Day | {lesson.duration} Min
              </Text>
            </View>

            {/* Video Description Section */}
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Video Description</Text>
              <Text style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text style={styles.descriptionText}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </Text>
              <Text style={styles.descriptionText}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo.
              </Text>
              <Text style={styles.descriptionText}>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet.
              </Text>
              <Text style={styles.descriptionText}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate non
                provident.
              </Text>
            </View>

            {/* Related Lessons Section */}
            <View style={styles.relatedSection}>
              <Text style={styles.sectionTitle}>Related Lessons</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedContainer}
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.relatedCard}
                    onPress={() => {
                      // Navigate to related lesson
                    }}
                  >
                    <View style={styles.relatedThumbnail}>
                      <Text style={styles.relatedThumbnailImage}>🐕</Text>
                      <View style={styles.relatedPlayButton}>
                        <Text style={styles.relatedPlayIcon}>▶</Text>
                      </View>
                    </View>
                    <Text style={styles.relatedTitle} numberOfLines={2}>
                      Lesson {item} - Video Title
                    </Text>
                    <Text style={styles.relatedDuration}>4:56 Min</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Course Info Section */}
            <View style={styles.courseInfoSection}>
              <Text style={styles.sectionTitle}>About This Course</Text>
              <View style={styles.courseInfoCard}>
                <Text style={styles.courseInfoText}>
                  This course is part of the Basic Training program designed to
                  help your pet learn essential commands and build strong
                  foundations.
                </Text>
                <TouchableOpacity
                  style={styles.viewCourseButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.viewCourseButtonText}>
                    View Full Course →
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom Padding */}
            <View style={styles.bottomPadding} />
          </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 34,
  },
  videoContainer: {
    width: '100%',
    backgroundColor: '#000000',
  },
  videoPlayer: {
    width: '100%',
    height: width * 0.56, // 16:9 aspect ratio
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoPlaceholder: {
    fontSize: 60,
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButtonLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconLarge: {
    fontSize: 32,
    color: '#1F2937',
    marginLeft: 4,
  },
  videoControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#000000',
    gap: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#FFFFFF',
    minWidth: 40,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#4B5563',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '0%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  fullscreenButton: {
    padding: 5,
  },
  fullscreenIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  content: {
    padding: 15,
  },
  videoInfoSection: {
    marginBottom: 20,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  videoSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 12,
  },
  bottomPadding: {
    height: 100,
  },
  relatedSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  relatedContainer: {
    gap: 12,
    paddingRight: 15,
  },
  relatedCard: {
    width: 200,
    marginRight: 12,
  },
  relatedThumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  relatedThumbnailImage: {
    fontSize: 50,
  },
  relatedPlayButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relatedPlayIcon: {
    fontSize: 18,
    color: '#1F2937',
    marginLeft: 2,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  relatedDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  courseInfoSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  courseInfoCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
  },
  courseInfoText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 15,
  },
  viewCourseButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  viewCourseButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default VideoPlayerScreen;

