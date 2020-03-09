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

const LoginModal = props => {

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Log in</Title>
        </Body>
      </Header>
      <Content>
        <Form>
            <Item inlineLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input  secureTextEntry/>
            </Item>
        </Form>
        <Button
            rounded
            style={{ margin: 15, marginTop: 50, justifyContent: 'center' }}
             onPress={() => {}}
        >
            <Text uppercase={false}>Log in</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default LoginModal;
