import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';

import { theme } from './src/theme';
import BottomNav        from './src/components/BottomNav';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen       from './src/screens/HomeScreen';
import CheckinScreen    from './src/screens/CheckinScreen';
import ChatScreen       from './src/screens/ChatScreen';
import JournalScreen    from './src/screens/JournalScreen';

function App() {
  const [screen, setScreen] = useState('Onboarding');

  const renderScreen = () => {
    switch (screen) {
      case 'Onboarding': return <OnboardingScreen onStart={() => setScreen('Home')} />;
      case 'Home':       return <HomeScreen onCheckin={() => setScreen('Checkin')} />;
      case 'Checkin':    return <CheckinScreen onDone={() => setScreen('Home')} />;
      case 'Chat':       return <ChatScreen />;
      case 'Journal':    return <JournalScreen />;
      default:           return <HomeScreen />;
    }
  };

  const showNav = screen !== 'Onboarding';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {renderScreen()}
        </View>
        {showNav && (
          <BottomNav active={screen} onNavigate={setScreen} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.bg },
  container: { flex: 1 },
});

registerRootComponent(App);

export default App;
