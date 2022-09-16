render() {
    const expense = this.props.navigation.getParam('expense');

    const onExpenseDeleted = this.props.navigation.getParam('expenseDeletedCallback');

    console.log(expense);
    return (
      <View style={styles.container}>
        <View style= {styles.buttonsLayout}>
        <TouchableHighlight style={styles.buttonsStyle}>
          <Image
            reverse
            style={styles.imgStyle}
            source={icons.edit}
            resizeMode="contain"
            onPress={() =>
              this.props.navigation.navigate('ExpenseForm', {
                expense: expense
              })
            }
          />
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonsStyle}>
          <Image
            reverse
            style={styles.imgStyle}
            source={icons.trash}
            resizeMode="contain"
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
          </TouchableHighlight>
        </View>
        <Text>{expense.title}</Text>
        <Text>Kategoria: {expense.category}</Text>
        <Text>Opis: {expense.description}</Text>
        <Text>Cena: {expense.price} PLN</Text>
        <Text>Data: {expense.date}</Text>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  buttonsLayout: {
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  buttonsStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    backgroundColor: COLORS.mainGreen,
    borderRadius: 35
  },
  imgStyle: {
    width: 35,
    height: 35,
    tintColor: COLORS.cpYellow,
  }
});

export default ExpenseDetailsScreen;
