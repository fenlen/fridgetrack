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

const UpdatePasswordModal = props => {
  const [oldPassword, onChangeOldPassword] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordConfirm, onChangePasswordConfirm] = useState('');

  const update = async password => {
    auth()
      .currentUser.updatePassword(password)
      .catch(e => {
        let errorMessage = e.message;
        Alert.alert('Error', errorMessage);
      });
  };

  const initUpdate = async () => {
    try {
      let p = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/g;
      let user = auth().currentUser;
      if (!oldPassword) {
        Alert.alert('Error', ' Old Password cannot be empty');
      } else if (!password) {
        Alert.alert('Error', 'New Password cannot be empty');
      } else if (!p.test(password)) {
        Alert.alert(
          'Error',
          'The new password must be 6 to 20 characters long and contain uppercase, lowercase and numeric characters ',
        );
      } else if (password !== passwordConfirm) {
        Alert.alert('Error', 'Passwords do not match');
      } else {
        await auth().signInWithEmailAndPassword(user.email, oldPassword);
        await auth().currentUser.updatePassword(password);
        Alert.alert('You have updated you password successfully');
        Global.user = user.uid;
        props.navigation.goBack();
      }
    } catch (e) {
      let errorCode = e.code;
      let errorMessage = e.message;
      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Error', 'Wrong old password');
      } else {
        Alert.alert('Error', errorMessage);
      }
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
          <Title>Password update</Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Old Password</Label>
            <Input
              secureTextEntry
              onChangeText={content => onChangeOldPassword(content)}
            />
          </Item>
          <Item floatingLabel>
            <Label>New Password</Label>
            <Input
              secureTextEntry
              onChangeText={content => onChangePassword(content)}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Confirm new Password</Label>
            <Input
              secureTextEntry
              onChangeText={content => onChangePasswordConfirm(content)}
            />
          </Item>
        </Form>
        <Button
          rounded
          style={{margin: 15, marginTop: 50, justifyContent: 'center'}}
          onPress={() => initUpdate()}>
          <Text uppercase={false}>Update</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default UpdatePasswordModal;
