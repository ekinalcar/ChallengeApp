import React, { Component } from 'react'
import {StyleSheet,TouchableOpacity,ImageBackground,Dimensions,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import {Block,Text,Divider,Button } from '../components';
import { theme } from '../constants';

const {width} = Dimensions.get('window');
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 44555
    }
  }

  componentDidMount(){
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
      1000
    );
  }

  componentDidUpdate(){
    if(this.state.timer === 1){
      clearInterval(this.interval);
    }
  }

  componentWillUnmount(){
   clearInterval(this.interval);
  }

  renderHeader(){
    const { goBack } = this.props.navigation;
    //const { navigation } = this.props;
    //const challengeId = navigation.getParam('challengeId', 'NO-ID');
    //const challengeName = navigation.getParam('challengeName', 'NO-NAME');

    return(
      <ImageBackground style={styles.imageTop} source={require('../assets/images/Login/ch_3.png')}>
        <Block padding={[75, theme.sizes.base * 2]} row space='between'>
          <TouchableOpacity onPress={() => {
              goBack()
            }}>
            <Icon name='arrow-left' color='white' size={15} />
          </TouchableOpacity>
          <TouchableOpacity right><Icon name='share-square' color='white'  size={15}/></TouchableOpacity>
        </Block>
      </ImageBackground>
    );
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.renderHeader()}
        <Block style={styles.content}>
          <Block row space='between' style={{alignItems:'center'}}>
            <Block flex={false} row>
              <Icon name='share-square' color='black' style={styles.logo} size={15}/>
              <Text size={14} bold>Adidas</Text>
            </Block>
            <Block flex={false} style={styles.timerContainer}>
              <Text style={styles.timer}>{this.state.timer}</Text>
            </Block>
          </Block>
          <Block flex={false} style={styles.titleContainer}>
            <Text style={styles.badge}>Sport</Text>
            <Text h4 bold color='black'>Can you walk 500 meter in 10 minutes?</Text>
          </Block>
          <Block flex={false} style={styles.detailContainer}>
            <Block row style={{alignItems: 'flex-start'}}>
              <Block flex={false} row>
                <Icon name='map-marker' color='black' style={styles.logo} size={15}/>
                <Text style={styles.infoText}>Bozcaada</Text>
              </Block>
              <Block flex={false} row style={{marginLeft:25}}>
                <Icon name='calendar' color='black' style={styles.logo} size={15}/>
                <Text style={styles.infoText}>18.05.2019</Text>
              </Block>
            </Block>
          </Block>
          <Divider padding={[1,0]} color='gray' style={{marginVertical:15}}/>
          <Block>
            <Text h4 bold color='black'>About the Challenge</Text>
            <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
            <TouchableOpacity style={styles.readMore}><Text style={styles.readMoreText}>Read More</Text></TouchableOpacity>
          </Block>
          <Divider padding={[1,0]} color='gray' style={{marginVertical:15}}/>
          <Block>
            <Text h4 bold color='black'>About the Challenge</Text>
            <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
            <TouchableOpacity style={styles.readMore}><Text style={styles.readMoreText}>Read More</Text></TouchableOpacity>
          </Block>
          <Divider padding={[1,0]} color='gray' style={{marginVertical:15}}/>
          <Block>
            <Text h4 bold color='black'>About the Challenge</Text>
            <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
            <TouchableOpacity style={styles.readMore}><Text style={styles.readMoreText}>Read More</Text></TouchableOpacity>
          </Block>
          <Block>
            <Text h4 bold color='black'>About the Challenge</Text>
            <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
            <TouchableOpacity style={styles.readMore}><Text style={styles.readMoreText}>Read More</Text></TouchableOpacity>
          </Block>
          <Divider padding={[1,0]} color='gray' style={{marginVertical:15}}/>
          <Block>
            <Text h4 bold color='black'>About the Challenge</Text>
            <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
            <TouchableOpacity style={styles.readMore}><Text style={styles.readMoreText}>Read More</Text></TouchableOpacity>
          </Block>
          <Divider padding={[1,0]} color='gray' style={{marginVertical:15}}/>
          <Block>
            <Text h4 bold color='black'>About the Challenge</Text>
            <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
            <TouchableOpacity style={styles.readMore}><Text style={styles.readMoreText}>Read More</Text></TouchableOpacity>
          </Block>
          <Button title='Accept Challenge' style={styles.challengeButton}><Text style={styles.challengeButtonText}>Accept Challenge</Text></Button>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageTop:{
    width:width,
    height: 280,
    resizeMode:'contain'
  },
  content:{
    flex:1,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderRadius:25,
    borderColor:'white',
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical:20,
    marginTop:-150,
    backgroundColor:'white',
  },
  logo:{
    paddingRight:10
  },
  timerContainer:{
    backgroundColor:'rgba(128,128,128,0.8)',
    borderWidth:10,
    borderRadius:10,
    borderColor:'gray',
    textAlign:'center'
  },
  timer:{
    color:'white',
    fontWeight:'bold'
  },
  titleContainer:{
    marginTop:15,
    marginBottom:15
  },
  badge:{
    borderWidth:1,
    borderRadius:5,
    borderColor:theme.colors.purple,
    paddingVertical:7,
    textAlign:'center',
    width:50,
    color:theme.colors.purple,
    fontSize:12,
    marginBottom:15,
    fontWeight:'bold'
  },
  infoText:{
    fontSize:12,
    fontWeight:'500'
  },
  paragraph:{
    marginVertical:10,
    lineHeight: 20,
  },
  readMore:{
  },
  readMoreText:{
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    color:'black',
    fontSize:14,
    fontWeight:'bold'
  },
  challengeButton:{
    marginTop:15,
    backgroundColor:theme.colors.purple,
    width:'100%'
  },
  challengeButtonText:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center'
  }
});
