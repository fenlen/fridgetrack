// /* eslint-disable no-undef */
import React, {useState} from 'react';
import {Text, Button, Picker} from 'react-native';
import Style from '../components/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';

const AddItemModal = props => {
  const [pickerItems, setPicker] = useState('Cheese'); //initial state for the Picker
  const [dateState, setNewDate] = useState(new Date()); //set date to current date
  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('date'); //mode of the date picker
  const [show, setShow] = useState(false); //determines whether to show the date picker

  const params = props.navigation.state.params;

  const submit = (content, expDate) => {
    if (params.shopping) {
      storageService.submit(content, expDate, true);
    } else {
      storageService.submit(content, expDate);
    }
    params.refresh();
    goBack();
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const setDate = (event, date) => {
    console.log(date);
    date = date || dateState;
    setShow(false);
    setNewDate(date);
  };

  const formattedDate = () => {
    return (
      dateState.getDate() +
      '/' +
      (dateState.getMonth() + 1) +
      '/' +
      (dateState.getFullYear() - 2000)
    );
  };

  return (
    <>
      <Picker
        selectedValue={pickerItems}
        onValueChange={itemValue => setPicker(itemValue)}>
        <Picker.Item label="Cheese" value="Cheese" />
        <Picker.Item label="Milk" value="Milk" />
        <Picker.Item label="Eggs" value="Eggs" />
        <Picker.Item label="Butter" value="Butter" />
        <Picker.Item label="Ham" value="Ham" />
        <Picker.Item label="Yogurt" value="Yogurt" />
      </Picker>
      {!params.shopping && ( //translates to if params.shopping is false do the part after &&
        <Button
          title="Choose expiration date"
          onPress={() => showDatePicker()}
        />
      )}
      {!params.shopping && (
        <Text style={Style.date}>
          Expires on:
          {formattedDate()}
        </Text>
      )}
      {show && (
        <DateTimePicker
          value={dateState}
          mode={mode}
          display="default"
          onChange={(event, date) => setDate(event, date)}
        />
      )}
      <Button
        title="Add item"
        onPress={() => submit(pickerItems, formattedDate())}
      />

      <Button title="Back" onPress={() => goBack()} />
    </>
  );
};

export default AddItemModal;
