import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '../services/storage';

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

  const upgradeAccount = async () => {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({accountType: 'premium'});
    props.navigation.goBack();
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
          <Title>Premium</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Button primary rounded onPress={() => upgradeAccount()}>
          <Text uppercase={false}>Upgrade your account</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Premium;
