import './global.css';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import { AuthProvider } from './src/context/AuthContext';
// import SystemNavigationBar from 'react-native-system-navigation-bar';
const App = () => {
// useEffect(() => {
//   SystemNavigationBar.setNavigationColor('#1C75BC', 'light');
//   SystemNavigationBar.stickyImmersive(); // optional: full screen (hides nav bar)
// }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          animated={false}
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <AuthProvider>
          <AppNavigation />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
