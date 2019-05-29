import React, { Component } from 'react';
import {StyleSheet,SafeAreaView,Dimensions,TouchableOpacity,Image,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Block, Card, Text,Divider} from '../components';

import { theme,data } from '../constants';

const {width} = Dimensions.get('window');

export default class Categories extends Component {
  
  state = {
    categories: [],
    favorite: [],
  }

  toggleFav = item => {
    const id = item.id;
    this.setState(({ favorite }) => ({
      favorite: this.isFavorite(item) ? favorite.filter(a => a != id) : [...favorite, id],
    }))
  };

  isFavorite = item => {
    const id = item.id;
    return this.state.favorite.includes(id);
  };

  componentDidMount() {
    this.setState({
      categories:this.props.categories,
    });
    this.getFromStorage();
  }

  addToStorage(favCategories){
    AsyncStorage.setItem('categories', JSON.stringify(favCategories));
  }

  async getFromStorage(){
    return AsyncStorage.getItem('categories').then(req => JSON.parse(req))
      .then((json) => {
        this.setState({
          favorite:json
        });
        }
      )
  }
  componentDidUpdate(){
    this.addToStorage(this.state.favorite);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Block flex={false} row>
          <Block>
            <Text size={32} medium style={styles.mainHeader}>Categories</Text>
            <Text size={14} light style={styles.subHeader}>Choose your category based on your interest</Text>
          </Block>
        </Block>
        <Divider padding={[1,0]} flex={false} color='gray'/>
        <Block flex={false} row style={styles.categories}>
          {this.state.categories.map((category,index) => (
            <TouchableOpacity style={styles.category} key={index} onPress={() => this.toggleFav(category)}>
              <Card center shadow style={[styles.card,{backgroundColor:category.color}]}>
                <Block style={styles.plusContainer}>
                  <Icon name={this.isFavorite(category) ? 'minus' : 'plus'} />
                </Block>
                <Image source={category.icon} style={styles.categoryIcon}/>
                <Text size={13} medium color='white' style={styles.categoryName}>{category.name}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </Block>
      </SafeAreaView>
    );
  }
}

Categories.defaultProps = {
  categories: data.categories,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:theme.sizes.base,
    marginTop:30
  },
  subHeader:{
    marginVertical:5
  },
  categories: {
    flexWrap: 'wrap',
    justifyContent:'flex-start',
    paddingVertical:15,
  },
  category: {
    width:width * 0.30,
    height: 150,
    paddingHorizontal:5,
  },
  card:{
    borderRadius:5,
    zIndex: 2
  },
  plusContainer:{
    height: 25,
    width: 25,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    position:'absolute',
    top:10,
    right:10,
  },
  categoryIcon:{
    width: 45,
    height:45,
    resizeMode:'contain',
    marginTop:15
  },
  categoryName:{
    paddingTop:20
  }
});
