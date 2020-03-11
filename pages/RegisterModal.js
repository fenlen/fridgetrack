import React, {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
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

const RegisterModal = props => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPass, onChangeConfirm] = useState('');

  const register = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e.message);
    }
  };
  const initRegister = () => {
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let p = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/g;
    var pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!email) {
      Alert.alert('Error', 'Email cannot be empty');
    } else if (!re.test(email.toLowerCase())) {
      Alert.alert('Error', 'Email is wrongly formatted');
    } else if (!password) {
      Alert.alert('Error', 'Password cannot be empty');
    } else if (!p.test(password)) {
      Alert.alert('Error', 'Password must be 6 to 20 characters long and contain uppercase, lowercase and numeric characters ')
    } else if (password !== confirmPass) {
      Alert.alert('Error', 'Passwords do not match');
    } else {
      register(email, password);
      Alert.alert('You have registered successfully');
      props.navigation.goBack();
    }
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
          <Title>Register</Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={content => onChangeEmail(content)} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={content => onChangePassword(content)}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Confirm Password</Label>
            <Input
              secureTextEntry
              onChangeText={content => onChangeConfirm(content)}
            />
          </Item>
        </Form>
        <Button
          rounded
          style={{margin: 15, marginTop: 50, justifyContent: 'center'}}
          onPress={() => initRegister()}>
          <Text uppercase={false}>Register</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default RegisterModal;
