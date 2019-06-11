import React, { Component } from 'react'
import {ScrollView,StyleSheet,TouchableOpacity,ImageBackground,Dimensions,FlatList,Image,AsyncStorage} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';
import {Block, Card, Text,SliderEntry } from '../components';
import { theme,data,animations,utils} from '../constants';
import { sliderWidth, itemWidth } from '../constants/SliderEntry.style';
import SliderStyles, { colors } from '../constants/index.style';
import Challenge from '../components/Challenge';



const {width} = Dimensions.get('window');
const SLIDER_1_FIRST_ITEM = 3;

export default class Explore extends Component {

  state = {
    illustrations: [],
    categories: [],
    popular:[],
    slider1ActiveSlide: SLIDER_1_FIRST_ITEM
  }

  componentDidMount() {
    this.setState({
      categories:this.props.categories,
      popular:this.props.popular,
      illustrations:this.props.illustrations
    });
  }

  _renderItem ({item, index}) {
      return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax ({item, index}, parallaxProps) {
    return (
        <SliderEntry
          data={item}
          even={(index + 1) % 2 === 0}
          parallax={true}
          parallaxProps={parallaxProps}
        />
    );
  }

  _renderLightItem ({item, index}) {
    return <SliderEntry  key={index} data={item} even={false} />;
  }

  _renderDarkItem ({item, index}) {
    return <SliderEntry navigation={this.props.navigation} key={index} data={item} even={true} />;
  }

  mainExample () {
    return (
        <Block style={styles.slider}>
          <Carousel
            ref={c => this._slider1Ref = c}
            data={this.state.illustrations}
            initialNumToRender={this.state.illustrations.length}
            renderItem={this._renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem = {SLIDER_1_FIRST_ITEM}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            containerCustomStyle={SliderStyles.slider}
            contentContainerCustomStyle={SliderStyles.sliderContentContainer}
            loop={true}
            loopClonesPerSide={2}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
          />
        </Block>
    );
  }

  renderIllustrations () {
      return (
          <Carousel
            data={this.state.illustrations}
            renderItem={this._renderLightItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            layout='tinder'
            loop={true}
          />
      );
  }

  customExample (refNumber, renderItemFunc) {
     return (
       <Carousel
         data={this.state.illustrations}
         renderItem={renderItemFunc}
         sliderWidth={sliderWidth}
         itemWidth={itemWidth}
         containerCustomStyle={styles.slider}
         contentContainerCustomStyle={styles.sliderContentContainer}
         scrollInterpolator={animations.scrollInterpolators[`scrollInterpolator${refNumber}`]}
         slideInterpolatedStyle={animations.animatedStyles[`animatedStyles${refNumber}`]}
         useScrollView={true}
       />
     )
 }

  momentumExample () {
    return (
        <Block style={styles.slider}>
            <Carousel
              data={this.state.illustrations}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideScale={0.95}
              inactiveSlideOpacity={1}
              enableMomentum={true}
              activeSlideAlignment={'start'}
              containerCustomStyle={SliderStyles.slider}
              contentContainerCustomStyle={SliderStyles.sliderContentContainer}
              activeAnimationType={'spring'}
              activeAnimationOptions={{
                  friction: 4,
                  tension: 40
              }}
            />
        </Block>
      );
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
          <Text size={16} center style={styles.categoryName} medium color='black'>{item.name}</Text>
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
    const slideShow = this.customExample(3, this._renderDarkItem.bind(this));
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground style={styles.imageTop} source={require('../assets/images/Login/ch_3.png')}>
          <Block padding={[75, theme.sizes.base * 2,0]}>
            <Text h2 bold color={theme.colors.white} style={{marginBottom:10}}>Explore</Text>
            <Text size={18} color={theme.colors.white}>Suggested challenges for you</Text>
          </Block>
        </ImageBackground>
        {slideShow}
        
        <Block style={styles.challenges}>
          <Text h2 bold color={theme.colors.black}>More Challenge</Text>
          <Text size={14} medium color={theme.colors.black} style={{marginTop:5}}>Browse more challenge by category</Text>
          <Block style={styles.categories} row>
            {this.renderTab()}
          </Block>
        </Block>
        <Block style={styles.challenges}>
          <Block style={styles.nowPopular}>
            <Text h2 bold color={theme.colors.black}>Now Popular</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Popular')}>
              <Icon style={styles.arrowIcon} name='arrow-right' color={theme.colors.purple} size={10} />
            </TouchableOpacity>
          </Block>
          <Text size={14} medium color={theme.colors.black} style={{marginTop:5}}>Discover popular challenges</Text>
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
    marginTop:-120
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
