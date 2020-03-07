import React from 'react';
import Style from '../components/Style';
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

const Statistics = props => {
  return (
        <Container style={Style.container}>
           <Header searchBar>
              <Left style={{flex: 0, width: 50}}>
                <Button
                  transparent
                  onPress={() => props.navigation.openDrawer()}
                >
                  <Icon name="menu"/>
                </Button>
              </Left>
              <Body>
                <Title>Your account</Title>
              </Body>
            </Header>
            <Content>
            <Separator bordered>
               <Text style={{fontSize: 20}}>Account Details</Text>
            </Separator>
            <ListItem>
              <Left>
                  <Text>UserID</Text>
              </Left>
              <Right>
                  <Text>id goes here</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                  <Text>Account type</Text>
              </Left>
              <Right>
                  <Text>type goes here</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                  <Text>Date joined</Text>
              </Left>
              <Right>
                  <Text>date goes here</Text>
              </Right>
            </ListItem>
            <Separator bordered>
               <Text style={{fontSize: 20}}>Preferences</Text>
            </Separator>
            <ListItem onPress={() => props.navigation.navigate('AppearanceModal')}>
              <Left>
                  <Text>Appearance settings</Text>
              </Left>
            </ListItem>
            <ListItem onPress={() => props.navigation.navigate('NotificationsModal')}>
              <Left>
                  <Text>Notification settings</Text>
              </Left>
            </ListItem>
            </Content>
         </Container>
      );
    };

export default Statistics;