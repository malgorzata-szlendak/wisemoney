import React, { Component } from 'react';

import ExpenseListScreen from './src/screens/ExpenseListScreen';
import ExpenseFormScreen from './src/screens/ExpenseFormScreen';
import ExpenseDetailsScreen from './src/screens/ExpenseDetailsScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// edit tekst w title nie pobiera się do form po zeedytowaniu lista sie nie updatuje, ikony z elements nie dzialaja, zaciagnac nowe albo ogarnac czemu nie / category trzeba zmienic na do wyboru
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
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// // import { HomeScreen } from './src/screens';

// const theme = {
//   ...DefaultTheme,
//   color: {
//     ...DefaultTheme.colors,
//     border: "transparent"
//   }
// }

// const Stack = createStackNavigator();

// const App = () => {
//   return(
//     <NavigationContainer theme={theme}>
//       <Stack.Navigator
//       //   screenOptions={{
//       //  headerShown: false
//       //   }}
//         // initialRouteName={'HomeScreen'}
//         initialRouteName={'ExpenseList'}
//       >
//         {/* <Stack.Screen name="HomeScreen" component={HomeScreen}/> */}
//         <Stack.Screen name="ExpenseList" component={ExpenseListScreen} options={ExpenseListScreen.navigationOptions} />
//         <Stack.Screen name="ExpenseForm" component={ExpenseFormScreen} options={ExpenseFormScreen.navigationOptions}/>
//         <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} options={ExpenseDetailsScreen.navigationOptions}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App;


