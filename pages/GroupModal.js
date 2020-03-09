import React from 'react';
import {Alert} from 'react-native';
import Style from '../components/Style';
import prompt from 'react-native-prompt-android';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  ListItem,
  Separator
} from "native-base";

const GroupModal = props => {

const JoinPrompt= () => {
      prompt(
          'Join a group',
          'Please enter the group identification code (you can get this from any member of the group).',
          [
           {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
           {text: 'Confirm', onPress: password => console.log('Entered ' + password)},
          ],
          {
              type: 'numeric',
              cancelable: false,
              defaultValue: null,
              placeholder: 'XXXXXX'
          }
      );
  };

const CreateAlert= () => {
    Alert.alert(
        'Create a group',
        'Are you sure you want to create a new group? Doing so will automatically remove you from your current group and add you to the newly created one.',
        [
         {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
         {text: 'Yes', onPress: () => console.log('Yes Pressed')},
        ],
      {cancelable: false}
    );
};

const LeaveAlert= () => {
    Alert.alert(
        'Leave a group',
        'Are you sure you want to leave the group? Once you leave you can rejoin at any time.',
        [
         {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
         {text: 'Yes', onPress: () => console.log('Yes Pressed')},
        ],
      {cancelable: false}
    );
};


const CodeAlert= () => {
   var code = '123456' //get actual code from db
   Alert.alert(
        'Get access code',
        'The code for accessing the group is: '+code
    );
};

  return (
        <Container style={Style.container}>
           <Header searchBar>
              <Left style={{flex: 0, width: 50}}>
                <Button
                  transparent
                  onPress={() => props.navigation.goBack()}
                >
                  <Icon name="arrow-back"/>
                </Button>
              </Left>
              <Body>
                <Title>Your Group</Title>
              </Body>
            </Header>
            <Content>
            <Separator bordered>
               <Text style={{fontSize: 20}}>Group Details</Text>
            </Separator>
            <ListItem>
              <Left>
                  <Text>Number of members</Text>
              </Left>
              <Right>
                  <Text>number goes here</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                  <Text>Date created</Text>
              </Left>
              <Right>
                  <Text>date goes here</Text>
              </Right>
            </ListItem>
            <Button
                primary
                rounded
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => JoinPrompt()}
            >
                <Text uppercase={false}>Join a group</Text>
            </Button>
            <Button
                primary
                rounded
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => CreateAlert()}
            >
                <Text uppercase={false}>Create a group</Text>
            </Button>
            <Button
                primary
                rounded
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => LeaveAlert()}
            >
                <Text uppercase={false}>Leave a group</Text>
            </Button>
            <Button
                primary
                rounded
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => CodeAlert()}
            >
                <Text uppercase={false}>Get access code</Text>
            </Button>

            </Content>
         </Container>
      );
    };

export default GroupModal;