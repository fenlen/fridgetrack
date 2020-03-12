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
    Separator,
    Textarea
} from 'native-base';

const AddMealModal = props => {
  const [type, setPicker] = useState('Breakfast'); //initial state for the Picker
  const [recipe, setPicker1] = useState(''); //initial state for the Picker
  const [name, onChangeText] = useState('');
  const [method, onChangeText1] = useState('');
  const [dateState, setNewDate] = useState(new Date()); //set date to current date
  const [mode, setMode] = useState('date'); //mode of the date picker
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

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

var list=[];
  storageService.getAllRecipe().then(itemList => setItems(itemList));
  for (const i in items){
           console.log(items[i]);
           list.push(<Picker.Item label={items[i].name} value={items[i].name} />);
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
          <Title>Add new meal</Title>
        </Body>
      </Header>
      <Content padder>
          <Form style={{padding: 10}}>
            <Grid>
                 <Row>
                    <Col size={1} style={{justifyContent: 'center', flex:1}}>
                        <Text>Meal type:</Text>
                    </Col>
                    <Col size={2}>
                        <Picker
                          mode="dropdown"
                          selectedValue={type}
                          onValueChange={itemValue => setPicker(itemValue)}>
                          <Picker.Item label="Breakfast" value="Breakfast" />
                          <Picker.Item label="Lunch" value="Lunch" />
                          <Picker.Item label="Dinner" value="Dinner" />
                          <Picker.Item label="Snack" value="Snack" />
                        </Picker>
                     </Col>
                 </Row>
                 <Row>
                    <Col size={1} style={{justifyContent: 'center', flex:1}}>
                        <Text>Recipe:</Text>
                    </Col>
                    <Col size={2}>
                        <Picker
                          mode="dropdown"
                          selectedValue={recipe}
                          onValueChange={itemValue => setPicker1(itemValue)}>
                          {list}
                        </Picker>
                     </Col>
                 </Row>
                 <Row>
                      <Col style={{justifyContent: 'center'}}>
                            <Text>Scheduled date: {formattedDate()}</Text>
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
            title="Add meal"
            onPress={() => {
              submitMeal(type, formattedDate(), recipe);
              props.navigation.navigate('Meals');
            }}
          >
            <Title>Add meal</Title>
          </Button>
      </Footer>
    </Container>
  );
};

export default AddMealModal;
