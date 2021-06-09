import React, {Component} from 'react';
import ExpenseListScreen from './src/screens/ExpenseListScreen';
import ExpenseFormScreen from './src/screens/ExpenseFormScreen';
import ExpenseDetailsScreen from './src/screens/ExpenseDetailsScreen';
import ExpenseSummaryScreen from './src/screens/ExpenseSummaryScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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
  render() {
    return <AppContainer screenProps={{appName: 'wisemoney'}} />;
  }
}

