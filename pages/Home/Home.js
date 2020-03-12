import React from 'react';
import {StatusBar} from 'react-native';
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
} from 'native-base';
import Global from '../../state/global.js';
import Theme from '../App.js';

const Home = props => {
  const redirect = (destination, fridge) => {
    Global.fridge = fridge;
    props.navigation.navigate(destination);
  };
  return (
    <Container>
      <Header>
        <Body>
          <Title>Welcome to Fridge Plan</Title>
        </Body>
      </Header>
      <Content padder>
        <Body>
          <Text>Where do you want to go?</Text>
        </Body>
        <Button
          full
          rounded
          primary
          style={{marginTop: 10}}
          onPress={() => redirect('Fridge', Global.user.fridge)}>
          <Text uppercase={false}>Personal organizer</Text>
        </Button>
        <Button
          full
          rounded
          primary
          style={{marginTop: 10}}
          onPress={() => redirect('GroupFridge', Global.user.groupFridge)}>
          <Text uppercase={false}>Group organizer</Text>
        </Button>
        <Button
          full
          rounded
          primary
          style={{marginTop: 10}}
          onPress={() => props.navigation.navigate('Recipes')}>
          <Text uppercase={false}>Recipes</Text>
        </Button>
        <Button
          full
          rounded
          primary
          style={{marginTop: 10}}
          onPress={() => props.navigation.navigate('Meals')}>
          <Text uppercase={false}>Meals</Text>
        </Button>
        <Button
          full
          rounded
          primary
          style={{marginTop: 10}}
          onPress={() => props.navigation.navigate('Account')}>
          <Text uppercase={false}>My account</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Home;
