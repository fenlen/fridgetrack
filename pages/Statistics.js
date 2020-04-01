import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import { List, ListItem } from "react-native-elements"; 
import SubmitButton from '../components/SubmitButton';
import Style from '../components/Style';
import storageService from '../services/storage';
import auth from '@react-native-firebase/auth';
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
import Pie from 'react-native-pie';

const Statistics = props => {

  const [results, setResults] = useState();
// not sure if this is what i am supposed to use
  useEffect(() => {
    if (auth().currentUser != null) {
      storageService.getAllEaten().then(resultList => setResults(resultList));
      const listLength = (Object.keys(results).length);
      const truthCounter = 0;
      const falseCounter = 0;

      var checked = {};
      var checkedEaten = {};
      var foodPercentages = {};
      var sortedPercentages = [];
      var reversedSortedPercentages = [];

      for (var i = 0; i<listLength; i++) {
        if (checked.hasOwnProperty(results.i.name) == false) {
          checked.(results.i.name) = 1;
          checkedEaten.(results.i.name) = 0;
          for (var j = i+1; j<=listLength; j++) {
            if (results.i.name = results.j.name) {
              checked.(results.i.name)++;
              if (results.j.eaten == true) {
                checkedEaten.(results.i.name)++;
              }
            }
          }
        }
        if (results.i.eaten == true) {
          truthCounter++
        } else {
          falseCounter++
        }
      }
      const percentage = (truthCounter/(falseCounter+truthCounter))*100;

      for (var k = 0; k<listLength; k++) {
        foodPercentages[checked.(results.k.name)] = checkedEaten.(results.k.name)/(checkedEaten.(results.k.name)+checked.(results.k.name))*100;
      }
      //console.log(foods);

      for (var value in foodPercentages) {
        sortedPercentages.push([value, foodPercentages[value]]);
      }
      sortedPercentages.sort(function(a,b) {
        return a[1] - b[1];
      });

      reversedSortedPercentages = sortedPercentages.reverse();

    }
  }
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
                <Title>Your Statistics</Title>
              </Body>
            </Header>
            <Grid>
                <Row style={{ backgroundColor: '#293b9e' }}>
                  <View
                    style={{position: 'absolute', top: 0, left:0, right:0, bottom:0, justifyContent:'center', alignItems:'center'}}
                  >
                    <Pie 
                    radius={100}
                    innerRadius={90}
                    sections={[
                      {
                        percentage: percentage,
                        color: '#f00',
                      },
                    ]}
                    backgroundColor="#ddd"
                    /> 
                    <Text style={{fontSize: 25, position: 'absolute', top: 130, left:180, right:0, bottom:0, justifyContent:'center', alignItems:'center'}}>{percentage}%</Text>
                  </View>              
                </Row>
                <Row>
                    <Col style={{ backgroundColor: '#635DB7' }}>
                      <FlatList 
                      data={sortedPercentages}
                      renderItem = {({item}) => (
                        <ListItem
                          title={'${item[0]}'}
                          subtitle={item[1]}
                        />)}
                      />
                    </Col>
                    <Col style={{ backgroundColor: '#00CE9F' }}>
                      <FlatList 
                        data={reversedSortedPercentages}
                        renderItem = {({item}) => (
                          <ListItem
                            title={'${item[0]}'}
                            subtitle={item[1]}
                          />)}
                      />
                    </Col>
                </Row>
            </Grid>
            <Footer>
             <FooterTab>
                 <Button onPress={() => props.navigation.navigate("Fridge")}>
                   <Icon active name="pizza" />
                   <Text>Fridge</Text>
                 </Button>
                 <Button onPress={() => props.navigation.navigate("ShopList")}>
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
