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

class AppearanceModal extends Component {
  onValueChange1(value: string) {
    Global.colour=value;
    this.forceUpdate();
  }
  onValueChange2(value: string) {
      Global.font=value;
      this.forceUpdate();
    }
  onValueChange3(value: string) {
      Global.size=value;
      this.forceUpdate();
    }
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
            <Title>Appearance</Title>
          </Body>
          <Right>
            <Title  onPress={() => this.props.navigation.navigate("Theme")}>Save</Title>
          </Right>
        </Header>

        <Content>
          <Separator bordered>
              <Text style={{fontSize: 20}}>Accent colour</Text>
          </Separator>
          <ListItem icon>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={Global.colour}
                onValueChange={this.onValueChange1.bind(this)}
              >
                <Item label="Blue" value="Blue" />
                <Item label="Red" value="Red" />
                <Item label="Black" value="Black" />
              </Picker>
          </ListItem>
          <Separator bordered>
              <Text style={{fontSize: 20}}>Font</Text>
          </Separator>
          <ListItem icon>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={Global.font}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Item label="Default" value="Default" />
                <Item label="Font1" value="Font1" />
                <Item label="Font2" value="Font2" />
              </Picker>
          </ListItem>
          <Separator bordered>
              <Text style={{fontSize: 20}}>Font size</Text>
          </Separator>
          <ListItem icon>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={Global.size}
                onValueChange={this.onValueChange3.bind(this)}
              >
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
