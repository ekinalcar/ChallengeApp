import React, { Component } from 'react'
import {StyleSheet,TouchableOpacity,FlatList,SafeAreaView,UIManager,Platform,LayoutAnimation,ScrollView,Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import {Block,Text,Divider,Card} from '../components';
import { theme,data } from '../constants';

import Challenge from '../components/Challenge';

export default class Popular extends Component {

  static navigationOptions = ({navigation}) => ({
    header:null
  });

  constructor() {
    super();

    this.state = {
      popular:[],
      expanded: false,
      sort : 'latest',
      show_me: 'all',
      categories: [],
     }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    this.setState({
      categories:this.props.categories,
      popular:this.props.popular,
    });
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
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
        <TouchableOpacity style={styles.category} key={index}>
          <Card center style={[styles.card,{backgroundColor:item.color}]}>
            <Image source={item.icon} style={styles.categoryIcon}/>
          </Card>
          <Text size={12} center style={styles.categoryName} medium color='black'>{item.name}</Text>
        </TouchableOpacity>
        )}
      />
    )
  }

  renderFilter(){
    const {sort,show_me} = this.state;
    const activeType = (key) => show_me === key;
    return(
      <Block>
        <Block style={styles.section}>
          <Block>
            <Text style={styles.title}>Sort By </Text>
          </Block>
          <Block style={styles.group}>
            <TouchableOpacity
              style={[styles.button,styles.first, sort === 'latest' ? styles.active : null]}
              onPress={() => this.setState({sort:'latest'})}
            >
              <Text style={[styles.buttonText,sort === 'latest' ? styles.activeText : null]}>Latest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button,styles.last, sort === 'popularity' ? styles.active : null]}
              onPress={() => this.setState({sort:'popularity'})}
            >
              <Text style={[styles.buttonText,sort === 'popularity' ? styles.activeText : null]}>Popularity</Text>
            </TouchableOpacity>
          </Block>
        </Block>
        <Block style={styles.section}>
          <Block>
            <Text style={styles.title}>Show Me</Text>
          </Block>
          <Block style={styles.group}>
            <TouchableOpacity
              style={[styles.button,styles.first, activeType('all') ? styles.active : null]}
              onPress={() => this.setState({show_me:'all'})}
            >
              <Text style={[styles.buttonText, activeType('all') ? styles.activeText : null]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button,activeType('time') ? styles.active : null]}
              onPress={() => this.setState({show_me:'time'})}
            >
              <Text style={[styles.buttonText, activeType('time') ? styles.activeText : null]}>Have Time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button,styles.last,  activeType('ended') ? styles.active : null]}
              onPress={() => this.setState({show_me:'ended'})}
            >
              <Text style={[styles.buttonText, activeType('ended') ? styles.activeText : null]}>Ended</Text>
            </TouchableOpacity>
          </Block>
        </Block>
        <Block style={styles.section}>
          <Block>
            <Text style={styles.title}>Type</Text>
          </Block>
          {this.renderTab()}
        </Block>
      </Block>
    )
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
    return (
      <SafeAreaView style={styles.container}>
        <Block flex={false}>
          <Block flex={false} row middle center space='between'>
            <Text size={32} medium>Now Popular</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
              <Icon name='filter' color='black' size={25} />
            </TouchableOpacity>
          </Block>
          <Text size={14} light style={styles.subHeader}>Discover popular challenges</Text>
        </Block>
        <Divider padding={[1,0]} flex={false} color='gray'/>
        <Block flex={false} style={{ height: this.state.expanded ? null : 0, overflow: 'hidden'}}>
        <ScrollView>
          {this.renderFilter()}
        </ScrollView>
        </Block>
        <Block style={styles.popularChallenges} column>
          {this.renderPopular()}
        </Block>
      </SafeAreaView>
    );
  }
}

Popular.defaultProps = {
  categories: data.categories,
  popular: data.popular,
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
  section: {
    flexDirection: 'column',
    marginHorizontal: 14,
    marginBottom: 14,
    paddingBottom: 24,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    marginVertical: 14,
    fontWeight:'bold'
  },
  group: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 14,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  active: {
    backgroundColor: theme.colors.purple,
  },
  activeText: {
    color: '#FFF'
  },
  first: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  last: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
  popularChallenges:{
    marginTop:15,
  },
});
