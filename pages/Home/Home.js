import React from "react";
import { StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";
import Global from "../../state/global.js";
import Theme from "../App.js"

export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Welcome to Fridge App</Title>
          </Body>
        </Header>
        <Content padder>
          <Body>
                <Text>Where do you wanna go?</Text>
          </Body>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Fridge")}
          >
            <Text uppercase={false}>Personal organizer</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("GroupFridge")}
          >
            <Text uppercase={false}>Group organizer</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Recipes")}
          >
            <Text uppercase={false}>Recipes</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Account")}
          >
            <Text uppercase={false}>My account</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
