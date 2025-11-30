import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MobileLoginScreen from '../screens/auth/MobileLoginScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';

// Main Screens
import HomeScreen from '../screens/home/HomeScreen';
import ProductsScreen from '../screens/ecommerce/ProductsScreen';
import ProductDetailScreen from '../screens/ecommerce/ProductDetailScreen';
import CartScreen from '../screens/ecommerce/CartScreen';
import CheckoutScreen from '../screens/ecommerce/CheckoutScreen';

// Service Screens
import ServicesScreen from '../screens/services/ServicesScreen';
import ServiceProvidersScreen from '../screens/services/ServiceProvidersScreen';
import BookingScreen from '../screens/services/BookingScreen';
import MyBookingsScreen from '../screens/services/MyBookingsScreen';

// Healthcare Screens
import HealthcareScreen from '../screens/healthcare/HealthcareScreen';
import PetHealthScreen from '../screens/healthcare/PetHealthScreen';
import VeterinariansScreen from '../screens/healthcare/VeterinariansScreen';

// Training Screens
import TrainingScreen from '../screens/training/TrainingScreen';
import TrainingProgramsScreen from '../screens/training/TrainingProgramsScreen';

// Adoption Screens
import AdoptionScreen from '../screens/adoption/AdoptionScreen';
import PetDetailScreen from '../screens/adoption/PetDetailScreen';
import AdoptionFormScreen from '../screens/adoption/AdoptionFormScreen';

// Social Screens
import SocialFeedScreen from '../screens/social/SocialFeedScreen';
import CreatePostScreen from '../screens/social/CreatePostScreen';

// Profile Screens
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import MyPetsScreen from '../screens/profile/MyPetsScreen';
import AddPetScreen from '../screens/profile/AddPetScreen';
import OrdersScreen from '../screens/profile/OrdersScreen';

// Emergency Screen
import EmergencyScreen from '../screens/emergency/EmergencyScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="ProductsTab" 
        component={ProductsScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color }) => <Icon name="shopping-bag" size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="ServicesTab" 
        component={ServicesScreen}
        options={{
          tabBarLabel: 'Services',
          tabBarIcon: ({ color }) => <Icon name="calendar" size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="SocialTab" 
        component={SocialFeedScreen}
        options={{
          tabBarLabel: 'Social',
          tabBarIcon: ({ color }) => <Icon name="users" size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Icon name="user" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Simple icon component - using emoji for now
const Icon = ({ name, size, color }: { name: string; size: number; color: string }) => {
  const iconMap: { [key: string]: string } = {
    home: '🏠',
    'shopping-bag': '🛍️',
    calendar: '📅',
    users: '👥',
    user: '👤',
  };
  return (
    <Text style={{ fontSize: size, color }}>{iconMap[name] || '•'}</Text>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="MobileLogin" component={MobileLoginScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="ServiceProviders" component={ServiceProvidersScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
            <Stack.Screen name="PetHealth" component={PetHealthScreen} />
            <Stack.Screen name="Veterinarians" component={VeterinariansScreen} />
            <Stack.Screen name="TrainingPrograms" component={TrainingProgramsScreen} />
            <Stack.Screen name="PetDetail" component={PetDetailScreen} />
            <Stack.Screen name="AdoptionForm" component={AdoptionFormScreen} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="MyPets" component={MyPetsScreen} />
            <Stack.Screen name="AddPet" component={AddPetScreen} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="Emergency" component={EmergencyScreen} />
            <Stack.Screen name="Healthcare" component={HealthcareScreen} />
            <Stack.Screen name="Training" component={TrainingScreen} />
            <Stack.Screen name="Adoption" component={AdoptionScreen} />
            <Stack.Screen name="Settings" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

