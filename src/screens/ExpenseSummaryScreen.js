import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {VictoryPie} from 'victory-native';
import {Svg} from 'react-native-svg';
import {COLORS, SIZES, FONTS, icons} from '../../constants';

export default class ExpenseSummaryScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Expense Summary',
    };
  };

  renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center', width: 50}}
          onPress={() => console.log('More')}>
          <Image
            source={icons.chart}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.cpPINK,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center', width: 50}}
          onPress={() => console.log('More')}>
          <Image
            source={icons.plus}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.cpPINK,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}
          onPress={() => console.log('More')}>
          <Image
            source={icons.menu}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.cpPINK,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  renderTitle() {
    return (
      <View
        style={{
          height: 80,
          backgroundColor: COLORS.lightGray,
          padding: SIZES.padding,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.pinkPower}}>
          Summary of your expenses
        </Text>
        <Text style={{...FONTS.body4, color: COLORS.darkgray}}>Count: X</Text>
      </View>
    );
  }
  render() {
    return (
      <View>
        {this.renderTitle()}
        {this.renderNavBar()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
