import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

export default class App extends React.Component {
  state = {
    device : null,
    cameHere : ''
  }
  componentDidMount() {
      OneSignal.init("206a6513-b453-4807-89c1-040389fa8dea");
    
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
  }
  onReceived(notification) {
      console.log("Notification received: ", notification);
  }
  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }
  onIds(device) {
		this.setState({device: device, cameHere: 'yes'})
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>Device Info : {this.state.device}</Text>
        <Text>Came here  : {this.state.cameHere}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
