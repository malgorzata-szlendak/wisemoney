import React, { Component } from 'react';

import ExpenseListScreen from './src/screens/ExpenseListScreen';
import ExpenseFormScreen from './src/screens/ExpenseFormScreen';
import ExpenseDetailsScreen from './src/screens/ExpenseDetailsScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// po edycji lista sie nie updatuje, ikony z elements nie dzialaja, zaciagnac nowe albo ogarnac czemu nie / category trzeba zmienic na do wyboru
// HomeScreen i components będą do usunięcia

// 0. rozszerzenie expense properties (category + date) /
    // 1. edit/add (edit i delete oddzielne albo z przekazaniem propsa) + button "edit", dane w placeholdery, i przycisk "zapisz" /oddzielny ekran na kazdy
    // 2. lista wydatków (home screen) oddzielny screen (na nim bedziemy pozniej zapinac chart*) + button "usuń" (delete element)
    //  ------------------------------------------------------------------------------------------------------------------------------------------------------
    // 3. navigacja simple very (nie jest must have na czwartek)
    // 4. zadanie z * mozesz sie pobawić stylowanie
    // 5. stylowanko fun fun fun


    //** kategorie: np. hobby, dom, niezbędne, chemia,  rozwój, inwestycje , inne , edukacja, jedzenie, ubrania, kosmetyki  max 5-6

    //podsumowanie:  pie chart, 80% wydatków     |chemia       |      jezonko|                             pierdoły                  |                            |  1000zl

const AppContainer = createAppContainer(createStackNavigator(
  {
  ExpenseList: ExpenseListScreen,
  ExpenseForm: ExpenseFormScreen,
  ExpenseDetails: ExpenseDetailsScreen
  },
  {
    initialRouteName: 'ExpenseList',
  }
));

export default class App extends Component {
  render() {
    return (
      <AppContainer
        screenProps={{ appName: 'wisemoney' }}
      />
    )
  }
}



