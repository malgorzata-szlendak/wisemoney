import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    Button
} from 'react-native'
//import { addExpense} from "../api/ExpensesApi";
import  {} from '../components/ExpensesList'

export default class AddExpense extends Component {

    state = {
        expense: {
            title: '',
            category: '',
            description: '',
            price: '',
        }
    }

    componentDidMount() {

    }
    onExpenseUpdated = (expense) => {
        console.log(expense);
    }


    render() {
        return (
            <View>
                <TextInput
                    placeholder='tytuł...'
                    containerStyle={{ marginTop: 10 }}
                    value={this.state.expense.title}
                    onChangeText={(text) => this.setState(prevState => ({
                        title: prevState.title = text
                    }))
                    }
                />
                <TextInput
                    placeholder='kategoria...'
                    containerStyle={{ marginTop: -10 }}
                    value={this.state.expense.category}
                    onChangeText={(text) => this.setState(prevState => ({
                        category: prevState.category = text
                    }))
                    }
                />
                <TextInput
                    placeholder='opis...'
                    containerStyle={{ marginTop: -10 }}
                    value={this.state.expense.description}
                    onChangeText={(text) => this.setState(prevState => ({
                        description: prevState.description = text
                    }))
                    }
                />

                {/* kategoria */}
                {/* timepicker? data */}
                <TextInput
                    placeholder='cena...'
                    containerStyle={{ marginTop: -10 }}
                    value={this.state.expense.price}
                    onChangeText={(text) => this.setState(prevState => ({
                        price: prevState.price = text
                    }))
                    }
                />
                <Button
                    title='DODAJ'
                    onPress={() =>
                        addExpense(
                            {
                                title: this.state.expense.title,
                                category: this.state.expense.category,
                                description: this.state.expense.description,
                                price: this.state.expense.price
                            },
                            this.onExpenseAdded
                        )
                    } //wywolanie addexp i przekazanie expense objektu title i desc
                />
            </View>
        )
    }
}
