import React from 'react';
import {ListItem, Text, Left, Body, Right, Thumbnail} from 'native-base';
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

const getThumbnail = (category) =>{
    switch (category) {
      case "Dairy":
        return Dairy;
      case "Vegetable":
        return Vegetable;
      case "Fruit":
        return Fruit;
      case "Grain":
        return Grain;
      case "Meat":
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
}

const FridgeItem = ({name, expDate, category}) => {
  return (
    <ListItem avatar>
       <Left>
          <Thumbnail source={getThumbnail(category)}/>
       </Left>
       <Body>
          <Text>{name}</Text>
          <Text numberOfLines={1} note>{category}</Text>
       </Body>
       <Right>
         <Text note>{expDate}</Text>
       </Right>
    </ListItem>
  );
};

export default FridgeItem;
