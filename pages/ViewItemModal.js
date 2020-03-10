/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
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
import {View} from 'react-native';
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

const getPeriod = (initDateString, expDateString) => {
  var initDate = new Date(parseInt(initDateString));
  var expDate = new Date(
    parseInt(expDateString.substring(6, 8)) + 2000,
    parseInt(expDateString.substring(3, 5)) - 1,
    parseInt(expDateString.substring(0, 2)),
  );
  var diff = expDate.getTime() - initDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};

const getDaysLeft = expDateString => {
  var expDate = new Date(
    parseInt(expDateString.substring(6, 8)) + 2000,
    parseInt(expDateString.substring(3, 5)) - 1,
    parseInt(expDateString.substring(0, 2)),
  );
  var diff = expDate.getTime() - new Date().getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};

const getBarColour = expDateString => {
  var days = getDaysLeft(expDateString);
  if (days > 2) {
    return '#5cb85c';
  } else if (days >= 0) {
    return '#f0ad4e';
  } else {
    return '#d9534f';
  }
};

const getProgress = (initDateString, expDateString) => {
  var period = getPeriod(initDateString, expDateString);
  var left = getDaysLeft(expDateString);
  console.log(period);
  console.log(left);
  var percentage = ((period - left) * 80) / period + 10;
  console.log(percentage);
  if (percentage > 90) {
    return '100%';
  } else {
    return percentage.toString() + '%';
  }
};

const formattedDate = dateString => {
  var date = new Date(parseInt(dateString));
  return (
    ('0' + date.getDate()).slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    (date.getFullYear() - 2000)
  );
};

const ViewItemModal = props => {
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
          <Title>View item</Title>
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
                <Text>Added date: </Text>
              </Body>
            </Col>
            <Col>
              <Body>
                <Text>{formattedDate(item.id)}</Text>
              </Body>
            </Col>
          </Row>
          <Row>
            <Col>
              <Body>
                <Text>Quantity: </Text>
              </Body>
            </Col>
            <Col>
              <Body>
                <Text>{item.quantity}</Text>
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
            <Col>
              <Body>
                <Text style={{paddingTop: 10}}>
                  The item has {getDaysLeft(item.expDate)} days left.
                </Text>
              </Body>
            </Col>
          </Row>
          <Row>
            <View style={Style.daysBar}>
              <View
                style={{
                  backgroundColor: getBarColour(item.expDate),
                  height: 16,
                  width: getProgress(item.id, item.expDate),
                  borderRadius: 8,
                }}
              />
            </View>
          </Row>
          <Row>
            <Col>
              <Button
                rounded
                primary
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => removeItem(item.id)}>
                <Text uppercase={false}>Eaten</Text>
              </Button>
            </Col>
            <Col>
              <Button
                rounded
                primary
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => removeItem(item.id)}>
                <Text uppercase={false}>Discarted</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default ViewItemModal;
