import React, { Component } from 'react'
import {ScrollView,StyleSheet,TouchableOpacity,ImageBackground,Dimensions,FlatList,Image,AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import {Block, Card, Text } from '../components';
import { theme,data } from '../constants';

const {width,height} = Dimensions.get('window');

import Challenge from '../components/Challenge';

export default class Explore extends Component {

  state = {
    illustrations: [],
    categories: [],
    popular:[],
  }

  componentDidMount() {
    this.setState({
      categories:this.props.categories,
      popular:this.props.popular,
      illustrations:this.props.illustrations
    });
  }

  renderIllustrations(){
    return (
      <FlatList
      style={styles.slider}
      horizontal = {true}
      pagingEnabled = {true}
      scrollEnabled = {true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      snapToAlignment='center'
      data={this.state.illustrations}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width:width, height: height / 2, overflow: 'visible' }}
          />
        )}
      />
    )
  }

  renderTab(){
    return (
      <FlatList
      horizontal = {true}
      pagingEnabled = {true}
      scrollEnabled = {true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      snapToAlignment='center'
      data={this.state.categories}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item,index }) => (
        <TouchableOpacity style={styles.category} key={index} onPress={() => {
            this.props.navigation.navigate('Category', {
              categoryId: item.id,
              categoryName: item.name
            });
          }}>
          <Card center style={[styles.card,{backgroundColor:item.color}]}>
            <Image source={item.icon} style={styles.categoryIcon}/>
          </Card>
          <Text size={12} center style={styles.categoryName} medium color='black'>{item.name}</Text>
        </TouchableOpacity>
        )}
      />
    )
  }

  renderPopular(){
    return (
      <FlatList
      snapToAlignment='center'
      data={this.state.popular}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({item}) => (
          <Challenge challenge={item} navigation={this.props.navigation}/>
        )}
      />
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground style={styles.imageTop} source={require('../assets/images/Login/ch_3.png')}>
          <Block padding={[75, theme.sizes.base * 2,0]}>
            <Text h2 bold color={theme.colors.white} style={{marginBottom:10}}>Explore</Text>
            <Text size={14} color={theme.colors.white}>Suggested challenges for you</Text>
          </Block>
        </ImageBackground>
        {this.renderIllustrations()}
        <Block style={styles.challenges}>
          <Text h3 bold color={theme.colors.black}>More Challenge</Text>
          <Text size={12} medium color={theme.colors.black} style={{marginTop:5}}>Browse more challenge by category</Text>
          <Block style={styles.categories} row>
            {this.renderTab()}
          </Block>
        </Block>
        <Block style={styles.challenges}>
          <Block style={styles.nowPopular}>
            <Text h3 bold color={theme.colors.black}>Now Popular</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Popular')}>
              <Icon style={styles.arrowIcon} name='arrow-right' color={theme.colors.purple} size={10} />
            </TouchableOpacity>
          </Block>
          <Text size={12} medium color={theme.colors.black} style={{marginTop:5}}>Discover popular challenges</Text>
          <Block style={styles.popularChallenges} column>
            {this.renderPopular()}
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

Explore.defaultProps = {
  categories: data.categories,
  popular: data.popular,
  illustrations: data.illustrations,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageTop:{
    width: width,
    height: 280,
		resizeMode:'contain'
	},
  slider:{
    marginTop:-130
  },
  challenges:{
    paddingHorizontal: theme.sizes.base * 2,
    paddingTop:25
  },
  categories: {
    marginTop:20
  },
  category: {
    marginRight:20,
  },
  card:{
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center'
  },
  categoryIcon:{
    width: 25,
    height:25,
    resizeMode:'contain',
  },
  nowPopular:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  arrowIcon:{
    marginLeft:15,
    borderWidth:2,
    padding:5,
    borderRadius:12,
    alignItems: 'center',
    justifyContent:'center',
    textAlign:'center',
    borderColor:theme.colors.purple
  },
  popularChallenges:{
    marginTop:20
  }
});
