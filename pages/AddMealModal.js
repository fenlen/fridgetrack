// /* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
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
  const [groupItems, setGroupItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [list, setList]= useState([]);
  const [wait, setWait]= useState(true);

  useEffect(  () => {
      //executes on initial component render
      getPickerList();
    }, []);

  const getPickerList = async () => {
      var list=[];
      var formattedList=[];
      var items=[];
      var groupItems=[];
      var recipes=[];
      var count=0;
      var size=0;
      var found=false;
      await Promise.all([
          storageService.getAll(),//.then(itemList => setItems(itemList)),
          storageService.getAll('',true),//.then(itemList => setGroupItems(itemList)),
          storageService.getAllRecipe()//.then(recipeList => setRecipes(recipeList))
      ]).then(function(values) {
          items=values[0];
          groupItems=values[1];
          recipes=values[2];
          });
      for (const i in recipes){
          count=0;
          size=0;
          for (const j in recipes[i].ingredients){
               found=false;
               for (const k in items)
                   if (items[k].name == recipes[i].ingredients[j].ingredient)
                        found=true;
               for (const k in groupItems)
                   if (groupItems[k].name == recipes[i].ingredients[j].ingredient)
                        found=true;
               if (found)
                   count++;
               size++;
               }
           list.push({code:<Picker.Item label={recipes[i].name+' ('+count/size*100+'% of ingredients)' } value={recipes[i].name} />, completion: count/size});
      };

      function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const A = a.completion
        const B = b.completion

        let comparison = 0;
        if (A < B) {
          comparison = 1;
        } else if (A > B) {
          comparison = -1;
        }
        return comparison;
      }

      list.sort(compare);
      for (const i in list)
        formattedList.push(list[i].code);
      setList(formattedList);
      setWait(false);

  }

  const showDatePicker = () => {
    setShow(true);
  };

  const setDate = (event, date) => {
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
    <>
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
      {!wait && (
      <>
      {list.length==0 && (
      <Content padder>
        <Text>You have no saved recipes, you need at least one recipe in order to plan a meal. Please create a recipe and come back.</Text>
      </Content>
      )}
      {list.length>0 &&(
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
      )}
    </>
    )}
    {wait &&(<Content/>)}
      <Footer>
          <Button
            primary
            full
            title="Add meal"
            onPress={() => {
              storageService.submitMeal(type, formattedDate(), recipe);
              props.navigation.navigate('Meals');
            }}
          >
            <Title>Add meal</Title>
          </Button>
      </Footer>
    </Container>
    </>
  );
};

export default AddMealModal;
