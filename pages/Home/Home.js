/** The first actual page the user sees when opening the App. Contains a menu that shows different items depending whether the user
 * is logged in with an account or not.
 */
import React, {useState, useEffect} from 'react';
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
} from 'native-base';
import Global from '../../state/global.js';
import auth from '@react-native-firebase/auth';

const Home = props => {
  const [state, setState] = useState();
  const user = auth().currentUser;

  useEffect(() => {
    if (user !== null) {
      setState(true);
    }
  }, [user]);

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
        {state && (
          <>
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
          </>
        )}
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
