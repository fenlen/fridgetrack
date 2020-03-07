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
            <Text>View my fridge</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("ShopList")}
          >
            <Text>View my shopping lists</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Statistics")}
          >
            <Text>View my statistics</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Account")}
          >
            <Text>View my account</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
