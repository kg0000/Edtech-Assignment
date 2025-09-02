import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebViewScreen() {
  const webviewRef = useRef(null);
  const router = useRouter();

  const scheduleNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 3 }

    });
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://houseofedtech.in/' }}
        style={styles.webview}
        onLoadEnd={() =>
          scheduleNotification("WebView Loaded ", "The page finished loading.")
        }
      />
      <View style={styles.buttons}>
        <Button
          title="Notify: Hello 👋"
          onPress={() => scheduleNotification("Hello!", "This is the first notification.")}
        />
        <Button
          title="Notify + Open Video 🎥"
          onPress={() => {
            scheduleNotification("Video Player", "Opening Video screen...");
            router.push('/video');


          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 }
});
