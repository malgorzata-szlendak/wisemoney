import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    FlatList,
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import { getExpenses } from '../../api/ExpensesApi';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

class ExpenseList extends Component {
    static navigationOptions = ({ navigation }) => {

        return {
            title: 'Expense List',
        }
    };

    state = {
        expenseList: [],
        selectedIndex: 0
    }

    onExpenseAdded = (expense) => {
        this.setState(prevState => ({
            expenseList: [...prevState.expenseList, expense]
        }));
        this.props.navigation.popToTop();
    }

    onExpenseDeleted = () => {

        var newExpenseList = [...this.state.expenseList];
        newExpenseList.splice(this.state.selectedIndex, 1);

        this.setState(prevState => ({
            expenseList: prevState.expenseList = newExpenseList
        }));

        this.props.navigation.popToTop();
    }

    onExpenseReceived = (expenseList) => {
        this.setState(prevState => ({
            expenseList: prevState.expenseList = expenseList
        }));
    }

    componentDidMount() {
        getExpenses(this.onExpenseReceived);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.expenseList.title !== this.state.expenseList.title) {
            getExpenses(this.onExpenseReceived);
        }
    }
   

    showActionButton = () =>
        <ActionButton
            buttonColor='pink'
            onPress={() => this.props.navigation.navigate('ExpenseForm', { expenseAddedCallback: this.onExpenseAdded })}
        />

    render() {
        return this.state.expenseList.length > 0 ?
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.expenseList}
                    ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <ListItem
                                containerStyle={styles.listItem}
                                onPress={() => {
                                    this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                                    this.props.navigation.navigate('ExpenseDetails', { expense: item, expenseDeletedCallback: this.onExpenseDeleted })
                                }
                                }>
                                <ListItem.Content>
                                    <ListItem.Title>
                                        <Text>{item.title} </Text>
                                        
                                        <Text> {item.price} PLN</Text>
                                    </ListItem.Title>
                                    <ListItem.Title>
                                    <Text>{`| Kategoria: ${item.category}`}</Text>
                                    </ListItem.Title>
                                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        );
                    }
                    }
                />
                {this.showActionButton()}
            </SafeAreaView> :
            <View style={styles.textContainer}>
                <Text>Nie znaleziono wydatków</Text>
                <Text>Dodaj nowy wydatek używając przycisku + poniżej </Text>
                {this.showActionButton()}
            </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listItem: {
        marginTop: 5,
        marginBottom: 5
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ExpenseList;