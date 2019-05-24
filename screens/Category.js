import React, { Component } from 'react'
import {StyleSheet,TouchableOpacity,FlatList,SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import {Block,Text,Divider } from '../components';
import { theme,data } from '../constants';

import Challenge from '../components/Challenge';

export default class Category extends Component {

  static navigationOptions = ({navigation}) => ({
    header:null
  });

  state = {
    popular:[],
  }

  componentDidMount() {
    this.setState({
      popular:this.props.popular,
    });
  }

  renderPopular(){
    return (
      <FlatList
      snapToAlignment='center'
      showsVerticalScrollIndicator={false}
      data={this.state.popular}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({item}) => (
          <Challenge challenge={item} navigation={this.props.navigation}/>
        )}
      />
    )
  }

  render() {
    const { navigation } = this.props;
    const categoryName = navigation.getParam('categoryName', 'IF NO CATEGORYNAME INSERT DEFAULT');

    return (
      <SafeAreaView style={styles.container}>
        <Block flex={false} row>
          <Block>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Explore')}><Icon name='arrow-left' color='black' size={15} /></TouchableOpacity>
            <Text size={32} medium style={styles.mainHeader}>{categoryName}</Text>
            <Text size={14} light style={styles.subHeader}>The best game challenges for you</Text>
          </Block>
        </Block>
        <Divider padding={[1,0]} flex={false} color='gray'/>
        <Block style={styles.popularChallenges} column>
          {this.renderPopular()}
        </Block>
      </SafeAreaView>
    );
  }
}

Category.defaultProps = {
  popular: data.popular,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:theme.sizes.base,
    marginTop:30
  },
  mainHeader:{
    marginTop:15,
    marginBottom:5
  },
  subHeader:{
    marginVertical:5
  },
  popularChallenges:{
    marginTop:15,
  }
});
