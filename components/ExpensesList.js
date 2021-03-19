import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    FlatList,
    Button,
    TouchableOpacity,
    Alert
}
    from 'react-native'
import { ListItem, Divider, Input } from "react-native-elements";
import { addExpense, getExpenses, deleteExpense, updateExpense } from ".././api/ExpensesApi";
// import AddExpense from '../components/AddExpense'

export default class ExpensesList extends Component { 

    state = {
        expensesList: [],
        // expense: {
        //     title: '',
        //     category: '',
        //     description: '',
        //     price: '',
        // },
        title: null,
        description: null,
        category: null,
        price: null,
        selectedIndex: 0
    }

    onExpenseAdded = (expense) => {
        this.setState(prevState => ({
            expensesList: [...prevState.expensesList, expense]
        }));
    }
    onExpenseDeleted = () => {
        console.log(this.state.selectedIndex);
        var newExpensesList = [...this.state.expensesList];  //kopia expenseslist
        newExpensesList.splice(this.state.selectedIndex, 1); //update listy żeby nie zawierała itemu który chcemy usunąć /splice wycięcie części array
        //usuniecie 1
        this.setState(prevState => ({
            expensesList: prevState.expensesList = newExpensesList //ustawienie stanu używając nowej listy
        }));

    }

    onExpenseUpdated = (expense) => {
        console.log(expense);
      }
    

    onExpenseReceived = (expensesList) => {
        console.log(expensesList);
        this.setState(prevState => ({
            expensesList: prevState.expensesList = expensesList
        }));
    }

    componentDidMount() {
        getExpenses(this.onExpenseReceived);
    }


    render() {
        return (
            <View>
                <View>
                    <TextInput
                        placeholder='tytuł...'
                        containerStyle={{ marginTop: 10 }}
                        value={this.state.title}
                        onChangeText={(text) => this.setState(prevState => ({
                            title: prevState.title = text
                        }))
                        }
                    />
                    <TextInput
                        placeholder='kategoria...'
                        containerStyle={{ marginTop: -10 }}
                        value={this.state.category}
                        onChangeText={(text) => this.setState(prevState => ({
                            category: prevState.category = text
                        }))
                        }
                    />
                    <TextInput
                        placeholder='opis...'
                        containerStyle={{ marginTop: -10 }}
                        value={this.state.description}
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
                        value={this.state.price}
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
                                    title: this.state.title,
                                    category: this.state.category,
                                    description: this.state.description,
                                    price: this.state.price
                                },
                                this.onExpenseAdded
                            )
                        } //wywolanie addexp i przekazanie expense objektu title i desc
                    />
                </View>
                <FlatList
                    data={this.state.expensesList}
                    ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        console.log(item);
                        return (
                            <ListItem
                                bottomDivider
                                onPress={() => {
                                    this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                                }}
                            >
                                <ListItem.Content>
                                    <Button
                                        title='edit'
                                        onPress={() => { }}
                                    />
                                    <Button
                                        title='delete'
                                        onPress={() => {
                                            this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                                        }}
                                        onPress={() => 
                                            deleteExpense(
                                                { 
                                                    title: this.state.title,
                                                    category: this.state.category,
                                                    description: this.state.description,
                                                    price: this.state.price
                                                    
                                                },
                                                this.onExpenseDeleted
                                            )
                                            // Alert.alert(
                                            //     'Usunąć?',
                                            //     'Cannot be undone',
                                            //     [
                                            //       { text: 'Zamknij' },
                                            //       { text: 'OK', onPress: () => { 
                                            //         //   deleteExpense(expense, onExpenseDeleted) } }
                                            //         deleteExpense(expense, this.onExpenseDeleted )}}
                                            //     ],
                                            //     { cancelable: false },
                                            //   )
                                        }
                                    />
                                    <ListItem.Title>
                                        <Text>{item.title} </Text>
                                        <Text> {item.category} </Text>
                                        <Text>{item.price} PLN</Text>
                                    </ListItem.Title>
                                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        );
                    }
                    }

                />
            </View>
        );
    }
}
 //  <Text>{item.title}</Text>
// <Text>{item.description}</Text>
// <Text>{item.price} PLN</Text>