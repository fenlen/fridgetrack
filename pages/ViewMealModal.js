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
  Separator
} from 'native-base';
import Plenty from '../thumbnails/plenty.png';
import Soon from '../thumbnails/soon.png';
import Overdue from '../thumbnails/overdue.png';

const getThumbnail = (date) =>{
    var days = getDaysLeft(date);
      if (days > 2) {
        return Plenty;
      } else if (days >= 0) {
        return Soon;
      } else {
        return Overdue;
      }
}

const getDaysLeft = expDateString => {
  var expDate = new Date(
    parseInt(expDateString.substring(6, 8)) + 2000,
    parseInt(expDateString.substring(3, 5)) - 1,
    parseInt(expDateString.substring(0, 2)),
  );
  var diff = expDate.getTime() - new Date().getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};

const ViewMealModal = props => {
  const {params} = props.navigation.state;
  const item = params ? params.item : null;
  const removeMeal = id => {
    storageService.removeMeal(id);
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
          <Title>View Meal</Title>
        </Body>
      </Header>
      <Content>
        <Grid>
          <Row style={{padding: 10}}>
            <Left>
              <Thumbnail large source={getThumbnail(item.date)} />
            </Left>
            <Body>
              <H1>{item.name}</H1>
            </Body>
          </Row>
          <Row>
            <Col>
              <Body>
                <Text>Scheduled date: </Text>
              </Body>
            </Col>
            <Col>
              <Body>
                <Text>{item.date}</Text>
              </Body>
            </Col>
          </Row>
          <Row>
            <Col>
              <Body>
                <Text>Recipe: </Text>
              </Body>
            </Col>
            <Col>
              <Body>
                <Text>{item.recipe}</Text>
              </Body>
            </Col>
          </Row>
          {getDaysLeft(item.date)<0 ?
              <Row>
                <Col>
                  <Button
                    rounded
                    large
                    primary
                    style={{margin: 20, justifyContent: 'center'}}
                    onPress={() => storageService.removeMeal(item.id)}>
                    <Text>Skipped</Text>
                  </Button>
                </Col>
              </Row>
          :
              <Row>
                <Col>
                  <Button
                    rounded
                    large
                    primary
                    style={{margin: 20, justifyContent: 'center'}}
                    onPress={() => storageService.removeMeal(item.id)}>
                    <Text>Remove</Text>
                  </Button>
                </Col>
              </Row>
          }
        </Grid>
      </Content>
    </Container>
  );
};

export default ViewMealModal;
