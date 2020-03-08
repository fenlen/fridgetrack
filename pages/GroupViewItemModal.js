// /* eslint-disable no-undef */
import React, {useState} from 'react';
import Style from '../components/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Body,
  Content,
  Grid,
  Col,
  List,
  ListItem,
  Icon,
  Title,
  Text,
  Row,
  Thumbnail,
  H1,
  H3,
} from 'native-base';
import Dairy from '../thumbnails/Dairy.png'; //icons from https://creativetacos.com/healthy-food-icons/
import Vegetable from '../thumbnails/Vegetable.png';
import Fruit from '../thumbnails/Fruit.png';
import Grain from '../thumbnails/Grain.png';
import Meat from '../thumbnails/Meat.png';

const getThumbnail = category => {
  switch (category) {
    case 'Dairy':
      return Dairy;
    case 'Vegetable':
      return Vegetable;
    case 'Fruit':
      return Fruit;
    case 'Grain':
      return Grain;
    case 'Meat':
      return Meat;
  }
};

const GroupViewItemModal = props => {
  const {params} = props.navigation.state;
  const item = params ? params.item : null;
  const removeItem = id => {
    storageService.remove(id);
    props.navigation.goBack();
  };
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Group View item</Title>
        </Body>
      </Header>
      <Content>
        <Grid>
          <Row style={{padding: 10}}>
            <Left>
              <Thumbnail large source={getThumbnail(item.category)} />
            </Left>
            <Body>
              <H1>{item.name}</H1>
            </Body>
          </Row>
          <Row>
            <Col>
              <Body>
                <Text>Expiry date: </Text>
              </Body>
            </Col>
            <Col>
              <Body>
                <Text>{item.expDate}</Text>
              </Body>
            </Col>
          </Row>
          <Row>
            <Col>
              <Body>
                <Text>Amount left: </Text>
              </Body>
            </Col>
            <Col>
              <Body>
                <Text>amount data</Text>
              </Body>
            </Col>
          </Row>
          <Row>
            <Col>
              <Body>
                <Text>Category:</Text>
              </Body>
            </Col>
            <Col>
              <Body>
                <Text>{item.category}</Text>
              </Body>
            </Col>
          </Row>
          <Row>
            <Body>
              <Text>Progress bar goes here</Text>
            </Body>
          </Row>
          <Row>
            <Col>
              <Button
                rounded
                large
                primary
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => removeItem(item.id)}>
                <Text>Eaten</Text>
              </Button>
            </Col>
            <Col>
              <Button
                rounded
                large
                primary
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => removeItem(item.id)}>
                <Text>Discarted</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default GroupViewItemModal;
