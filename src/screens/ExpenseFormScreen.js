import React, { Component } from 'react';
import { date } from 'yup';
import ExpenseForm from '../../ui/ExpenseForm';

export default class ExpenseFormScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('expense') ? 'Edit Expense' : 'New Expense'
    }
  };
  
  state = {
    expense: {
      title: '',
      category: '',
      description: '',
      price: '',
      date: ''
    }
  }

  componentDidMount() {
    const currentExpense = this.props.navigation.getParam('expense');

    if (currentExpense) {
      this.setState(prevState => ({ expense: prevState.expense = currentExpense }))
    }
  }

  onExpenseUpdated = (expense) => {
    console.log(expense);
    this.props.navigation.popToTop();
  }


  render() {
    return (
      <ExpenseForm
        expense={this.state.expense}
        onExpenseAdded={this.props.navigation.getParam('expenseAddedCallback')}
        onExpenseUpdated={this.onExpenseUpdated}
      />
    );
  }
}