import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Byggðin undir hrauni</Text>
      <Image source={{uri: 'https://www.visindavefur.is/myndir/heimaey_1973_280402.jpg'}}
       style={{width: 400, height: 400}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});
