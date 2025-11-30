import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

// Import images - agar images add ki hain to uncomment karein
// import splash1 from '../assets/images/splash1.png';
// import splash2 from '../assets/images/splash2.png';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          },
        ]}
      >
        {/* Logo Image - agar splash1.png add ki hai to use karein */}
        <View style={styles.logoContainer}>
          {/* Temporary logo - replace with actual image */}
          <View style={styles.logoCircle}>
            <View style={styles.logoInner}>
              {/* Dog head - left */}
              <View style={[styles.animalHead, styles.dogHead]} />
              {/* Cat head - right */}
              <View style={[styles.animalHead, styles.catHead]} />
              {/* Bird head - bottom */}
              <View style={[styles.animalHead, styles.birdHead]} />
            </View>
          </View>
          
          {/* Agar image hai to use karein: */}
          {/* <Image 
            source={splash1} 
            style={styles.logoImage}
            resizeMode="contain"
          /> */}
        </View>

        {/* App Name */}
        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <Text style={styles.appName}>FURRMAA</Text>
          <Text style={styles.tagline}>WHERE EVERY TAIL FEELS AT HOME</Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View style={[styles.loaderContainer, { opacity: fadeAnim }]}>
          <View style={styles.loader} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#8B5CF6', // Purple border
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  logoInner: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  animalHead: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dogHead: {
    backgroundColor: '#1E40AF', // Dark blue
    left: 10,
    top: 20,
  },
  catHead: {
    backgroundColor: '#10B981', // Light green
    right: 10,
    top: 20,
  },
  birdHead: {
    backgroundColor: '#8B5CF6', // Purple
    left: 30,
    bottom: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1F2937', // Dark gray
    marginBottom: 10,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280', // Gray
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 100,
  },
  loader: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#8B5CF6',
    borderTopColor: 'transparent',
  },
});

export default SplashScreen;
