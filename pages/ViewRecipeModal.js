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
          <Separator bordered >
            <Text>Ingredients</Text>
          </Separator>
          <Row>
            <Text>Ingredient list goes here</Text>
          </Row>
          <Separator bordered >
            <Text>Method</Text>
          </Separator>
          <Row>
            <Text>Method goes here</Text>
          </Row>
          <Row>
            <Col>
              <Button
                rounded
                large
                primary
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => removeRecipe(item.id)}>
                <Text>Remove</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default ViewItemModal;
