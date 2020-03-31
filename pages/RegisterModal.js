import React, {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
  Separator,
  View,
} from 'native-base';
import Global from '../state/global';
import {CreditCardInput} from 'react-native-credit-card-input';

const RegisterModal = props => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPass, onChangeConfirm] = useState('');
  const [name, onChangeName] = useState('');

  const register = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      let errorCode = e.code;
      let errorMessage = e.message;
      if (errorCode === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Email is already in use');
      } else {
        Alert.alert('Error', errorMessage);
      }
    }
  };
  const initRegister = async () => {
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let p = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/g;
    if (!email) {
      Alert.alert('Error', 'Email cannot be empty');
    } else if (!re.test(email.toLowerCase())) {
      Alert.alert('Error', 'Email is wrongly formatted');
    } else if (!name) {
      Alert.alert('Error', 'Name cannot be empty');
    } else if (!password) {
      Alert.alert('Error', 'Password cannot be empty');
    } else if (!p.test(password)) {
      Alert.alert(
        'Error',
        'Password must be 6 to 20 characters long and contain uppercase, lowercase and numeric characters ',
      );
    } else if (password !== confirmPass) {
      Alert.alert('Error', 'Passwords do not match');
    } else {
      await register(email, password);
      let user = auth().currentUser;
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          userId: user.uid,
          joinDate: user.metadata.creationTime,
          email: user.email,
          name: name,
          groupFridge: '',
          accountType: 'basic',
          colour: 'Blue',
          font: 'Roboto',
          size: 'Medium',
          enableNotification1: true,
          enableNotification2: true,
          enableNotification3: true,
          enableNotification4: true,
        });
      Alert.alert('You have registered successfully');
      Global.user = user.uid;
      props.navigation.navigate('Theme');
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
        <Separator bordered>
           <Text>User Details</Text>
        </Separator>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={content => onChangeEmail(content)} />
          </Item>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input onChangeText={content => onChangeName(content)} />
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
        <Separator bordered style={{marginTop:10, marginBottom:10}}>
           <Text>Payment Details</Text>
        </Separator>
        <CreditCardInput requiresName={true} verticalInput={true} onChange={() => {}}/>
        <Separator bordered style={{marginTop:20}}>
           <Text>Disclaimer</Text>
        </Separator>
        <Text style={{padding: 10}}>Our application is based on a subscription system.
            By registering and providing the information above you agree to set up an automated
            monthly payment. This can be canceled at any time by deleting your account.</Text>
        <Button
          rounded
          style={{margin: 15, marginTop: 30, justifyContent: 'center'}}
          onPress={() => initRegister()}>
          <Text uppercase={false}>Register</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default RegisterModal;
