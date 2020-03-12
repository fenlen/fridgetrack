import React, { useState, Component } from "react";
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
  Switch
} from "native-base";
import Global from "../state/global.js";

const Item = Picker.Item;

const NotificationsModal = props => {
  const [notif1, onValueChange1] = useState();
  const [notif2, onValueChange2] = useState();
  const [notif3, onValueChange3] = useState();
  const [notif4, onValueChange4] = useState();

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Notifications</Title>
          </Body>
          <Right>
            <Title  onPress={() => props.navigation.navigate("Theme")}>Save</Title>
          </Right>
        </Header>

        <Content>
          <ListItem>
              <Body>
                  <Text>Notify items about to expire from my fridge</Text>
              </Body>
              <Right>
                   <Switch value={notif1} trackColor="#50B948" onValueChange={value => onValueChange1(value)}/>
              </Right>
          </ListItem>
          <ListItem>
              <Body>
                  <Text>Notify expired from my fridge</Text>
              </Body>
              <Right>
                   <Switch value={notif2} trackColor="#50B948" onValueChange={value => onValueChange2(value)}/>
              </Right>
          </ListItem>
          <ListItem>
              <Body>
                  <Text>Notify items about to expire from group fridge</Text>
              </Body>
              <Right>
                   <Switch value={notif3} trackColor="#50B948" onValueChange={value => onValueChange3(value)}/>
              </Right>
          </ListItem>
          <ListItem>
              <Body>
                  <Text>Notify expored items from group fridge</Text>
              </Body>
              <Right>
                   <Switch value={notif4} trackColor="#50B948" onValueChange={value => onValueChange4(value)}/>
              </Right>
          </ListItem>
        </Content>
      </Container>
    );
};

export default NotificationsModal;
