/** Apperance settings modal. */
import React, {Component} from 'react';
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
} from 'native-base';
import Global from '../state/global.js';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Item = Picker.Item;

class AppearanceModal extends Component {
  onValueChange1(value) {
    //These 3 functions ensure immediate effect when selecting different options for appearance
    Global.colour = value;
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({colour: value});
    this.forceUpdate();
  }
  onValueChange2(value) {
    Global.font = value;
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({font: value});
    this.forceUpdate();
  }
  onValueChange3(value) {
    Global.size = value;
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({size: value});
    this.forceUpdate();
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Appearance</Title>
          </Body>
          <Right>
            <Title onPress={() => this.props.navigation.navigate('App')}>
              Save
            </Title>
          </Right>
        </Header>

        <Content>
          <Separator bordered>
            <Text>Accent colour</Text>
          </Separator>
          <ListItem icon>
            <Picker
              note
              mode="dropdown"
              style={{width: 120}}
              selectedValue={Global.colour}
              onValueChange={this.onValueChange1.bind(this)}>
              <Item label="Blue" value="Blue" />
              <Item label="Red" value="Red" />
              <Item label="Black" value="Black" />
            </Picker>
          </ListItem>
          <Separator bordered>
            <Text>Font</Text>
          </Separator>
          <ListItem icon>
            <Picker
              note
              mode="dropdown"
              style={{width: 120}}
              selectedValue={Global.font}
              onValueChange={this.onValueChange2.bind(this)}>
              <Item
                style={{fontFamily: 'roboto'}}
                label="Roboto"
                value="Roboto"
              />
              <Item
                style={{fontFamily: 'georgia'}}
                label="Georgia"
                value="Georgia"
              />
              <Item
                style={{fontFamily: 'courier'}}
                label="Courier"
                value="Courier"
              />
            </Picker>
          </ListItem>
          <Separator bordered>
            <Text>Font size</Text>
          </Separator>
          <ListItem icon>
            <Picker
              note
              mode="dropdown"
              style={{width: 120}}
              selectedValue={Global.size}
              onValueChange={this.onValueChange3.bind(this)}>
              <Item label="Small" value="Small" />
              <Item label="Medium" value="Medium" />
              <Item label="Large" value="Large" />
            </Picker>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default AppearanceModal;
