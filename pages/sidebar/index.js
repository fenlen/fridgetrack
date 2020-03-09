import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./style";

const datas = [
  {
    name: "Personal",
    route: "Fridge",
    icon: "person"
  },
  {
    name: "Group",
    route: "GroupFridge",
    icon: "people"
  },
  {
    name: "Account",
    route: "Account",
    icon: "settings"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon name={data.icon} />
                    <Text style={styles.text}>{data.name}</Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
