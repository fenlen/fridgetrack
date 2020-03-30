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

const UpdateDetailsModal = props => {
  const params = props.navigation.state.params;
  const [name, onChangeName] = useState(params.name);
  const [email, onEmail] = useState(params.email);

  const initUpdate = async () => {
    try {
      let user = auth().currentUser;
      await auth().currentUser.updateEmail(email);
      await firestore().doc(`users/${userId}`).update({name: name});
      Alert.alert('You have updated your details successfully');
      Global.user = user.uid;
      props.navigation.goBack();
    } catch (e) {
      let errorCode = e.code;
      let errorMessage = e.message;
      Alert.alert('Error', errorMessage);
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
          <Title>Details update</Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              value={name}
              onChangeText={content => onChangeName(content)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              value={email}
              onChangeText={content => onChangeEmail(content)}
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

export default UpdateDetailsModal;
