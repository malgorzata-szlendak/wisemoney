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
import { color } from 'react-native-reanimated';
import { deleteExpense } from '../../api/ExpensesApi'
import {COLORS, SIZES, FONTS, icons} from '../../constants';

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
      <View style={styles.containerWithShadow }>
        <View style={styles.row}>
          <Icon
            reverse
            raised= {true}
            size={35}
            color={COLORS.green3}
            reverseColor= {COLORS.cpPINK}         
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
            raised= {true}
            size={35}
            color={COLORS.green3}
            reverseColor= {COLORS.cpGreen}  
            name='trash'
            type='font-awesome-5'
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
        <View>
        <Text style={styles.headerText}>{expense.title}</Text>
        <Text style={styles.categoryText}>Category: {expense.category}</Text>
        <Text style={styles.subText}>Description: {expense.description}</Text>
        <Text style={styles.sub2Text}>Price: {expense.price} PLN</Text>
        <Text style={styles.dateText}>Date: {expense.date}</Text>
        </View>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold' ,
    fontSize: 38,
    marginBottom: 30,
    alignSelf: 'center',
    color: COLORS.green3,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  categoryText: {
    fontSize: 22,
    marginBottom: 30,
    alignSelf: 'center',
    color: COLORS.cpPINK,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 19,
    marginBottom: 45,
    alignSelf: 'center'
  },
  sub2Text: {
    fontSize: 18,
    marginBottom: 20,
    alignSelf: 'center'
  },
  dateText: {
    fontSize: 18,
    marginBottom: 30,
    paddingBottom: 10,
    alignSelf: 'center'
  },

  container: {
    alignItems: 'center',
    backgroundColor: COLORS.odOrange,
    borderRadius: 40,
    marginHorizontal:20,
    marginTop: 30,
  },
  containerWithShadow: {
      alignItems: 'center',
      backgroundColor: COLORS.green7,
      borderRadius: 40,
      marginHorizontal:20,
      marginTop: 50,
      shadowColor: "#000",
      shadowOffset: {
          width: 2,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 4,
  },
  expenseContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: 'grey'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 2,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
}
});


export default ExpenseDetailsScreen;
