import React from 'react';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';

import StackNavigator from './navigators/StackNavigator';

const AppContainer = createAppContainer(StackNavigator);

// FCM token request count
// If the number of requests exceeds 10, the operation will be aborted.
let getFcmTokenTryCount = 0;

export default class App extends React.Component {

  async componentDidMount() {
    try {
      await auth().signInAnonymously();
    } catch (e) {
      switch (e.code) {
        case 'auth/operation-not-allowed':
          console.log('Enable anonymous in your firebase console.');
          break;
        default:
          console.error(e);
          break;
      }
    }

    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();

    // Check permission of push notifications for iOS only
    if (Platform.OS === 'ios') {
      await PushNotificationIOS.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
      });
    }

    // Get FCM token
    const fcmToken = await this.getFcmToken();
    console.debug('fcmToken', fcmToken);
  }

  render() {
    return (
      <AppContainer />
    );
  }

  getFcmToken = async () => {
    // Abort when more than 10 attempts to acquire FCM tokens
    if (getFcmTokenTryCount++ > 10) {
      return;
    }

    await this.sleep(1000);
    const fcmToken = await messaging().getToken()
      .catch(e => {
        console.debug(getFcmTokenTryCount, e);
        return this.getFcmToken();
      });

    if (fcmToken === undefined) {
      return this.getFcmToken();
    }

    return fcmToken;
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
}