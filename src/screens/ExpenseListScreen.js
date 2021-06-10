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
import {COLORS, icons, CategoryEnum, FONTS, SIZES} from '../../constants';
import {VictoryPie} from 'victory-native';
import {Svg} from 'react-native-svg';

const categoriesForChart = [
  {
    name: CategoryEnum.BILLS,
    icon: icons.bill,  //TODO: icons fix
    color: COLORS.purple,
  },
  {
    name: CategoryEnum.EDUCATION,
    icon: icons.education,
    color: COLORS.darkgreen,
  },
  {
    name: CategoryEnum.FOOD,
    icon: icons.food,
    color: COLORS.pink,
  },
  {
    name: CategoryEnum.CARE,
    icon: icons.care,
    color: COLORS.cpBlue,
  },
  {
    name: CategoryEnum.HOBBY,
    icon: icons.hobby, 
    color: COLORS.cpYellow,
  },
  {
    name: CategoryEnum.CLOTHING,
    icon: icons.clothing,
    color: COLORS.yellow2,
  },
  {
    name: CategoryEnum.OTHERS,
    icon: icons.other,  //TODO: icons fix
    color: COLORS.pink,
  },
];

class ExpenseList extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Expense List',
    };
  };

  state = {
    expenseList: [],
    selectedIndex: 0,
    selectedCategory: null,
  };

  setSelectedCategory = selectedCategory => {
    this.setState(prevState => ({
      expenseList: (prevState.selectedCategory = selectedCategory),
    }));
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
      buttonColor={COLORS.cpPINK}
      onPress={() =>
        this.props.navigation.navigate('ExpenseForm', {
          expenseAddedCallback: this.onExpenseAdded,
        })
      }
    />
  );
  // showChartButton = () => (
  //   <TouchableHighlight
  //     buttonColor={COLORS.odOrange}
  //     onPress={() =>
  //       this.props.navigation.navigate('ExpenseSummary')
  //     }>
  //     <Image
  //       source={icons.chart}
  //       style={{
  //         width: 30,
  //         height: 30,
  //         tintColor: COLORS.green3,
  //       }}
  //     />
  //   </TouchableHighlight>
  // );
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
              color={COLORS.green3}
              reverseColor= {COLORS.cpGreen} 
            />
            <Text style={styles.name}>{expense.title}</Text>
            <Text style={styles.name}>{expense.date}</Text>
            <Text style={styles.name}>{expense.price} PLN</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderNavBar() {
    return (
      <View
        style={styles.bottomBarContainer}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center', width: 50}}
          onPress={() => 
            this.props.navigation.navigate('ExpenseSummary')
          }>
          <Image
            source={icons.chart}
            resizeMode="contain"
            style={styles.bottomBarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center', width: 50}}
          onPress={() =>
          this.props.navigation.navigate('ExpenseForm', {
          expenseAddedCallback: this.onExpenseAdded,
        })
      }
          >
          <Image
            source={icons.plus}
            resizeMode="contain"
            style={styles.bottomBarIcon}
          />
        </TouchableOpacity>
        {/* {this.showActionButton()} */}
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}
          onPress={() => console.log('More')}>
          <Image
            source={icons.menu}
            resizeMode="contain"
            style={styles.bottomBarIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
  groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue,
      );
      return result;
    }, {});
  };

  mergeDataWithCategories = () => {
    const {expenseList} = this.state;

    if (expenseList.length === 0) {
      return;
    }

    const groupedByCategory = this.groupBy(expenseList, 'category');

    const mergedData = categoriesForChart.map(c => {
      const transactions = groupedByCategory[c.name] || [];
      return {
        color: c.color,
        name: c.name,
        icon: c.icon,
        transactions: transactions,
      };
    });
    return mergedData;
  };

  processCategoryDataToDisplay() {
    // filtrowanie transakcji po statusie 'potwierdzone'
    const categories = this.mergeDataWithCategories();

    if (!categories) return;

    const chartData = categories.map(item => {
      const price = item.transactions.reduce((a, b) => a + (+b.price || 0), 0);

      return {
        name: item.name,
        y: price,
        transactionsCount: item.transactions.length,
        color: item.color,
        id: item.id,
      };
    });

    // console.log("--??---",chartData)

    // odfiltrowanie kategorii bez danych/ transakcji
    let filterChartData = chartData && chartData.filter(a => a.y > 0);

    // podliczenie wydatkow
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // podliczenie procentow i dane na wykresie
    let finalChartData = filterChartData.map(item => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: +item.y,
        transactionsCount: item.transactionsCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });

    return finalChartData;
  }
  setSelectCategoryByName(name) {
    const categories = this.mergeDataWithCategories();
    if (!categories) return;

    let category = categories.filter(a => a.name == name);
    setSelectedCategory(category[0]);
  }

  renderChart() {
    let chartData = this.processCategoryDataToDisplay();
    if (!chartData) return;
    let colorScales = chartData.map(item => item.color);
    let totalTransactionsCount = chartData.reduce(
      (a, b) => a + (b.transactionsCount || 0),
      0,
    );

    const selectedCategory = CategoryEnum.FOOD; //TODO: add option to selection other
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Svg
          width={335}
          height={335}
          viewBox="0 0 335 335"
          style={{width: '100%', height: 'auto'}}>
          <VictoryPie
            standalone={false} //dla Androida
            data={chartData}
            labels={datum => `${datum.y}`}
            radius={({datum}) =>
              selectedCategory && selectedCategory.name == datum.name
                ? SIZES.width * 0.4
                : SIZES.width * 0.4 - 10
            }
            innerRadius={70}
            labelRadius={({innerRadius}) =>
              (SIZES.width * 0.4 + innerRadius) / 2.5
            }
            style={{
              labels: {fill: COLORS.black, ...FONTS.body3},
              parent: {
                ...styles.shadow,
              },
            }}
            width={SIZES.width * 0.8}
            height={SIZES.width * 0.8}
            colorScale={colorScales}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: 'labels',
                        mutation: props => {
                          let categoryName = chartData[props.index].name;
                          setSelectCategoryByName(categoryName);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </Svg>
        <View style={{position: 'absolute', top: '40%', left: '40%'}}>
          <Text style={{...FONTS.h1, textAlign: 'center'}}>
            {totalTransactionsCount}
          </Text>
          <Text style={{...FONTS.body3, textAlign: 'center'}}>Expenses</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Lista wydatków</Text>
        </View> */}
        {/* <View style={{ paddingHorizontal: 40, marginTop: 20, marginBottom: 20 }}> */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Expenses
          </Text>
        </View>
        <View>{this.renderChart()}</View>
        <FlatList
          style={styles.feed}
          data={this.state.expenseList}
          renderItem={({item}) => this.renderExpense(item)}
          // keyExtractor={item => item.id}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}></FlatList>
        {/* {this.showActionButton()} */}
        <View>{this.renderNavBar()}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green7, 
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 16,
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
    // fontSize: 20,
    // fontWeight: '500',
    fontSize: 40,
    color: COLORS.cpPINK,
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
  bottomBarContainer: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  bottomBarIcon: {
    width: 30,
    height: 30,
    tintColor: COLORS.cpPINK,
  }
});
export default ExpenseList;
