// /* eslint-disable no-undef */
import React, {useState} from 'react';
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

  const params = props.navigation.state.params;

  const submit = (name, category, expDate, barcode, quantity, unit) => {
    if (params.shopping) {
      storageService.submit(
        name,
        category,
        expDate,
        barcode,
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
        barcode,
        quantity,
        unit,
        false,
        true,
      );
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
      dateState.getDate() +
      '/' +
      (dateState.getMonth() + 1) +
      '/' +
      (dateState.getFullYear() - 2000)
    );
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Add an item *group*</Title>
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
                    onPress={() => {}}>
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
            minimumDate={dateState}
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
              params.barcode,
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
