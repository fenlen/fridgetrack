// /* eslint-disable no-undef */
import React, {useState} from 'react';
import Style from '../components/Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import storageService from '../services/storage';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Content,
  Grid,
  Col,
  Icon,
  Title,
  Text,
  Row,
  Thumbnail,
  H1,
} from 'native-base';
import Plenty from '../thumbnails/plenty.png';
import Soon from '../thumbnails/soon.png';
import Overdue from '../thumbnails/overdue.png';

const getThumbnail = date => {
  var days = getDaysLeft(date);
  if (days > 2) {
    return Plenty;
  } else if (days >= 0) {
    return Soon;
  } else {
    return Overdue;
  }
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

const ViewMealModal = props => {
  const {params} = props.navigation.state;
  const item = params ? params.item : null;
  const [dateState, setNewDate] = useState(
    new Date(
      parseInt(item.date.substring(6, 8)) + 2000,
      parseInt(item.date.substring(3, 5)) - 1,
      parseInt(item.date.substring(0, 2)),
    ),
  ); //set date to current item date
  const [mode, setMode] = useState('date'); //mode of the date picker
  const [show, setShow] = useState(false);

  const removeMeal = id => {
    storageService.removeMeal(id);
    props.navigation.goBack();
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const formattedDate = date => {
    return (
      ('0' + date.getDate()).slice(-2) +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      (date.getFullYear() - 2000)
    );
  };

  const setDate = async (event, date) => {
    date = date || dateState;
    setShow(false);
    setNewDate(date);
    firestore()
      .collection('meals')
      .doc(auth().currentUser.uid)
      .collection('mealList')
      .doc(item.id)
      .update({date: formattedDate(date)});
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
              <H1>{item.type}</H1>
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
                <Text>{formattedDate(dateState)}</Text>
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
          <Row>
            {getDaysLeft(item.date) < 0 ? (
              <Col>
                <Button
                  rounded
                  primary
                  style={{margin: 20, justifyContent: 'center'}}
                  onPress={() => removeMeal(item.id)}>
                  <Text>Skipped</Text>
                </Button>
              </Col>
            ) : (
              <Col>
                <Button
                  rounded
                  primary
                  style={{margin: 20, justifyContent: 'center'}}
                  onPress={() => removeMeal(item.id)}>
                  <Text>Remove</Text>
                </Button>
              </Col>
            )}
            <Col>
              <Button
                rounded
                primary
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => showDatePicker()}>
                <Text>Reschedule</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
        {show && (
          <DateTimePicker
            value={dateState}
            minimumDate={new Date()}
            maximumDate={
              new Date(
                dateState.getFullYear() + 1,
                dateState.getMonth(),
                dateState.getDate(),
              )
            }
            mode={mode}
            display="default"
            onChange={(event, date) => setDate(event, date)}
          />
        )}
      </Content>
    </Container>
  );
};

export default ViewMealModal;
