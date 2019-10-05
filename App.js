import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';

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
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>RNFlyBoilerplate</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
