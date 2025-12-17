import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

// @ts-ignore
import logoImage from '../assets/images/Logo.png';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated, loading } = useAuth();
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

    // Navigate after 2 seconds and when loading is complete
    if (!loading) {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          // @ts-ignore
          navigation.replace('MainTabs');
        } else {
          // @ts-ignore
          navigation.replace('Onboarding');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fadeAnim, scaleAnim, slideAnim, navigation, loading, isAuthenticated]);

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
        {/* Logo Image */}
        <View style={styles.logoContainer}>
          <Image 
            source={logoImage} 
            style={styles.logoImage}
            resizeMode="contain"
          />
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
    borderColor: '#1E3A8A',
    borderTopColor: 'transparent',
  },
});

export default SplashScreen;
