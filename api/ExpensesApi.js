import firestore from '@react-native-firebase/firestore';

export function updateExpense(expense, updateComplete) {
  expense.updatedAt = firestore.FieldValue.serverTimestamp();
  console.log("Updating expense");

  firestore()
    .collection('expenses')
    .doc(expense.id).set(expense)
    .then(() => updateComplete(expense))
    .catch((error) => console.log(error));
}  //do przejrzenia poprawienia etc

export function deleteExpense(expense, deleteComplete) {
  console.log(expense);

  firestore()
    .collection('expenses')
    .doc(expense.id).delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}

export function addExpense(expense, addComplete) { //obj exp i callback

  expense.createdAt =firestore.FieldValue.serverTimestamp();

  firestore()
    .collection('expenses') //kolekcja z bazy   
      .add(expense) //dodanie objektu
      .then((snapshot) => {
        expense.id = snapshot.id;
        snapshot.set(expense);
      }).then(() => addComplete(expense))
      .catch((error) => console.log(error));
  }

export function uploadExpense(expense, onExpenseUploaded, { updating }) {

    if (updating) {
      console.log("Updating....");
      updateExpense(expense, onExpenseUploaded);
    } else {
      console.log("Adding...");
      addExpense(expense, onExpenseUploaded);
    }
  }


export async function getExpenses(expensesRetreived) {

  var expensesList = [];

  var snapshot = await firestore()
    .collection('expenses')
    .orderBy('createdAt') //retrieve item in creation order
    .get()

  snapshot.forEach((doc) => {
    const expenseItem = doc.data();
    expenseItem.id = doc.id;
    expensesList.push(expenseItem); //dodanie do array
  });

  expensesRetreived(expensesList);
}
