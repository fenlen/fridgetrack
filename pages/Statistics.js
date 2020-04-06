import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import SubmitButton from '../components/SubmitButton';
import Style from '../components/Style';
import Pie from 'react-native-pie';
import storageService from '../services/storage';
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
  Col,
  View,
} from 'native-base';

const Statistics = props => {
  const [ready, setReady] = useState(false);
  const [noStats, setNoStats] = useState(false);
  const [disc, setDisc] = useState();
  const [topE, setTopE] = useState();
  const [topD, setTopD] = useState();

  useEffect(() => {
    //executes on initial component render
    getData();
  }, []);

  const getData = async () => {
    let list = [];
    let topDiscarded = [];
    let topEaten = [];
    let total = 0;
    let discarded = 0;

    list = await storageService.getAllEaten().then(data => data);
    if (list.length === 0) {
      setNoStats(true);
    }
    for (var i = 0; i < list.length - 1; i++) {
      for (var j = i + 1; j < list.length; j++) {
        if (
          list[i].name === list[j].name &&
          list[i].eaten === list[j].eaten &&
          list[i].group === list[j].group
        ) {
          list[i].quantity += list[j].quantity;
          list.splice(j, 1);
        }
      }
    }
    let k;
    for (k in list) {
      total += list[k].quantity;
      if (list[k].eaten) {
        topEaten.push(list[k]);
      } else {
        topDiscarded.push(list[k]);
        discarded += list[k].quantity;
      }
    }
    //order the arrays desc
    topEaten.sort((a, b) => {
      b.quantity - a.quantity;
    });
    topDiscarded.sort((a, b) => {
      b.quantity - a.quantity;
    });
    topEaten = topEaten.slice(0, 3);
    topDiscarded = topDiscarded.slice(0, 3);
    while (topEaten.length < 3) {
      topEaten.push({
        eaten: true,
        group: false,
        id: '-',
        name: '-',
        quantity: 0,
      });
    }
    while (topDiscarded.length < 3) {
      topDiscarded.push({
        eaten: false,
        group: false,
        id: '-',
        name: '-',
        quantity: 0,
      });
    }
    setTopE(topEaten);
    setTopD(topDiscarded);
    setDisc(parseInt((discarded * 100) / total));
    setReady(true);
  };

  return (
    <Container style={Style.container}>
      <Header searchBar>
        <Left style={{flex: 0, width: 50}}>
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Your Statistics</Title>
        </Body>
      </Header>
      {noStats && (
        <Content>
          <Text style={{padding: 10}}>
            You have no items eaten or discarded yet. Statistics will be
            available as soon as you mark an item as discarded or eaten.
          </Text>
        </Content>
      )}
      {!noStats && (
        <>
          {ready && (
            <Grid>
              <Row size={10} style={{marginTop: 10, justifyContent: 'center'}}>
                <Text>Eaten vs discarded over the past month</Text>
              </Row>
              <Row
                size={40}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Pie
                  radius={Dimensions.get('window').width * 0.3}
                  innerRadius={Dimensions.get('window').width * 0.3 - 20}
                  sections={[
                    {
                      percentage: disc,
                      color: '#d9534f',
                    },
                    {
                      percentage: 100 - disc,
                      color: '#5cb85c',
                    },
                  ]}
                  dividerSize={1}
                  strokeCap={'round'}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: Dimensions.get('window').width * 0.3 + 20,
                    height: Dimensions.get('window').width * 0.3 + 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      color: '#000',
                      fontSize: 22,
                    }}>
                    {100 - disc}% vs {disc}%
                  </Text>
                </View>
              </Row>
              <Row size={10} />
              <Row size={40}>
                <Col
                  style={{borderWidth: 7, borderColor: '#5cb85c', padding: 10}}>
                  <Row>
                    <Text>Top Eaten:</Text>
                  </Row>
                  <Row>
                    <Text>1. {topE[0].name}</Text>
                  </Row>
                  <Row>
                    <Text>2. {topE[1].name}</Text>
                  </Row>
                  <Row>
                    <Text>3. {topE[2].name}</Text>
                  </Row>
                </Col>
                <Col
                  style={{borderWidth: 7, borderColor: '#d9534f', padding: 10}}>
                  <Row>
                    <Text>Top Discarded:</Text>
                  </Row>
                  <Row>
                    <Text>1. {topD[0].name}</Text>
                  </Row>
                  <Row>
                    <Text>2. {topD[1].name}</Text>
                  </Row>
                  <Row>
                    <Text>3. {topD[2].name}</Text>
                  </Row>
                </Col>
              </Row>
            </Grid>
          )}
          {!ready && <Grid />}
        </>
      )}
      <Footer>
        <FooterTab>
          <Button onPress={() => props.navigation.navigate('Fridge')}>
            <Icon active name="pizza" />
            <Text>Fridge</Text>
          </Button>
          <Button onPress={() => props.navigation.navigate('ShopList')}>
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

export default Statistics;
