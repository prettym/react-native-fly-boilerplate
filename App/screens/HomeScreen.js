import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>RNFlyBoilerplate</Text>
        <Icon name="github" size={80} color="black" style={{ marginTop: 24 }} />
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
