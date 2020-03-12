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
  Separator,
  FlatList
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

const ViewRecipeModal = props => {
  const {params} = props.navigation.state;
  const item = params ? params.item : null;
  const removeRecipe = id => {
    storageService.removeRecipe(id);
    props.navigation.goBack();
  };
  var list=[];
  for (const i in item.ingredients){
           list[i]=(
            <Row style={{padding: 10}}>
                <Col size={1} style={{justifyContent: 'center'}}>
                     <Icon name="square" list/>
                </Col>
                <Col size={12}>
                     <Text>{item.ingredients[i].ingredient}</Text>
                </Col>
                <Col size={7}>
                     <Text>{item.ingredients[i].quantity}</Text>
                </Col>
            </Row>);
  }


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
              <Text numberOfLines={1} note>{item.level}</Text>
            </Body>
          </Row>
          <Row style={{padding: 10}}>
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
            {list}
          <Separator bordered >
            <Text>Method</Text>
          </Separator>
          <Row style={{padding: 10}}>
            <Text>{item.method}</Text>
          </Row>
          <Row style={{padding: 10}}>
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

export default ViewRecipeModal;
