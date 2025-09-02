import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
 
  React.useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);


  const triggerNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "WebView Loaded 🎉",
    body: "The page finished loading.",
      },
      trigger: {
        type: 'timeInterval',
        seconds: 5,
      } as Notifications.TimeIntervalTriggerInput,
    });
  }; 

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <Ionicons name="home" size={40} color="purple" />
        <ThemedText type="title">Hello kshitijaaa! 👋</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <Button
          title="Send WebView Notification"
          onPress={() =>
            triggerNotification('WebView', 'Button clicked in WebView 🚀')
          }
        />
        <Button
          title="Send Video Notification"
          onPress={() =>
            triggerNotification('Video Player', 'Tap to open Video Player 🎬')
          }
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    marginVertical: 20,
    gap: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
