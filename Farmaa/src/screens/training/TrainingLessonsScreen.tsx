import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TrainingLessonsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { program } = (route.params as any) || {
    id: 1,
    title: 'Basic Training',
    description: 'Foundation skills, simple commands, bonding.',
    lessons: 7,
    days: 7,
    ways: 7,
    bgColor: '#FED7AA',
    image: '🐕',
    isFree: true,
  };

  const [activeTab, setActiveTab] = useState('Lessons');
  const [progress, setProgress] = useState(program.id === 1 ? 80 : 0);
  const [expandedWeeks, setExpandedWeeks] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
  });

  // Lessons data - Basic Training (all unlocked, some completed)
  const basicLessons = [
    {
      id: 1,
      title: '[Video Title]',
      lessonNumber: 1,
      day: 1,
      duration: '14',
      thumbnail: '🐕',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 2,
      title: '[Video Title]',
      lessonNumber: 2,
      day: 1,
      duration: '14',
      thumbnail: '🐕',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 3,
      title: '[Video Title]',
      lessonNumber: 3,
      day: 2,
      duration: '14',
      thumbnail: '🐕',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 4,
      title: '[Video Title]',
      lessonNumber: 4,
      day: 2,
      duration: '14',
      thumbnail: '🐕',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 5,
      title: '[Video Title]',
      lessonNumber: 5,
      day: 3,
      duration: '14',
      thumbnail: '🐕',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 6,
      title: '[Video Title]',
      lessonNumber: 6,
      day: 3,
      duration: '14',
      thumbnail: '🐕',
      isCompleted: true,
      isLocked: false,
    },
    {
      id: 7,
      title: '[Video Title]',
      lessonNumber: 7,
      day: 4,
      duration: '14',
      thumbnail: '🐕',
      isCompleted: false,
      isLocked: true,
    },
  ];

  // Lessons data - Intermediate/Advanced Training (grouped by weeks)
  const intermediateLessons = [
    {
      week: 1,
      lessons: [
        {
          id: 1,
          title: '[Video Title]',
          lessonNumber: 1,
          day: 1,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false, // Unlocked after subscription
        },
        {
          id: 2,
          title: '[Video Title]',
          lessonNumber: 2,
          day: 1,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 3,
          title: '[Video Title]',
          lessonNumber: 3,
          day: 2,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 4,
          title: '[Video Title]',
          lessonNumber: 4,
          day: 2,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 5,
          title: '[Video Title]',
          lessonNumber: 5,
          day: 3,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 6,
          title: '[Video Title]',
          lessonNumber: 6,
          day: 3,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 7,
          title: '[Video Title]',
          lessonNumber: 7,
          day: 4,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
      ],
    },
    {
      week: 2,
      lessons: [
        {
          id: 8,
          title: '[Video Title]',
          lessonNumber: 8,
          day: 5,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 9,
          title: '[Video Title]',
          lessonNumber: 9,
          day: 5,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 10,
          title: '[Video Title]',
          lessonNumber: 10,
          day: 6,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 11,
          title: '[Video Title]',
          lessonNumber: 11,
          day: 6,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 12,
          title: '[Video Title]',
          lessonNumber: 12,
          day: 7,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: false,
        },
      ],
    },
  ];

  // Advanced Training lessons (locked by default, unlocked after subscription)
  const advancedLessons = [
    {
      week: 1,
      lessons: [
        {
          id: 1,
          title: '[Video Title]',
          lessonNumber: 1,
          day: 1,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true, // Locked until subscription
        },
        {
          id: 2,
          title: '[Video Title]',
          lessonNumber: 2,
          day: 1,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 3,
          title: '[Video Title]',
          lessonNumber: 3,
          day: 2,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 4,
          title: '[Video Title]',
          lessonNumber: 4,
          day: 2,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 5,
          title: '[Video Title]',
          lessonNumber: 5,
          day: 3,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 6,
          title: '[Video Title]',
          lessonNumber: 6,
          day: 3,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 7,
          title: '[Video Title]',
          lessonNumber: 7,
          day: 4,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
      ],
    },
    {
      week: 2,
      lessons: [
        {
          id: 8,
          title: '[Video Title]',
          lessonNumber: 8,
          day: 5,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 9,
          title: '[Video Title]',
          lessonNumber: 9,
          day: 5,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 10,
          title: '[Video Title]',
          lessonNumber: 10,
          day: 6,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 11,
          title: '[Video Title]',
          lessonNumber: 11,
          day: 6,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
        {
          id: 12,
          title: '[Video Title]',
          lessonNumber: 12,
          day: 7,
          duration: '4:56',
          thumbnail: '🐕',
          isCompleted: false,
          isLocked: true,
        },
      ],
    },
  ];

  const lessons = program.id === 1 ? basicLessons : [];
  const isBasicTraining = program.id === 1;
  const isIntermediate = program.id === 2;
  const isAdvanced = program.id === 3;
  const isLocked = program.isLocked;
  
  // Get the appropriate lessons based on program type
  const getProgramLessons = () => {
    if (isIntermediate) return intermediateLessons;
    if (isAdvanced) return advancedLessons;
    return [];
  };
  
  const programLessons = getProgramLessons();

  const tabs = ['Lessons', 'Course', 'Trainer'];

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [week]: !prev[week],
    }));
  };

  const handleLessonPress = (lesson: any) => {
    if (lesson.isLocked) {
      // Navigate to subscription
      handleSubscribe();
      return;
    }
    navigation.navigate('VideoPlayer' as never, { lesson } as never);
  };

  const handleSubscribe = () => {
    navigation.navigate('Subscription' as never, { program } as never);
  };

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
        <Text style={styles.headerTitle}>{program.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Program Overview Card */}
        <View
          style={[
            styles.overviewCard,
            {
              backgroundColor:
                activeTab === 'Course'
                  ? '#FEF3C7'
                  : activeTab === 'Trainer'
                  ? '#FEF3C7'
                  : program.bgColor,
            },
          ]}
        >
          {program.isFree && (
            <View style={styles.freeBadge}>
              <Text style={styles.freeBadgeText}>Free</Text>
            </View>
          )}
          {isLocked && (
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={handleSubscribe}
            >
              <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
            </TouchableOpacity>
          )}
          <View style={styles.overviewContent}>
            <View style={styles.overviewText}>
              <Text style={styles.overviewTitle}>{program.title}</Text>
              <Text style={styles.overviewDescription}>
                {program.description}
              </Text>
            </View>
            <View style={styles.dogImageContainer}>
              <Text style={styles.dogImage}>{program.image}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Learning Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Learning Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        </View>

        {/* Lessons List */}
        {activeTab === 'Lessons' && (
          <View style={styles.lessonsContainer}>
            {isBasicTraining && lessons.length === 0 ? (
              // Empty state for Basic Training
              <View style={styles.emptyLessonsContainer}>
                <Text style={styles.emptyLessonsTitle}>
                  No Course Videos Yet
                </Text>
                <Text style={styles.emptyLessonsDescription}>
                  You haven't enrolled in any courses, or no videos are
                  available for this course. Start exploring to begin your
                  learning journey. Train smarter - one video at a time.
                </Text>
                <TouchableOpacity
                  style={styles.emptyLessonsButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.emptyLessonsButtonText}>
                    Browse Train →
                  </Text>
                </TouchableOpacity>
              </View>
            ) : isBasicTraining ? (
              // Basic Training - Simple list
              lessons.map((lesson) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.lessonCard}
                  onPress={() => handleLessonPress(lesson)}
                  disabled={lesson.isLocked}
                >
                  <View style={styles.lessonThumbnail}>
                    <Text style={styles.lessonThumbnailImage}>
                      {lesson.thumbnail}
                    </Text>
                  </View>
                  <View style={styles.lessonContent}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDetails}>
                      {lesson.lessonNumber} Lesson | {lesson.day} Day | {lesson.duration} Min
                    </Text>
                  </View>
                  <View style={styles.lessonActions}>
                    {lesson.isCompleted && (
                      <View style={styles.completedBadge}>
                        <Text style={styles.completedText}>Completed</Text>
                      </View>
                    )}
                    {lesson.isLocked ? (
                      <View style={styles.lockButton}>
                        <Text style={styles.lockIcon}>🔒</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => handleLessonPress(lesson)}
                      >
                        <Text style={styles.playIcon}>▶</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              // Intermediate/Advanced Training - Week-based grouping
              <>
                {programLessons.map((weekData) => (
                  <View key={weekData.week} style={styles.weekSection}>
                    <TouchableOpacity
                      style={styles.weekHeader}
                      onPress={() => toggleWeek(weekData.week)}
                    >
                      <Text style={styles.weekTitle}>Week {weekData.week}</Text>
                      <Text style={styles.expandIcon}>
                        {expandedWeeks[weekData.week] ? '▼' : '▶'}
                      </Text>
                    </TouchableOpacity>
                    {expandedWeeks[weekData.week] && (
                      <View style={styles.weekLessons}>
                        {weekData.lessons.map((lesson) => (
                          <TouchableOpacity
                            key={lesson.id}
                            style={styles.lessonCard}
                            onPress={() => handleLessonPress(lesson)}
                            disabled={lesson.isLocked}
                          >
                            <View style={styles.lessonThumbnail}>
                              <Text style={styles.lessonThumbnailImage}>
                                {lesson.thumbnail}
                              </Text>
                            </View>
                            <View style={styles.lessonContent}>
                              <Text style={styles.lessonTitle}>
                                {lesson.title}
                              </Text>
                              <Text style={styles.lessonDetails}>
                                {lesson.lessonNumber} Lesson | {lesson.day} Day | {lesson.duration} Min
                              </Text>
                            </View>
                            {lesson.isLocked ? (
                              <View style={styles.lockButton}>
                                <Text style={styles.lockIcon}>🔒</Text>
                              </View>
                            ) : (
                              <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => handleLessonPress(lesson)}
                              >
                                <Text style={styles.playIcon}>▶</Text>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </>
            )}
          </View>
        )}

        {/* Course Tab */}
        {activeTab === 'Course' && (
          <View style={styles.courseContainer}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  About This {program.title}
                </Text>
                <Text style={styles.pawIcon}>🐾</Text>
              </View>
              <View style={styles.courseInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Course Duration:</Text>
                  <Text style={styles.infoValue}>
                    {isBasicTraining ? program.days : 7} Days
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Lessons:</Text>
                  <Text style={styles.infoValue}>
                    {isBasicTraining ? program.lessons : 7} Lessons
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Course Video Time:</Text>
                  <Text style={styles.infoValue}>
                    {isBasicTraining ? '38:56' : '26:50'} min
                  </Text>
                </View>
              </View>
              <Text style={styles.courseDescription}>
                {isBasicTraining
                  ? 'Build strong foundations with simple, effective training lessons designed to help your pet learn essential commands, good manners, and positive habits - one step at a time.'
                  : 'Building strong foundations with simple, effective training lessons designed to help your pet learn essential commands, good manners, and a joyful, well-adjusted life at home.'}
              </Text>
            </View>

            {/* Image Gallery */}
            <View style={styles.gallerySection}>
              <View style={styles.galleryContainer}>
                <View style={styles.galleryImage}>
                  <Text style={styles.galleryImageEmoji}>🐕</Text>
                </View>
                <View style={styles.galleryImage}>
                  <Text style={styles.galleryImageEmoji}>🐕</Text>
                </View>
                <View style={styles.galleryImage}>
                  <Text style={styles.galleryImageEmoji}>🐕</Text>
                </View>
              </View>
            </View>

            {/* Subscribe Button for Locked Courses */}
            {isLocked && (
              <TouchableOpacity
                style={styles.subscribeBottomButton}
                onPress={handleSubscribe}
              >
                <Text style={styles.subscribeBottomButtonText}>
                  Subscribe Now to Unlock Video
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Trainer Tab */}
        {activeTab === 'Trainer' && (
          <View style={styles.trainerContainer}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Meet Your Trainer</Text>
                <Text style={styles.pawIcon}>🐾</Text>
              </View>
              <View style={styles.trainerProfile}>
                <View style={styles.trainerImageContainer}>
                  <Text style={styles.trainerImage}>👨</Text>
                </View>
                <Text style={styles.trainerName}>John Doe</Text>
                <Text style={styles.trainerDetail}>
                  Certified Pet Trainer - 8+ Years
                </Text>
                <Text style={styles.trainerDetail}>
                  Puppy Training & Behavior Conditioning
                </Text>
              </View>
            </View>

            {/* Subscribe Button for Locked Courses */}
            {isLocked && (
              <TouchableOpacity
                style={styles.subscribeBottomButton}
                onPress={handleSubscribe}
              >
                <Text style={styles.subscribeBottomButtonText}>
                  Subscribe Now to Unlock Video
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
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
  overviewCard: {
    margin: 15,
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 150,
  },
  freeBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#1E3A8A',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    zIndex: 1,
  },
  freeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subscribeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#1F2937',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    zIndex: 1,
  },
  subscribeButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  overviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  overviewText: {
    flex: 1,
    marginRight: 15,
  },
  overviewTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  overviewDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  dogImageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogImage: {
    fontSize: 80,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 10,
    gap: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  tabActive: {
    backgroundColor: '#1E3A8A',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  progressSection: {
    padding: 15,
    marginTop: 10,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    minWidth: 40,
  },
  lessonsContainer: {
    padding: 15,
  },
  weekSection: {
    marginBottom: 20,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 10,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  expandIcon: {
    fontSize: 14,
    color: '#6B7280',
  },
  expandIcon: {
    fontSize: 14,
    color: '#6B7280',
  },
  weekLessons: {
    gap: 12,
  },
  lessonCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  lessonThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  lessonThumbnailImage: {
    fontSize: 30,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  lessonDetails: {
    fontSize: 12,
    color: '#6B7280',
  },
  lessonActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completedBadge: {
    backgroundColor: '#10B981',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 2,
  },
  lockButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 18,
  },
  subscribeBottomButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subscribeBottomButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 100,
  },
  courseContainer: {
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  pawIcon: {
    fontSize: 18,
  },
  courseInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  courseDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  gallerySection: {
    marginTop: 10,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  galleryContainer: {
    gap: 12,
  },
  galleryImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  galleryImageEmoji: {
    fontSize: 60,
  },
  trainerContainer: {
    padding: 15,
  },
  trainerProfile: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  trainerImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#E5E7EB',
  },
  trainerImage: {
    fontSize: 60,
  },
  trainerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  trainerDetail: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 20,
  },
  emptyLessonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 60,
    minHeight: 300,
  },
  emptyLessonsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyLessonsDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  emptyLessonsButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyLessonsButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default TrainingLessonsScreen;
