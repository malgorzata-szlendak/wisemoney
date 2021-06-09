import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getExpenses} from '../../api/ExpensesApi';
import {ListItem, Divider, Icon} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { COLORS } from '../../constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class ExpenseList extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Expense List',
    };
  };

  state = {
    expenseList: [],
    selectedIndex: 0,
  };

  onExpenseAdded = expense => {
    this.setState(prevState => ({
      expenseList: [...prevState.expenseList, expense],
    }));
    this.props.navigation.popToTop();
  };

  onExpenseDeleted = () => {
    var newExpenseList = [...this.state.expenseList];
    newExpenseList.splice(this.state.selectedIndex, 1);

    this.setState(prevState => ({
      expenseList: (prevState.expenseList = newExpenseList),
    }));

    this.props.navigation.popToTop();
  };

  onExpenseReceived = expenseList => {
    this.setState(prevState => ({
      expenseList: (prevState.expenseList = expenseList),
    }));
  };

  componentDidMount() {
    getExpenses(this.onExpenseReceived);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenseList.title !== this.state.expenseList.title) {
      getExpenses(this.onExpenseReceived);
    }
  }

  showActionButton = () => (
    <ActionButton
      buttonColor= {COLORS.odOrange}
      onPress={() =>
        this.props.navigation.navigate('ExpenseForm', {
          expenseAddedCallback: this.onExpenseAdded,
        })
      }
    />
  );
  renderExpense = (expense, index) => {
    return (
      <View style={styles.feedItem}>
        <TouchableOpacity
          onPress={() => {
            this.setState(prevState => ({
              selectedIndex: (prevState.selectedIndex = index),
            }));
            this.props.navigation.navigate('ExpenseDetails', {
              expense,
              expenseDeletedCallback: this.onExpenseDeleted,
            });
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>

            <Icon 
              reverse
              name="shopping-basket"
              type="font-awesome-5"
              color= {COLORS.odOrange}
            />
            <Text style={styles.name}>{expense.title}</Text>
            <Text style={styles.name}>{expense.date}</Text>
            <Text style={styles.name}>{expense.price} PLN</Text>
          </View>

        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Lista wydatków</Text>
        </View> */}
        {/* <View style={{ paddingHorizontal: 40, marginTop: 20, marginBottom: 20 }}> */}
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 40,
              color: COLORS.odOrange 
            }}
            // style={styles.headerTitle}
          >
            Expenses
          </Text>
          </View>
        <FlatList
          style={styles.feed}
          data={this.state.expenseList}
          renderItem={({item}) => this.renderExpense(item)}
          // keyExtractor={item => item.id}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}></FlatList>
        {this.showActionButton()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cpDarkBlue,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    // alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  expense: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
  expenseImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
export default ExpenseList;
