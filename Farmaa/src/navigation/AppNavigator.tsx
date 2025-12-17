import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import SearchScreen from '../screens/ecommerce/SearchScreen';
import FilterScreen from '../screens/ecommerce/FilterScreen';
import CartScreen from '../screens/ecommerce/CartScreen';
import AddressScreen from '../screens/ecommerce/AddressScreen';
import PaymentSuccessScreen from '../screens/ecommerce/PaymentSuccessScreen';
import PaymentFailedScreen from '../screens/ecommerce/PaymentFailedScreen';
import OrderDetailScreen from '../screens/ecommerce/OrderDetailScreen';
import OrderUpdateScreen from '../screens/ecommerce/OrderUpdateScreen';
import ReturnOrderScreen from '../screens/ecommerce/ReturnOrderScreen';
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
import VetSearchScreen from '../screens/healthcare/VetSearchScreen';
import ChangeLocationScreen from '../screens/healthcare/ChangeLocationScreen';

// Training Screens
import TrainingScreen from '../screens/training/TrainingScreen';
import TrainingProgramsScreen from '../screens/training/TrainingProgramsScreen';
import TrainingLessonsScreen from '../screens/training/TrainingLessonsScreen';
import VideoPlayerScreen from '../screens/training/VideoPlayerScreen';
import SubscriptionScreen from '../screens/training/SubscriptionScreen';

// Adoption Screens
import AdoptionScreen from '../screens/adoption/AdoptionScreen';
import PetDetailScreen from '../screens/adoption/PetDetailScreen';
import AdoptionFormScreen from '../screens/adoption/AdoptionFormScreen';

// Social Screens
import SocialFeedScreen from '../screens/social/SocialFeedScreen';
import CreatePostScreen from '../screens/social/CreatePostScreen';
import CommentsScreen from '../screens/social/CommentsScreen';
import CameraScreen from '../screens/social/CameraScreen';
import PostVideoScreen from '../screens/social/PostVideoScreen';
import ViewVideoScreen from '../screens/social/ViewVideoScreen';
import LikesScreen from '../screens/social/LikesScreen';

// Explore Screen
import ExploreScreen from '../screens/explore/ExploreScreen';

// Profile Screens
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import MyPetsScreen from '../screens/profile/MyPetsScreen';
import AddPetScreen from '../screens/profile/AddPetScreen';
import OrdersScreen from '../screens/profile/OrdersScreen';
import PetProfileScreen from '../screens/profile/PetProfileScreen';
import EditPetProfileScreen from '../screens/profile/EditPetProfileScreen';
import AddPetProfileScreen from '../screens/profile/AddPetProfileScreen';

// AI Chat Screens
import PetAIChatScreen from '../screens/ai/PetAIChatScreen';
import ChatHistoryScreen from '../screens/ai/ChatHistoryScreen';

// Hope Screens
import HopeScreen from '../screens/hope/HopeScreen';
import HopeDetailScreen from '../screens/hope/HopeDetailScreen';
import AddHopePostScreen from '../screens/hope/AddHopePostScreen';
import HopeChatsListScreen from '../screens/hope/HopeChatsListScreen';
import HopeChatScreen from '../screens/hope/HopeChatScreen';
import HopeChangeLocationScreen from '../screens/hope/HopeChangeLocationScreen';

// Pet Events Screens
import PetEventsScreen from '../screens/events/PetEventsScreen';
import PetEventDetailScreen from '../screens/events/PetEventDetailScreen';

// Cremation Screens
import CremationScreen from '../screens/cremation/CremationScreen';
import CremationRequestScreen from '../screens/cremation/CremationRequestScreen';
import CremationChangeLocationScreen from '../screens/cremation/CremationChangeLocationScreen';

