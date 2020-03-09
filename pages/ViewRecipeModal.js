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
import Easy from '../thumbnails/easy.png';
import Medium from '../thumbnails/medium.png';
import Hard from '../thumbnails/hard.png';

const getThumbnail = (category) =>{
    switch (category) {
      case "Easy":
        return Easy;
      case "Medium":
        return Medium;
      case "Hard":
        return Hard;
    }
}

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
          <Title>View recipe</Title>
        </Body>
      </Header>
      <Content>
        <Grid>
          <Row style={{padding: 10}}>
            <Left>
              <Thumbnail large source={getThumbnail(item.level)} />
            </Left>
            <Body>
              <H1>{item.name}</H1>
            </Body>
          </Row>
          <Row>
            <Col>
              <Body>
                <Text>Required time: </Text>
              </Body>
            </Col>
            <Col>
              <Body>
                <Text>{item.duration}</Text>
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
                <Text>hehe</Text>
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

export default ViewItemModal;
