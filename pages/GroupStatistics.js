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
  Body,
  Grid,
  Row,
  Col
} from "native-base";

const GroupStatistics = props => {
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
                <Title>Group Statistics</Title>
              </Body>
            </Header>
            <Grid>
                <Row style={{ backgroundColor: '#293b9e' }}>
                </Row>
                <Row>
                    <Col style={{ backgroundColor: '#635DB7' }}></Col>
                    <Col style={{ backgroundColor: '#00CE9F' }}></Col>
                </Row>
            </Grid>
            <Footer>
             <FooterTab>
                 <Button onPress={() => props.navigation.navigate("GroupFridge")}>
                   <Icon active name="pizza" />
                   <Text>Fridge</Text>
                 </Button>
                 <Button onPress={() => props.navigation.navigate("GroupShopList")}>
                   <Icon name="basket" />
                   <Text>Shop list</Text>
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

export default GroupStatistics;