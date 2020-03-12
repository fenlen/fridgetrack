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

const AddRecipeModal = props => {
  const [level, setPicker] = useState('Easy'); //initial state for the Picker
  const [name, onChangeText] = useState('');
  const [method, onChangeText1] = useState('');
  const [duration, onChangeText2] = useState('');

  const [inputFields, setInputFields] = useState([
    { ingredient: '', quantity: '' }
  ]);
  //dynamic fields adapted from https://dev.to/fuchodeveloper/dynamic-form-fields-in-react-1h6c
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ ingredient: '', quantity: '' });
    setInputFields(values);
  };

  const handleRemoveFields = () => {
    const values = [...inputFields];
    values.pop();
    setInputFields(values);
  };

  const handleInputChange1 = (index, ing) => {
    const values = [...inputFields];
    values[index].ingredient = ing;
    setInputFields(values);
  };

  const handleInputChange2 = (index, qty) => {
    const values = [...inputFields];
    values[index].quantity = qty;
    setInputFields(values);
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
          <Title>Add new recipe</Title>
        </Body>
      </Header>
      <Content>
          <Separator bordered >
            <Text>Recipe Details</Text>
          </Separator>
          <Form style={{padding: 10}}>
            <Item rounded>
                 <Input
                    placeholder='Recipe name'
                    onChangeText={name => onChangeText(name)}
                    value={name}/>
            </Item>
            <Grid>
                 <Row>
                    <Col style={{justifyContent: 'center', flex:1}}>
                        <Text>Difficulty level:</Text>
                    </Col>
                    <Col>
                        <Picker
                          mode="dropdown"
                          selectedValue={level}
                          onValueChange={itemValue => setPicker(itemValue)}>
                          <Picker.Item label="Easy" value="Easy" />
                          <Picker.Item label="Medium" value="Medium" />
                          <Picker.Item label="Hard" value="Hard" />
                        </Picker>
                     </Col>
                 </Row>
                 <Row>
                    <Col style={{justifyContent: 'center', flex:1}}>
                        <Text>Duration:</Text>
                    </Col>
                    <Col>
                        <Item rounded>
                             <Input
                                placeholder='Duration'
                                onChangeText={duration => onChangeText2(duration)}
                                value={duration}/>
                        </Item>
                     </Col>
                 </Row>
             </Grid>
            </Form>
            <Separator bordered >
              <Text>Ingredients</Text>
            </Separator>
            <Form style={{padding: 10}}>
                {inputFields.map((inputField, index) => (
                <>
                    <Row style={{paddingBottom: 5}}>
                        <Col size={1} style={{justifyContent: 'center'}}>
                            <Icon name="square" list/>
                        </Col>
                        <Col size={12}>
                            <Item rounded>
                                 <Input
                                    placeholder="New ingredient"
                                    value={inputField.ingredient}
                                    onChangeText={ing => handleInputChange1(index, ing)}
                                 />
                            </Item>
                        </Col>
                        <Col size={7}>
                            <Item rounded>
                                 <Input
                                    placeholder="Quantity"
                                    value={inputField.quantity}
                                    onChangeText={qty => handleInputChange2(index, qty)}
                                 />
                            </Item>
                        </Col>
                    </Row>
                </>
                ))}
                <Row>
                    <Col/>
                    <Col>
                        <Button
                           primary
                           rounded
                           style={{justifyContent: 'center'}}
                           onPress={() => handleAddFields()}
                        >
                           <Icon name="add"/>
                        </Button>
                    </Col>
                    <Col/>
                    <Col>
                        <Button
                           primary
                           rounded
                           style={{justifyContent: 'center'}}
                           onPress={() => handleRemoveFields()}
                        >
                           <Icon name="remove"/>
                        </Button>
                    </Col>
                    <Col/>
                 </Row>
            </Form>
            <Separator bordered >
               <Text>Method</Text>
            </Separator>
            <Form>
                <Textarea
                    rowSpan={5}
                    bordered
                    placeholder="You start by....."
                    onChangeText={method => onChangeText1(method)}/>
            </Form>
      </Content>
      <Footer>
          <Button
            primary
            full
            title="Add recipe"
            onPress={() => {
              storageService.submitRecipe(name, level, duration, inputFields, method);
              props.navigation.navigate('Recipes');
            }}
          >
            <Title>Add recipe</Title>
          </Button>
      </Footer>
    </Container>
  );
};

export default AddRecipeModal;
