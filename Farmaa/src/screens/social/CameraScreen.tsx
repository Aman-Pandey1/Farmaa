import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CameraScreen = () => {
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);

  const handleRecord = () => {
    if (!hasRecorded) {
      setIsRecording(true);
      // Simulate recording progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setRecordProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsRecording(false);
          setHasRecorded(true);
        }
      }, 200);
    }
  };

  const handleUndo = () => {
    setHasRecorded(false);
    setRecordProgress(0);
    setIsRecording(false);
  };

  const handleNext = () => {
    navigation.navigate('PostVideo' as never, { hasVideo: true } as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera Preview */}
      <View style={styles.cameraPreview}>
        <Text style={styles.cameraPlaceholder}>📷</Text>
        <Text style={styles.cameraText}>Camera Preview</Text>
      </View>

      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => setIsMuted(!isMuted)}
        >
          <View style={styles.muteButton}>
            <Text style={styles.muteIcon}>{isMuted ? '🔇' : '🔊'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Right Sidebar Controls */}
      <View style={styles.rightSidebar}>
        <TouchableOpacity style={styles.sidebarButton}>
          <Text style={styles.sidebarIcon}>🎵</Text>
          <Text style={styles.sidebarText}>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarButton}>
          <Text style={styles.sidebarIcon}>✨</Text>
          <Text style={styles.sidebarText}>Effects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarButton}>
          <Text style={styles.sidebarIcon}>⏱️</Text>
          <Text style={styles.sidebarText}>Length</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {hasRecorded ? (
          <>
            <TouchableOpacity style={styles.undoButton} onPress={handleUndo}>
              <Text style={styles.undoButtonText}>Undo</Text>
            </TouchableOpacity>
            <View style={styles.recordButtonContainer}>
              <View
                style={[
                  styles.recordButton,
                  styles.recordButtonRecorded,
                  {
                    borderColor: recordProgress >= 100 ? '#10B981' : '#FFFFFF',
                  },
                ]}
              >
                <View
                  style={[
                    styles.recordButtonInner,
                    {
                      backgroundColor:
                        recordProgress >= 100 ? '#10B981' : '#FFFFFF',
                    },
                  ]}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next →</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.galleryButton}>
              <Text style={styles.galleryIcon}>🖼️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.recordButtonContainer}
              onPress={handleRecord}
            >
              <View
                style={[
                  styles.recordButton,
                  isRecording && styles.recordButtonRecording,
                ]}
              >
                <View
                  style={[
                    styles.recordButtonInner,
                    isRecording && styles.recordButtonInnerRecording,
                  ]}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.rightBottomButtons}>
              <TouchableOpacity style={styles.filterButton}>
                <View style={styles.filterButtonYellow} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <View style={styles.filterButtonBlue} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.rotateButton}>
              <Text style={styles.rotateIcon}>🔄</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    fontSize: 100,
    marginBottom: 20,
  },
  cameraText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.6,
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  topButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  muteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteIcon: {
    fontSize: 20,
  },
  rightSidebar: {
    position: 'absolute',
    right: 15,
    top: '30%',
    alignItems: 'center',
    gap: 25,
    zIndex: 10,
  },
  sidebarButton: {
    alignItems: 'center',
    gap: 5,
  },
  sidebarIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  sidebarText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 15,
    zIndex: 10,
  },
  galleryButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryIcon: {
    fontSize: 32,
  },
  recordButtonContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  recordButtonRecording: {
    borderColor: '#EF4444',
  },
  recordButtonRecorded: {
    borderWidth: 4,
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  recordButtonInnerRecording: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    width: 30,
    height: 30,
  },
  rightBottomButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonYellow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FCD34D',
  },
  filterButtonBlue: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E3A8A',
  },
  rotateButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotateIcon: {
    fontSize: 28,
  },
  undoButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  undoButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  nextButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});

export default CameraScreen;

