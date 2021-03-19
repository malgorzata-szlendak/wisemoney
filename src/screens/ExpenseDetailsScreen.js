import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { deleteExpense } from '../../api/ExpensesApi'

class ExpenseDetailsScreen extends Component {

  static navigationOptions = () => {
    return {
      title: 'Expense Details'
    }
  };

  render() {
    const expense = this.props.navigation.getParam('expense');

    const onExpenseDeleted = this.props.navigation.getParam('expenseDeletedCallback');

    console.log(expense);
    return (
      <View style={styles.container}>
        <View>
          <Icon
            reverse
            name='edit'
            type='font-awesome-5'
            onPress={() =>
              this.props.navigation.navigate('ExpenseForm', {
                expense: expense
              })
            }
          />
          <Icon
            reverse
            name='trash'
            type='font-awesome-5'
            color='#CA300E'
            onPress={() =>
              Alert.alert(
                'Usunąć?',
                'Nie można cofnąć',
                [
                  { text: 'Zamknij' },
                  { text: 'OK', onPress: () => { deleteExpense(expense, onExpenseDeleted) } }
                ],
                { cancelable: false },
              )
            }
          />
        </View>
        <Text>{expense.title}</Text>
        <Text>Kategoria: {expense.category}</Text>
        <Text>Opis: {expense.description}</Text>
        <Text>Cena: {expense.price}</Text>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});

export default ExpenseDetailsScreen;
