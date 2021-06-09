import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class ExpenseSummaryScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Expense Summary',
    };
  };

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
