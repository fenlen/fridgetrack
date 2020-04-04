// /* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Style from '../components/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';
import {TextInput} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Form,
  Text,
  Picker,
  Button,
  Item,
  Label,
  Input,
  Content,
  Container,
  Title,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Row,
  Col,
  Footer,
  Grid,
} from 'native-base';

const GroupAddItemModal = props => {
  const [pickerItems, setPicker] = useState('Dairy'); //initial state for the category Picker
  const [pickerUnits, setPicker2] = useState('g'); //initial state for the unit Picker
  const [dateState, setNewDate] = useState(new Date()); //set date to current date
  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('date'); //mode of the date picker
  const [show, setShow] = useState(false); //determines whether to show the date picker
  const [name, onChangeText] = useState('');
  const [quantity, onChangeText2] = useState('');
  const [ready, setReady] = useState();

  const params = props.navigation.state.params;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (params.barcode!=null) {
        var item;
        await Promise.all([
            storageService.getBarcode(params.barcode)
        ]).then(function(values) {
            item=values[0];
              });
        if (item) {
            onChangeText(item.name);
            onChangeText2(item.quantity);
            setPicker(item.category);
            setPicker2(item.unit);
        } else {
            Alert.alert("Barcode not found, please introduce the item information.");
        }
    }
    setReady(true);
  };

  const submit = (name, category, expDate, quantity, unit) => {
    const numbers = /^[0-9]+$/;
    if(!name) {
        Alert.alert("The item must have a name");
    } else if (!quantity) {
        Alert.alert("Please introduce a quantity for your item");
    } else if (!numbers.test(quantity)) {
        Alert.alert("The quantity must be a number");
    } else if (quantity=="0") {
        Alert.alert('Quantity can not be 0');
    } else if (params.shopping) {
      storageService.submit(
        name,
        category,
        expDate,
        quantity,
        unit,
        true,
        true,
      );
      params.refresh();
      props.navigation.navigate('GroupShopList');
    } else {
      storageService.submit(
        name,
        category,
        expDate,
        quantity,
        unit,
        false,
        true,
      );
        if (params.barcode!=null)
            storageService.submitBarcode(name, category, params.barcode, quantity, unit);
      props.navigation.navigate('GroupFridge');
    }
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
      ('0' + dateState.getDate()).slice(-2) +
      '/' +
      ('0' + (dateState.getMonth() + 1)).slice(-2) +
      '/' +
      (dateState.getFullYear() - 2000)
    );
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.navigate('GroupFridge')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Add an item</Title>
        </Body>
      </Header>
      <Content padder>
        <Form>
          <Item rounded>
            <Input
              placeholder={props.data || 'Item name'}
              onChangeText={name => onChangeText(name)}
              value={name}
            />
          </Item>
          <Grid>
            <Row>
              <Col>
                <Item rounded>
                  <Input
                    placeholder={props.data || 'Quantity'}
                    keyboardType="numeric"
                    onChangeText={quantity => onChangeText2(quantity)}
                    value={quantity}
                  />
                </Item>
              </Col>
              <Col>
                <Picker
                  mode="dropdown"
                  selectedValue={pickerUnits}
                  onValueChange={itemValue => setPicker2(itemValue)}>
                  <Picker.Item label="g" value="g" />
                  <Picker.Item label="ml" value="ml" />
                  <Picker.Item label="l" value="l" />
                  <Picker.Item label="pcs" value="pcs" />
                </Picker>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  justifyContent: 'center',
                  lignItems: 'center',
                  flex: 1,
                }}>
                <Text>Category:</Text>
              </Col>
              <Col>
                <Picker
                  mode="dropdown"
                  selectedValue={pickerItems}
                  onValueChange={itemValue => setPicker(itemValue)}>
                  <Picker.Item label="Dairy" value="Dairy" />
                  <Picker.Item label="Vegetable" value="Vegetable" />
                  <Picker.Item label="Fruit" value="Fruit" />
                  <Picker.Item label="Grain" value="Grain" />
                  <Picker.Item label="Meat" value="Meat" />
                  <Picker.Item label="Drink" value="Drink" />
                  <Picker.Item label="Sauce" value="Sauce" />
                  <Picker.Item label="Ready Meal" value="Ready Meal" />
                  <Picker.Item label="Cooked Meal" value="Cooked Meal" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </Col>
            </Row>
            {!params.shopping && ( //translates to if params.shopping is false do the part after &&
              <>
                <Row>
                  <Col style={{justifyContent: 'center'}}>
                    <Text>Use by/Best by: {formattedDate()}</Text>
                  </Col>
                  <Col>
                    <Button
                      primary
                      rounded
                      style={{justifyContent: 'center'}}
                      onPress={() => showDatePicker()}>
                      <Text uppercase={false}>Change</Text>
                    </Button>
                  </Col>
                </Row>
                <Row style={{justifyContent: 'center'}}>
                  <Button
                    rounded
                    primary
                    style={{margin: 20, flex: 0.7, justifyContent: 'center'}}
                    onPress={() => props.navigation.navigate('Barcode',params)}>
                    <Text uppercase={false}>Scan barcode</Text>
                  </Button>
                </Row>
              </>
            )}
          </Grid>
        </Form>
        {show && (
          <DateTimePicker
            value={dateState}
            minimumDate={new Date()}
            maximumDate={
              new Date(
                dateState.getFullYear() + 1,
                dateState.getMonth(),
                dateState.getDate(),
              )
            }
            mode={mode}
            display="default"
            onChange={(event, date) => setDate(event, date)}
          />
        )}
      </Content>
      <Footer>
        <Button
          primary
          full
          title="Add item"
          onPress={() => {
            submit(
              name,
              pickerItems,
              formattedDate(),
              quantity,
              pickerUnits,
            );
          }}>
          <Title>Add item</Title>
        </Button>
      </Footer>
    </Container>
  );
};

export default GroupAddItemModal;
