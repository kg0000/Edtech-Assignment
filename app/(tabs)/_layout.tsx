
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';



export default function TabsLayout() {
  const router = useRouter();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    (async () => {
      try {
        await Notifications.requestPermissionsAsync();
      } catch (e) {
        console.warn('Notification permission request failed:', e);
      }
    })();

    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      try {
        const title = response.notification?.request?.content?.title ?? '';
        const lower = title.toLowerCase();
        if (lower.includes('video')) {
          router.push('/video' as any);
        } else if (lower.includes('web') || lower.includes('webview')) {
          router.push('/webview' as any);
        } else {
          router.push('/' as any);
        }
      } catch (err) {
        console.warn('Error handling notification response:', err);
      }
    });

    return () => sub.remove();
  }, [router]);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: '#6C63FF',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'home-outline';
          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'webview') {
            iconName = focused ? 'globe' : 'globe-outline'; 
          } else if (route.name === 'video') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="webview" options={{ title: 'Web' }} />
      <Tabs.Screen name="video" options={{ title: 'Video' }} />
    </Tabs>
  );
}
