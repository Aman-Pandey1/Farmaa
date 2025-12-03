import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

// @ts-ignore
import logoImage from '../../assets/images/Logo.png';

const MobileLoginScreen = () => {
  const navigation = useNavigation();
  const { sendOTP } = useAuth();
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }

    setLoading(true);
    try {
      const otp = await sendOTP(mobileNumber);
      // @ts-ignore
      navigation.navigate('OTPVerification', { mobileNumber, devOtp: otp });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google login logic
    Alert.alert('Google Login', 'Google login feature coming soon');
  };

  const handleAppleLogin = () => {
    // Apple login logic
    Alert.alert('Apple Login', 'Apple login feature coming soon');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLogo}>
              <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerAppName}>FURRMAA</Text>
              <Text style={styles.headerTagline}>WE CARE FOR YOUR PET WITH LOVE</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.mainTitle}>
            Create Your Account<Text style={styles.asterisk}>*</Text> or Login
          </Text>
          
          <Text style={styles.description}>
            Join Furrmaa and give your pet the care they deserve or Continue caring for your pet with ease <Text style={styles.percent}>%</Text>
          </Text>

          {/* Mobile Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="99999 99999"
              placeholderTextColor="#9CA3AF"
              value={mobileNumber}
              onChangeText={(text) => setMobileNumber(text.replace(/\D/g, ''))}
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={styles.helperText}>
              We've sent a 6-digit verification code via SMS. ✉️
            </Text>
          </View>

          {/* Or Login With */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>or Login With</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <View style={styles.googleLogo}>
                <Text style={styles.googleG}>G</Text>
              </View>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
              <Text style={styles.appleLogo}>🍎</Text>
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Next Button */}
          <TouchableOpacity 
            style={[styles.nextButton, loading && styles.disabledButton]} 
            onPress={handleNext}
            disabled={loading}
          >
            <Text style={styles.nextButtonText}>
              {loading ? 'Sending OTP...' : 'Next →'}
            </Text>
          </TouchableOpacity>

          {/* Terms & Privacy */}
          <Text style={styles.termsText}>
            By continuing, you agree to our <Text style={styles.termsLink}>Terms & Privacy Policy.</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    marginRight: 12,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    flex: 1,
  },
  headerAppName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  headerTagline: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '300',
  },
  content: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
    lineHeight: 40,
  },
  asterisk: {
    fontSize: 32,
    color: '#1F2937',
  },
  percent: {
    fontSize: 16,
    color: '#6B7280',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
  },
  helperText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    marginHorizontal: 15,
    fontSize: 14,
    color: '#6B7280',
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  googleLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  googleG: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  appleLogo: {
    fontSize: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
});

export default MobileLoginScreen;

