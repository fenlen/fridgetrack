// /* eslint-disable no-undef */
import React, {useState} from 'react';
import {Alert} from 'react-native';
import Style from '../components/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';
import {createStackNavigator} from 'react-navigation-stack';
import NotifService from '../services/NotifService';
import Prompt from 'react-native-input-prompt';
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
import Drink from '../thumbnails/Drink.png';
import Sauce from '../thumbnails/Sauce.png';
import ReadyMeal from '../thumbnails/ReadyMeal.png';
import CookedMeal from '../thumbnails/CookedMeal.png';
import Other from '../thumbnails/Other.png';

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
    case 'Drink':
      return Drink;
    case 'Sauce':
      return Sauce;
    case 'Ready Meal':
      return ReadyMeal;
    case 'Cooked Meal':
      return CookedMeal;
    case 'Other':
      return Other;
  }
};

const getPeriod = (initDateString, expDateString) => {
  let initDate = new Date(parseInt(initDateString));
  let expDate = new Date(
    parseInt(expDateString.substring(6, 8)) + 2000,
    parseInt(expDateString.substring(3, 5)) - 1,
    parseInt(expDateString.substring(0, 2)),
  );
  let diff = expDate.getTime() - initDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};

const getDaysLeft = expDateString => {
  let expDate = new Date(
    parseInt(expDateString.substring(6, 8)) + 2000,
    parseInt(expDateString.substring(3, 5)) - 1,
    parseInt(expDateString.substring(0, 2)),
  );
  let diff = expDate.getTime() - new Date().getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};

const getBarColour = expDateString => {
  let days = getDaysLeft(expDateString);
  if (days > 2) return '#5cb85c';
  else if (days >= 0) return '#f0ad4e';
  else return '#d9534f';
};

const getProgress = (initDateString, expDateString) => {
  let period = getPeriod(initDateString, expDateString);
  let left = getDaysLeft(expDateString);
  let percentage = ((period - left) * 80) / period + 10;
  if (percentage > 90 || left < 0 ){
    return '100%';
  } else {
    return percentage.toString() + '%';
  }
};

const formattedDate = dateString => {
  let date = new Date(parseInt(dateString));
  return (
    ('0' + date.getDate()).slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    (date.getFullYear() - 2000)
  );
};

const getDaysMessage = expDate => {
  var days = getDaysLeft(expDate);
  if (days < 0) {
    return 'the item expired '+ (0-days) +' days ago';
  } else {
    return 'The item has ' + days + ' days left.';
  }
};

const GroupViewItemModal = props => {
  const {params} = props.navigation.state;
  const item = params ? params.item : null;
  const [visible, setVisible] = useState(false);
  const [disc, setDisc] = useState(false);
  const [left, setLeft] = useState(item.quantity);

  const notif = new NotifService();

  const removeItem = (id, eaten) => {
    storageService.remove(id, 'itemList', true);
    storageService.submitEaten(item.name, item.quantity, eaten);
    notif.cancelNotif(id);
    props.navigation.goBack();
  };

  const partRemoveItem = (id, eaten, leftQuantity, usedQuantity) => {
    storageService.update(id, leftQuantity, 'itemList', true);
    storageService.submitEaten(item.name, usedQuantity, eaten);
    setLeft(leftQuantity);
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
                <Text>
                  {left} {item.unit}
                </Text>
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
                  {getDaysMessage(item.expDate)}
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
                onPress={() => removeItem(item.id, true)}>
                <Text uppercase={false}>Eaten</Text>
              </Button>
            </Col>
            <Col>
              <Button
                rounded
                primary
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => removeItem(item.id, false)}>
                <Text uppercase={false}>Discarted</Text>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                rounded
                primary
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => setVisible(true)}>
                <Text uppercase={false}>Eaten some</Text>
              </Button>
            </Col>
            <Col>
              <Button
                rounded
                primary
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => {setVisible(true); setDisc(true);}}>
                <Text uppercase={false}>Discarded some</Text>
              </Button>
            </Col>
          </Row>
          <Prompt
              visible={visible}
              title="Item quantity update"
              placeholder={"How many "+item.unit+" are left?"}
              onCancel={() => {setVisible(false); setDisc(false);}
              }
              onSubmit={qty => {
                const numbers = /^[0-9]+$/;
                if (!numbers.test(qty)) {
                  Alert.alert('The quantity must be a positive number');
                } else if( parseInt(item.quantity)<parseInt(qty)) {
                    Alert.alert("You can't have more left than you began with.");
                } else if (qty=="0") {
                    setVisible(false);
                    removeItem(item.id, !disc);
                    setDisc(false);
                } else {
                    setVisible(false);
                    partRemoveItem(item.id, !disc, qty, parseInt(item.quantity)-parseInt(qty));
                    setDisc(false);
                }
              }}
          />
        </Grid>
      </Content>
    </Container>
  );
};

export default GroupViewItemModal;
