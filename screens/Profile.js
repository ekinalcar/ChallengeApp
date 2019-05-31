import React, { Component } from 'react'
import {StyleSheet,ScrollView,SafeAreaView,TouchableOpacity,Image,Dimensions,TextInput,ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import {Block,Text,Divider,Card} from '../components';

import { theme,data,utils } from '../constants';

const {width} = Dimensions.get('window');

export default class Profile extends Component {

  state = {
    categories: [],
    favorite: [],
    profile: {},
    editing:null,
    facebookInfo:[],
    facebookProfilePicture: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
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
      profile: this.props.profile ,
      categories: this.props.categories ,
    });

    utils.getToken('facebookInfo').then(req => JSON.parse(req))
      .then((json) => {
        if(json){
          this.setState({facebookInfo:json,facebookProfilePicture:json.picture.data.url});
        }else{
          this.setState({facebookInfo:this.props.profile});
        }
      });
  }

  handleEdit(name,text){
    const {profile} = this.state;

    profile[name] = text;

    this.setState({profile});
  }

  toggleEdit(name){
    const {editing} = this.state;
    this.setState({editing: !editing ? name : null});
  }

  renderEdit(name){
    const {editing,profile} = this.state;

    if(editing === name){
      return(
        <TextInput
        defaultValue = {profile[name]}
        onChangeText={text => this.handleEdit([name],text)}
        />
      )
    }
    return <Text medium>{profile[name]}</Text>
  }

  handleLogout(){
    utils.removeToken('facebookInfo');
		utils.removeToken('access_token').then((res) => {
			if (res){
        this.props.navigation.navigate('Login')
      }
		})
  }

  render() {
    const {editing,facebookInfo,facebookProfilePicture} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block>
            <Block row space='between' style={{alignItems:'center',marginBottom:10}}>
              <Image source={{uri:facebookProfilePicture}} style={{width:50,height:50,borderRadius:25}} />
              <TouchableOpacity onPress={() => this.handleLogout()}><Icon name='sign-out' size={26} color='black' /></TouchableOpacity>
            </Block>
            <Block>
              <Text size={32} medium style={styles.mainHeader}>Profile</Text>
              <Text size={16} light style={styles.subHeader}>Edit your categories and profile</Text>
            </Block>
          </Block>
          <Divider padding={[1,0]} flex={false} color='gray'/>
          <Text h4 bold style={styles.interested}>Interested Categories</Text>
          <Block flex={false} row style={styles.categories}>
            {this.state.categories.map((category,index) => (
              <TouchableOpacity style={styles.category} key={index} onPress={() => this.toggleFav(category)}>
                <Card row center middle shadow style={[styles.card,{backgroundColor:category.color}]}>
                  <Block style={styles.plusContainer}>
                    <Icon name={this.isFavorite(category) ? 'minus' : 'plus'} />
                  </Block>
                  <Image source={category.icon} style={styles.categoryIcon}/>
                  <Text size={16} medium color='white' style={styles.categoryName}>{category.name}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
          <Divider padding={[1,0]} flex={false} color='gray2'/>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[0, 0,10]} style={styles.inputRow}>
              <Block>
                <Text black bold style={{ marginBottom: 10 }}>Username</Text>
                {this.renderEdit('username')}
              </Block>
              <Text medium secondary onPress={() => this.toggleEdit('username')}>
                {editing === 'username' ? 'Save' : 'Edit'}
              </Text>
            </Block>
            <Divider padding={[1,0]} flex={false} color='gray2' style={{marginHorizontal:15}}/>
            <Block row space="between" margin={[10, 0,]} style={styles.inputRow}>
              <Block>
                <Text black bold style={{ marginBottom: 10 }}>First Name / Last Name</Text>
                <Text medium>{facebookInfo.first_name} - {facebookInfo.last_name}</Text>
              </Block>
            </Block>
            <Divider padding={[1,0]} flex={false} color='gray2' style={{marginHorizontal:15}}/>
            <Block row space="between" margin={[10, 0,]} style={styles.inputRow}>
              <Block>
                <Text black bold style={{ marginBottom: 10 }}>E-mail</Text>
                <Text medium>{facebookInfo.email}</Text>
              </Block>
            </Block>
            <Divider padding={[1,0]} flex={false} color='gray2' style={{marginHorizontal:15}}/>
          </Block>
          <Block style={styles.acceptedChallenges}>
            <Block style={styles.acceptedChallengesHeader}>
              <Text h4 bold color={theme.colors.black}>Accetpted Challenges</Text>
              <Block flex={false} style={styles.acceptedCount}>
                  <Text size={14}>3</Text>
              </Block>
            </Block>
            <Block column style={styles.acceptedChallengesContent}>
              <TouchableOpacity>
                <Card shadow>
                  <Block style={styles.acceptedChallengeImageContainer}>
                    <ImageBackground style={styles.acceptedChallengeImage} source={{uri:'https://i.imgur.com/UYiroysl.jpg'}}>
                    <Block flex={1} row style={{justifyContent:'flex-end',alignItems:'flex-start'}}>
                      <Text size={14} style={[styles.acceptedChallengeCategory,styles.timer]} bold>03:03:11</Text>
                    </Block>
                      <Block flex={1} row space='between' style={{alignItems:'flex-end'}}>
                        <Icon name='reddit' size={26} style={styles.acceptedChallengeLogo} color='orange' />
                        <Text style={styles.acceptedChallengeCategory} size={14} bold>Eating</Text>
                      </Block>
                    </ImageBackground>
                  </Block>
                  <Block style={styles.acceptedChallengeTitleContainer}>
                    <Text size={16} bold color='black'>Can you eat 10 pizza slices in 5 minutes</Text>
                  </Block>
                  <Block style={styles.acceptedChallengeDetailContainer}>
                    <Block row>
                      <Block row>
                        <Icon name='map-marker' color='black' style={styles.logo} size={15}/>
                        <Text style={styles.infoText}>Bozcaada</Text>
                      </Block>
                      <Block row style={{marginLeft:25}}>
                        <Icon name='calendar' color='black' style={styles.logo} size={15}/>
                        <Text style={styles.infoText}>18.05.2019</Text>
                      </Block>
                    </Block>
                  </Block>
                </Card>
              </TouchableOpacity>
            </Block>
          </Block>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Profile.defaultProps = {
  categories: data.categories,
  profile: data.profile,
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
  interested:{
    paddingTop:15
  },
  categories: {
    flexWrap: 'wrap',
    justifyContent:'flex-start',
    paddingTop:15,
  },
  category: {
    width:width * 0.42,
    height: 100,
    marginRight:10
  },
  card:{
    borderRadius:5,
    zIndex: 2,
    justifyContent:'flex-start'
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
    width:30,
    height:30,
    resizeMode:'contain',
  },
  categoryName:{
    paddingLeft:10
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  acceptedChallenges:{
    marginVertical:10
  },
  acceptedChallengesHeader:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom:10
  },
  acceptedCount:{
    marginLeft:15,
    borderWidth:2,
    width: 25,
    height: 25,
    borderRadius: 25/2,
    alignItems: 'center',
    justifyContent:'center',
    textAlign:'center',
    borderColor:theme.colors.purple,
    color:theme.colors.purple
  },
  acceptedChallengeImage:{
    width:300,
    height:150,
    resizeMode:'cover',
  },
  acceptedChallengeTitleContainer:{
    marginVertical:10
  },
  infoText:{
    fontSize:14,
    fontWeight:'500'
  },
  timerContainer:{
    alignItems:'flex-end',
  },
  timer:{
    color:'white',
    fontWeight:'bold'
  },
  acceptedChallengeLogo:{
    padding:5,
    margin:10,
  },
  acceptedChallengeCategory:{
    borderWidth:2,
    borderRadius:10,
    backgroundColor:theme.colors.purple,
    padding:5,
    margin:10,
    color:'white',
    borderColor:theme.colors.purple,
    overflow:'hidden'
  },
  timer:{
    borderColor:'gray',
    backgroundColor:'rgba(128,128,128,0.8)',
  },
  logo:{
    paddingRight:10
  }
});
