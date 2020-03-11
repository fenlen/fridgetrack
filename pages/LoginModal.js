import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import Global from '../state/global';
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
  Input,
} from 'native-base';

const LoginModal = props => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const login = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .catch(e => {
        let errorCode = e.code;
        let errorMessage = e.message;
        if (errorCode === 'auth/invalid-email') {
          Alert.alert('Error', 'Invalid Email');
        } else if (errorCode === 'auth/user-not-found') {
          Alert.alert('Error', 'User not found');
        } else if (errorCode === 'auth/wrong-password') {
          Alert.alert('Error', 'Wrong password');
        } else {
          Alert.alert('Error', errorMessage);
        }
      });
    let user = auth().currentUser;
    if (user) {
      Global.user = user.uid;
    }
    Alert.alert('You have logged in successfully');
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
          <Title>Log in</Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={content => onChangeEmail(content)} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={content => onChangePassword(content)}
            />
          </Item>
        </Form>
        <Button
          rounded
          style={{margin: 15, marginTop: 50, justifyContent: 'center'}}
          onPress={() => login()}>
          <Text uppercase={false}>Log in</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default LoginModal;
