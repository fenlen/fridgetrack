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
    Grid
} from 'native-base';

const AddItemModal = props => {
  const [level, setPicker] = useState('Easy'); //initial state for the category Picker
  const [name, onChangeText] = useState('');

  const submit = (name, level) => {

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
      <Content padder>
          <Form>
            <Item rounded>
                 <Input
                    placeholder={props.data || 'Recipe name'}
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
             </Grid>
          </Form>
      </Content>
      <Footer>
          <Button
            primary
            full
            title="Add item"
            onPress={() => {
              submit(name, level);
            }}
          >
            <Title>Add recipe</Title>
          </Button>
      </Footer>
    </Container>
  );
};

export default AddItemModal;
