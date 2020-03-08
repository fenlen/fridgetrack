import React from 'react';
import SubmitButton from '../components/SubmitButton';
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
  Body
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
                <Title>Statistics</Title>
              </Body>
            </Header>
            <Content padder>
            <Text>Statistics go here</Text>
            </Content>
            <Footer>
             <FooterTab>
                 <Button onPress={() => props.navigation.navigate("Fridge")}>
                   <Icon active name="pizza" />
                   <Text>Fridge</Text>
                 </Button>
                 <Button onPress={() => props.navigation.navigate("Shoplist")}>
                   <Icon name="basket" />
                   <Text>Shopping list</Text>
                 </Button>
                 <Button active>
                   <Icon name="pie" />
                   <Text>Statistics</Text>
                 </Button>
              </FooterTab>
            </Footer>
         </Container>
      );
    };

export default Statistics;