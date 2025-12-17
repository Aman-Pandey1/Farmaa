import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TrainingScreen = () => {
  const navigation = useNavigation();
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const trainingPrograms = [
    {
      id: 1,
      title: 'Basic Training',
      description: 'Foundational skills, obedience, and leash training.',
      lessons: 7,
      days: 7,
      ways: 7,
      bgColor: '#FED7AA', // Light orange
      image: '🐕',
      isFree: true,
      isLocked: false,
    },
    {
      id: 2,
      title: 'Intermediate Training',
      description: 'Discipline behavior, shaping control',
      lessons: 14,
      days: 14,
      ways: 14,
      bgColor: '#FBCFE8', // Light pink
      image: '🐕',
      isFree: false,
      isLocked: true,
    },
    {
      id: 3,
      title: 'Advanced Training',
      description: 'Master-level commands, agility, obedience.',
      lessons: 21,
      days: 21,
      ways: 21,
      bgColor: '#BFDBFE', // Light blue
      image: '🐕',
      isFree: false,
      isLocked: true,
    },
  ];

  const handleStartTraining = (program: any) => {
    if (program.isLocked) {
      // Show options modal for locked programs
      setSelectedProgram(program);
      setShowOptionsModal(true);
      return;
    }
    // For Basic Training (unlocked), navigate directly
    navigation.navigate('TrainingLessons' as never, { program } as never);
  };

  const handleWatchPreview = () => {
    setShowOptionsModal(false);
    // Navigate to lessons screen to show preview
    navigation.navigate('TrainingLessons' as never, { program: selectedProgram } as never);
  };

  const handleSubscribe = () => {
    setShowOptionsModal(false);
    navigation.navigate('Subscription' as never, { program: selectedProgram } as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Train</Text>
          <Text style={styles.headerSubtitle}>
            Start where your pet feels comfortable
          </Text>
        </View>

        {/* Empty State */}
        {trainingPrograms.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No Training Sessions Available
            </Text>
            <Text style={styles.emptyDescription}>
              We couldn't find any training programs right now. Try adjusting
              filters or check back soon as new sessions are added regularly.
              Every good pet starts with good guidance.
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => {
                // Navigate to explore
                navigation.navigate('ExploreTab' as never);
              }}
            >
              <Text style={styles.emptyButtonText}>Explore app →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Training Programs */}
            <View style={styles.programsContainer}>
              {trainingPrograms.map((program) => (
            <View
              key={program.id}
              style={[styles.programCard, { backgroundColor: program.bgColor }]}
            >
              {/* Free/Locked Badge */}
              {program.isFree && (
                <View style={styles.freeBadge}>
                  <Text style={styles.freeBadgeText}>Free</Text>
                </View>
              )}
              {program.isLocked && (
                <View style={styles.lockBadge}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
              )}

              {/* Program Content */}
              <View style={styles.programContent}>
                <View style={styles.programTextContainer}>
                  <Text style={styles.programTitle}>{program.title}</Text>
                  <Text style={styles.programDescription}>
                    {program.description}
                  </Text>

                  {/* Pills */}
                  <View style={styles.pillsContainer}>
                    <View style={styles.pill}>
                      <Text style={styles.pillText}>
                        {program.lessons} Lessons
                      </Text>
                    </View>
                    <View style={styles.pill}>
                      <Text style={styles.pillText}>{program.days} Days</Text>
                    </View>
                    <View style={styles.pill}>
                      <Text style={styles.pillText}>
                        {program.ways} Great Ways to Training
                      </Text>
                    </View>
                  </View>

                  {/* Start Button */}
                  <TouchableOpacity
                    style={[
                      styles.startButton,
                      program.isLocked && styles.startButtonLocked,
                    ]}
                    onPress={() => handleStartTraining(program)}
                  >
                    <Text style={styles.startButtonText}>Let's Start +</Text>
                  </TouchableOpacity>
                </View>

                {/* Dog Image */}
                <View style={styles.dogImageContainer}>
                  <Text style={styles.dogImage}>{program.image}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
          </>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made With Gentle Care in Jaipur, India
          </Text>
          <Text style={styles.footerSubText}>
            Because Your Pet Deserves the Very Best ✨
          </Text>
        </View>
      </ScrollView>

      {/* Options Modal for Locked Programs */}
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedProgram?.title || 'Training Program'}
              </Text>
              <TouchableOpacity onPress={() => setShowOptionsModal(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>
              Choose an option to continue:
            </Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleWatchPreview}
            >
              <Text style={styles.modalOptionIcon}>▶</Text>
              <View style={styles.modalOptionContent}>
                <Text style={styles.modalOptionTitle}>Watch Preview Videos</Text>
                <Text style={styles.modalOptionSubtitle}>
                  View course structure and preview lessons
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleSubscribe}
            >
              <Text style={styles.modalOptionIcon}>🔓</Text>
              <View style={styles.modalOptionContent}>
                <Text style={styles.modalOptionTitle}>Subscribe to Unlock</Text>
                <Text style={styles.modalOptionSubtitle}>
                  Get full access to all videos and lessons
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  programsContainer: {
    padding: 20,
    gap: 20,
  },
  programCard: {
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 200,
  },
  freeBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#10B981',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    zIndex: 1,
  },
  freeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lockBadge: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 1,
  },
  lockIcon: {
    fontSize: 24,
  },
  programContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  programTextContainer: {
    flex: 1,
    marginRight: 15,
  },
  programTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 15,
    lineHeight: 20,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  pill: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  startButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  startButtonLocked: {
    backgroundColor: '#1F2937',
    opacity: 1,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dogImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogImage: {
    fontSize: 100,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  footerSubText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 100,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  emptyButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  modalDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalOptionIcon: {
    fontSize: 24,
    marginRight: 15,
    color: '#1E3A8A',
  },
  modalOptionContent: {
    flex: 1,
  },
  modalOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  modalOptionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
});

export default TrainingScreen;
