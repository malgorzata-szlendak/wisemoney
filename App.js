import React, {Component} from 'react';
import ExpenseListScreen from './src/screens/ExpenseListScreen';
import ExpenseFormScreen from './src/screens/ExpenseFormScreen';
import ExpenseDetailsScreen from './src/screens/ExpenseDetailsScreen';
import ExpenseSummaryScreen from './src/screens/ExpenseSummaryScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from 'react-native-splash-screen'

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      ExpenseList: ExpenseListScreen,
      ExpenseForm: ExpenseFormScreen,
      ExpenseDetails: ExpenseDetailsScreen,
      ExpenseSummary: ExpenseSummaryScreen
    },
    {
      initialRouteName: 'ExpenseList',
    },
  ),
);

export default class App extends Component {

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  render() {
    return <AppContainer screenProps={{appName: 'wisemoney'}}>
      
    </AppContainer>
  }
}

