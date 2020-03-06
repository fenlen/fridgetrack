import React, { Component } from "react";
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
  Separator
} from "native-base";
import Global from "../state/global.js";

const Item = Picker.Item;

class NotificationsModal extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Notifications</Title>
          </Body>
          <Right>
            <Title  onPress={() => this.props.navigation.navigate("Theme")}>Save</Title>
          </Right>
        </Header>

        <Content>
          <Text>notifications will go here</Text>
        </Content>
      </Container>
    );
  }
}

export default NotificationsModal;
