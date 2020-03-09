import React, {useState} from 'react';
import Style from '../components/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Body,
  Content,
  Icon,
  Title,
  Text,
  Form,
  Item,
  Label,
  Input
} from 'native-base';

const RegisterModal = props => {

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Register</Title>
        </Body>
      </Header>
      <Content>
        <Form>
            <Item inlineLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item inlineLabel>
               <Label>Password</Label>
               <Input  secureTextEntry/>
            </Item>
            <Item inlineLabel last>
              <Label>Confirm Password</Label>
              <Input  secureTextEntry/>
            </Item>
        </Form>
        <Button
            rounded
            style={{ margin: 15, marginTop: 50, justifyContent: 'center' }}
             onPress={() => {}}
        >
            <Text uppercase={false}>Register</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default RegisterModal;
