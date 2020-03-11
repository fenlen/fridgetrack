import React from 'react';
import {ListItem, Text, Left, Body, Right, Thumbnail} from 'native-base';
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



const MealItem = ({name, date}) => {
  return (
    <ListItem avatar>
       <Left>
          <Thumbnail source={getThumbnail(date)}/>
       </Left>
       <Body>
          <Text>{name}</Text>
       </Body>
       <Right>
         <Text note>{date} min</Text>
       </Right>
    </ListItem>
  );
};

export default MealItem;
