import React, { Component } from "react";
import { Image } from "react-native";
import auth from '@react-native-firebase/auth';
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
import Global from '../../state/global.js';

var datas = [
  {
    name: "Personal",
    route: "Fridge",
    icon: "person",
    prop: Global.user.fridge,
  },
  {
    name: "Group",
    route: "GroupFridge",
    icon: "people",
    prop: Global.user.groupFridge,
  },
  {
    name: "Recipes",
    route: "Recipes",
    icon: "bookmarks",
    prop: null,
  },
  {
    name: "Meals",
    route: "Meals",
    icon: "list",
    prop: null,
  },
  {
    name: "Account",
    route: "Account",
    icon: "settings",
    prop: null,
  }
];

const datasUnreg = [
  {
    name: "Personal",
    route: "Fridge",
    icon: "person",
    prop: Global.user.fridge,
  },
  {
    name: "Account",
    route: "Account",
    icon: "settings",
    prop: null,
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      logged: false
    }
  };

  componentDidMount() {
    if (auth().currentUser == null)
        datas=datasUnreg;
    };

  redirect(destination, fridge) {
    Global.fridge = fridge;
    this.props.navigation.navigate(destination);
  };

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
                onPress={() => {
                    if(data.prop!=null)
                        this.redirect(data.route, data.prop);
                    else
                        this.props.navigation.navigate(data.route);
                }}
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
