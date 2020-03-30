import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {CreditCardInput} from 'react-native-credit-card-input';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  Left,
  Picker,
  ListItem,
  Separator,
  Switch,
} from 'native-base';
const Premium = props => {
  const user = firebase.auth().currentUser;
  const creditCardHandler = () => {};
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Premium</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <CreditCardInput
          requiresName={true}
          onChange={() => creditCardHandler()}
        />
      </Content>
    </Container>
  );
};

export default Premium;
