import React, {Component} from 'react';
import {StyleSheet,ImageBackground,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {Block, Card, Text } from '../components';
import { theme } from '../constants';

export default class Challenge extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
  };

  render() {
    const { challenge,navigation} = this.props;
    return (
      <TouchableOpacity style={styles.popularChallenge} key={challenge.id}
        onPress={() => {
          navigation.navigate('Detail', {
            challengeId: challenge.id,
            challengeName: challenge.name,
            challengeCategory: challenge.name,
          });
        }}
        >
        <Card shadow style={styles.popularCard} row>
          <Block style={styles.popularDesc}>
            <Text size={13} medium color='black'>Insert Logo</Text>
            <Text size={13} style={styles.description}  medium color='black'>{challenge.description}</Text>
            <Text style={styles.badge} size={12} color={challenge.color}>{challenge.name}</Text>
          </Block>
          <Block style={styles.popularImageContainer}>
            <ImageBackground style={styles.popularImage} source={challenge.icon}>
              <Text style={styles.popularImageText} center size={12} bold color={theme.colors.white}>03:11:08</Text>
            </ImageBackground>
          </Block>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  popularCard:{
    borderColor:'#fafafa',
    borderWidth:1,
    borderRadius:5
  },
  popularDesc:{
    alignItems:'flex-start'
  },
  description:{
    paddingVertical:10
  },
  badge:{
    borderWidth:1,
    borderRadius:5,
    borderColor:theme.colors.purple,
    paddingHorizontal:5,
    paddingVertical:5,
  },
  popularImageContainer:{
    alignItems:'flex-end',
  },
  popularImage:{
    width:100,
    height:120,
    resizeMode:'contain',
  },
  popularImageText:{
    position:'absolute',
    bottom:0,
    backgroundColor:'gray',
    width:'100%',
    paddingVertical:5
  }
});
