import React, {Component} from 'react';

import ExpenseListScreen from './src/screens/ExpenseListScreen';
import ExpenseFormScreen from './src/screens/ExpenseFormScreen';
import ExpenseDetailsScreen from './src/screens/ExpenseDetailsScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// po edycji lista sie nie updatuje, zaciagnac nowe albo ogarnac czemu nie / category trzeba zmienic na do wyboru


// 0. rozszerzenie expense properties (category picker) /
// 4. zadanie z * mozesz sie pobawić stylowanie
// 5. stylowanko fun fun fun

//** kategorie: np. hobby, dom, niezbędne, chemia,  rozwój, inwestycje , inne , edukacja, jedzenie, ubrania, kosmetyki  max 5-6

//podsumowanie:  pie chart, 80% wydatków     |chemia       |      jezonko|                             pierdoły                  |                            |  1000zl

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      ExpenseList: ExpenseListScreen,
      ExpenseForm: ExpenseFormScreen,
      ExpenseDetails: ExpenseDetailsScreen,
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

// const [selectedCat, setSelectedCat] = useState(); //picker

// <Picker
//                     selectedValue={selectedCat}
//                     onValueChange={(itemValue, itemIndex) =>
//                         setSelectedCat(itemValue)
//                     }>
//                     <Picker.Item label="Edukacja" value="education" />
//                     <Picker.Item label="Jedzenie" value="food" />
//                     <Picker.Item label="Leki" value="medicine" />
//                     <Picker.Item label="Kosmetyki" value="beauty" />
//                     <Picker.Item label="Sport" value="sport" />
//                     <Picker.Item label="Odzież" value="clothes" />
//                 </Picker>