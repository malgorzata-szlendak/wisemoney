import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text, Button} from 'react-native';
import {withFormik} from 'formik';
import * as yup from 'yup';
import {addExpense, uploadExpense, updateExpense} from '../api/ExpensesApi';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import {COLORS, SIZES, icons} from '../constants';
import { TouchableHighlight } from 'react-native';

const ExpenseForm = props => {
  const [selectedValue, setValue] = useState(0);
  // const values = ['Wybierz kategorię', 'Rachunki', 'Edukacja', 'Hobby', 'Żywność', 'Leki', 'Kosmetyki', 'Odzież', 'Sport' ]
  const values = ['Select category', 'Bills', 'Education', 'Hobby', 'Food & Drink', 'Medicine', 'Beauty & Care', 'Clothing', 'Sport' ]
  
  return (
    <View style={styles.container}>
      <TextInput
        value={props.values.title}
        style={styles.longFormInput}
        placeholder="Title..."
        onChangeText={text => {
          props.setFieldValue('title', text);
        }}
      />
      <Text style={styles.validationText}> {props.errors.title}</Text>
      <Picker
          style={styles.picker}
          value={props.values.category}
          itemStyle={styles.pickerItemStyle}
          mode="dropdown"
          selectedValue={selectedValue}
          onValueChange={itemValue =>  { 
            setValue(itemValue)
            return props.setFieldValue('category', itemValue) }}
        >     
          {values
            .filter((value, index) => selectedValue === 0 ? value : index === 0 ? false : value)
            .map((value, index) => (
              <Picker.Item label={value} value={value} key={index} />
            ))}
        </Picker>
      <TextInput
        value={props.values.description}
        style={styles.longFormInput}
        placeholder="Description..."
        onChangeText={text => {
          props.setFieldValue('description', text);
        }}
      />
      <Text style={styles.validationText}> {props.errors.description}</Text>
      <TextInput
        value={props.values.price}
        style={styles.longFormInput}
        placeholder="Price..."
        onChangeText={text => {
          props.setFieldValue('price', text);
        }}
      />
      <Text style={styles.validationText}> {props.errors.price}</Text>
      <DatePicker
        value={props.values.date}
        style={styles.datePicker}
        format="DD.MM.YYYY"
        // format="DD-MM-YYYY"
        date={props.values.date}
        iconSource={icons.calendar}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 0,
            top: 4,
            marginRight: 5,
            tintColor: COLORS.cpDarkBlue,
            width: 30,
            height: 30,
          },
        }}
        placeholder="Date..."
        onDateChange={string => {
          props.setFieldValue('date', string);
        }}
      />
      <Text style={styles.validationText}> {props.errors.date}</Text>
      {/* <View  style={styles.buttonWrapper} >
      <Button 
      title="Submit"
      style={styles.buttonStyle}
      onPress={() => props.handleSubmit()} />
      </View> */}
      <TouchableHighlight
                underlayColor= "#073b4c"
                style={styles.buttonStyle}
                onPress={() => props.handleSubmit()}
               >
                   <Text style={styles.buttonText}>
                       Submit
                   </Text>
               </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32
  },
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  picker:{
    height: 50,
    width: '100%',
    
  },
  pickerItemStyle:{
    fontSize: 15,
    height: 75,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  formInput: {
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    height: 50,
    color: 'black',
    width: '75%',
    marginBottom: 16,
    marginTop: 16
  },
  validationText: {
    color: 'red'
  },
  longFormInput: {
    width: '100%',
    height: 50,
    color: 'black',
    borderColor: COLORS.odOrange,
    borderWidth: 2,
    padding: 8,
    margin: 16,
  },
  button:{
    width: '100%',
    height: 50,
    backgroundColor: COLORS.odOrange,
  },
  buttonWrapper:{
    width: '80%',
  },
  buttonText:{
    color:"#FFF",
    textAlign:"center",
    fontSize:18,
    fontWeight: 'bold',
  },
  buttonStyle:{
      width:200,
      marginLeft:5,
      elevation:2,
      marginTop:25,
      backgroundColor:"#f68800",
      paddingVertical:13,
      borderRadius:25,
      alignSelf:"center",
      elevation: 3
  },
  datePicker:{
    width: '105%',
    height: 50,
    color: 'black',
    borderColor: COLORS.odOrange,
    padding: 8,
    margin: 16
  },
});

export default withFormik({
  mapPropsToValues: ({expense}) => ({
    title: expense.title,
    category: expense.category,
    description: expense.description,
    price: expense.price,
    date: expense.date,
  }),
  enableReinitialize: true,
  validationSchema: props =>
    yup.object().shape({
      title: yup.string().max(30).required(),
      category: yup.string().max(15).required(),
      description: yup.string().max(50).required(),
      price: yup.number().max(1000000).required(),
      date: yup.string().max(10).required(),
    }),
  handleSubmit: (values, {props}) => {


    // console.log(props);

    // console.log(values);

    if (props.expense.id) {
      values.id = props.expense.id;
      values.createdAt = props.expense.createdAt;
      uploadExpense(values, props.onExpenseUpdated, {updating: true});
    } else {
      // console.log(values, "--------s")
      uploadExpense(values, props.onExpenseAdded, {updating: false});
    }
  },
})(ExpenseForm);
