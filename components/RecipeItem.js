import React from 'react';
import {ListItem, Text, Left, Body, Right, Thumbnail} from 'native-base';
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

const RecipeItem = ({name, duration, level}) => {
  return (
    <ListItem avatar>
       <Left>
          <Thumbnail source={getThumbnail(level)}/>
       </Left>
       <Body>
          <Text>{name}</Text>
          <Text numberOfLines={1} note>{level}</Text>
       </Body>
       <Right>
         <Text note>{duration} min</Text>
       </Right>
    </ListItem>
  );
};

export default RecipeItem;
