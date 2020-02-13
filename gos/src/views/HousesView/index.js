import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import data from '../../houses.json';

export default class HousesView extends React.Component {
  constructor() {
    super();
    this.state = {
      houses: []
    };
  }
  

componentDidMount() {
    this.setState({ houses: data });
}
  

  render() {
    const { houses } = this.state;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {console.log(data)}}>
                    <Text style={{fontSize: 40, color: 'blue', textAlign: 'center', marginTop: 100}}>Hús undir hrauni</Text>
        </TouchableOpacity>
        <FlatList
             data={houses}
             showsVerticalScrollIndicator={false}
             renderItem={({item}) =>
                <TouchableOpacity onPress={() => {console.log(data)}}>
                    <Text style={{color: 'blue', textAlign: 'center', marginTop: 20}}>{item.address}</Text>
                    <Text style={{color: 'blue', textAlign: 'center', marginTop: 20}}>{item.text}</Text>
                    <Image  style={{width: 200, height: 200}} source={{ uri: item.image}}></Image>
                </TouchableOpacity>
             }
           />
      </View>

    )
  }

}
