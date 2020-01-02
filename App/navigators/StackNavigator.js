import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';

export default createStackNavigator({
  Home: HomeScreen,
}, {
  initialRouteName: 'Home',
});