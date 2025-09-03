import './global.css';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import { ToastProvider } from 'react-native-toast-notifications';
import Orientation from 'react-native-orientation-locker';
import axios from 'axios';
import { API_BASE_URL } from '@env';

const AppContent: React.FC = () => {
  const { token } = useAuth();

  useEffect(() => {
    Orientation.lockToPortrait(); // 🔒 lock app orientation
  }, []);

  useEffect(() => {
    let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

    const sendHeartbeat = async () => {
      if (!token) return; // only run if logged in
      try {
        await axios.post(
          `${API_BASE_URL}/api/users/heartbeat`,
          {
            device_info: {
              platform: 'mobile',
              version: '1.0.0',
              os: 'ReactNative'
            }
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log('✅ Heartbeat sent');
        
      } catch (error: any) {
        console.log('❌ Heartbeat failed:', error?.message || error);
      }
    };

    if (token) {
      // fire once immediately
      sendHeartbeat();
      // repeat every 2 minutes
      heartbeatInterval = setInterval(sendHeartbeat, 120000);
    }

    // cleanup when token changes or on unmount
    return () => {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    };
  }, [token]);

  return <AppNavigation />;
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          animated={false}
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <ToastProvider
          placement="top"
          duration={3000}
          animationType="slide-in"
          offset={60}
          successColor="#4BB543"
          dangerColor="#FF4C4C"
        >
          <AuthProvider>
            <UserProvider>
              <AppContent />
            </UserProvider>
          </AuthProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
