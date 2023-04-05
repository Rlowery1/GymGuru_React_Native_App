import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function withAuthProtection(WrappedComponent) {
  return function AuthProtection(props) {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const idToken = await AsyncStorage.getItem('idToken');
          if (!idToken) {
            // Reset the navigation stack and navigate to the Home screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }
        } catch (error) {
          console.error('Error checking authentication', error);
        } finally {
          setIsLoading(false);
        }
      };
      checkAuth();
    }, [navigation]);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <WrappedComponent {...props} />
      </View>
    );
  };
}
