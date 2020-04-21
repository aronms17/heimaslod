import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default class Splash extends React.Component {
  render() {
    return (
      <View>
          <Text>Intro</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gradientStyles:{
   flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    height:100,
  }
})