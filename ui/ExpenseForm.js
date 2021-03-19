import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button
} from 'react-native';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { addExpense, uploadExpense, updateExpense} from "../api/ExpensesApi";
import { Picker } from '@react-native-picker/picker';


const ExpenseForm = (props) => {

  return (
    <View >
      <TextInput
        value={props.values.title}
        placeholder='nazwa...'
        onChangeText={text => { props.setFieldValue('title', text) }}
      />
      <Text style={styles.validationText}> {props.errors.title}</Text>
      <TextInput
        value={props.values.category}
        placeholder='kategoria...'
        onChangeText={text => { props.setFieldValue('category', text) }}
      />
      <Text> {props.errors.category}</Text>
       <TextInput
        value={props.values.description}
        placeholder='opis...'
        onChangeText={text => { props.setFieldValue('description', text) }}
      />
      <Text> {props.errors.description}</Text>
       <TextInput
        value={props.values.price}
        placeholder='price...'
        onChangeText={text => { props.setFieldValue('price', text) }}
      />
      <Text> {props.errors.price}</Text>
      
      <Button
        title='Submit'
        onPress={() => props.handleSubmit()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
});

export default withFormik({
  mapPropsToValues: ({ expense }) => ({
    title: expense.title,
    category: expense.category,
    description: expense.description,
    price: expense.price
  }),
  enableReinitialize: true,
  validationSchema: (props) => yup.object().shape({
    title: yup.string().max(30).required(),
    category: yup.string().max(15).required(),
    description: yup.string().max(30).required(),
    price: yup.number().max(1000000).required()
  }),
  handleSubmit: (values, { props }) => {
    // console.log(props);

    // console.log(values);

    if (props.expense.id) {
      values.id = props.expense.id;
      values.createdAt = props.expense.createdAt;
      uploadExpense(values, props.onExpenseUpdated, { updating: true });
    } else {
      uploadExpense(values, props.onExpenseAdded, { updating: false });
    }
  },
})(ExpenseForm);