// Emergency Screen
import EmergencyScreen from '../screens/emergency/EmergencyScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1E3A8A',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 5,
          height: 60 + Math.max(insets.bottom - 10, 0),
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tab.Screen 
        name="ProductsTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color }) => <Icon name="shopping-bag" size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="ExploreTab" 
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => <Icon name="explore" size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="TrainTab" 
        component={TrainingScreen}
        options={{
          tabBarLabel: 'Train',
          tabBarIcon: ({ color }) => <Icon name="train" size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="SocialTab" 
        component={SocialFeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => <Icon name="feed" size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="VetTab" 
        component={VeterinariansScreen}
        options={{
          tabBarLabel: 'Vet',
          tabBarIcon: ({ color }) => <Icon name="vet" size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => <Icon name="more" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Simple icon component - using emoji for now
const Icon = ({ name, size, color }: { name: string; size: number; color: string }) => {
  const iconMap: { [key: string]: string } = {
    'shopping-bag': '🛍️',
    explore: '🔍',
    train: '🐾',
    feed: '📱',
    vet: '👨‍⚕️',
    more: '☰',
  };
  return (
    <Text style={{ fontSize: size, color }}>{iconMap[name] || '•'}</Text>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={loading ? "Splash" : (!isAuthenticated ? "Splash" : "MainTabs")}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
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
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Filter" component={FilterScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Address" component={AddressScreen} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
            <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="OrderUpdate" component={OrderUpdateScreen} />
            <Stack.Screen name="ReturnOrder" component={ReturnOrderScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="ServiceProviders" component={ServiceProvidersScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
            <Stack.Screen name="PetHealth" component={PetHealthScreen} />
            <Stack.Screen name="Veterinarians" component={VeterinariansScreen} />
            <Stack.Screen name="VetSearch" component={VetSearchScreen} />
            <Stack.Screen name="ChangeLocation" component={ChangeLocationScreen} />
            <Stack.Screen name="TrainingPrograms" component={TrainingProgramsScreen} />
            <Stack.Screen name="TrainingLessons" component={TrainingLessonsScreen} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen name="PetDetail" component={PetDetailScreen} />
            <Stack.Screen name="AdoptionForm" component={AdoptionFormScreen} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen name="Comments" component={CommentsScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="PostVideo" component={PostVideoScreen} />
            <Stack.Screen name="ViewVideo" component={ViewVideoScreen} />
            <Stack.Screen name="Likes" component={LikesScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="MyPets" component={MyPetsScreen} />
            <Stack.Screen name="AddPet" component={AddPetScreen} />
            <Stack.Screen name="PetProfile" component={PetProfileScreen} />
            <Stack.Screen name="EditPetProfile" component={EditPetProfileScreen} />
            <Stack.Screen name="AddPetProfile" component={AddPetProfileScreen} />
            <Stack.Screen name="Emergency" component={EmergencyScreen} />
            <Stack.Screen name="Healthcare" component={HealthcareScreen} />
            <Stack.Screen name="Training" component={TrainingScreen} />
            <Stack.Screen name="Adoption" component={AdoptionScreen} />
            <Stack.Screen name="Settings" component={ProfileScreen} />
            <Stack.Screen name="PetAIChat" component={PetAIChatScreen} />
            <Stack.Screen name="ChatHistory" component={ChatHistoryScreen} />
            <Stack.Screen name="Hope" component={HopeScreen} />
            <Stack.Screen name="HopeDetail" component={HopeDetailScreen} />
            <Stack.Screen name="AddHopePost" component={AddHopePostScreen} />
            <Stack.Screen name="HopeChats" component={HopeChatsListScreen} />
            <Stack.Screen name="HopeChat" component={HopeChatScreen} />
            <Stack.Screen name="HopeChangeLocation" component={HopeChangeLocationScreen} />
            <Stack.Screen name="PetEvents" component={PetEventsScreen} />
            <Stack.Screen name="PetEventDetail" component={PetEventDetailScreen} />
            <Stack.Screen name="Cremation" component={CremationScreen} />
            <Stack.Screen name="CremationRequest" component={CremationRequestScreen} />
            <Stack.Screen name="CremationChangeLocation" component={CremationChangeLocationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

