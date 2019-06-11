import React , {Component}from "react";
import {Easing,Animated,Image} from 'react-native';
import {createStackNavigator,createBottomTabNavigator,createSwitchNavigator,createAppContainer} from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import {utils} from '../constants';

//tab
import Explore from '../screens/Explore';
import Categories from '../screens/Categories';
import Popular from '../screens/Popular';
import Profile from '../screens/Profile';

//auth
import Login from '../screens/Login';
import Register from '../screens/Register';
import Forgot from '../screens/Forgot';

//stacks
import Detail from '../screens/Detail';
import Category from '../screens/Category';

class ImageHandler extends Component {

  state = {
    tabBarProfileIcon: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
  }

  componentDidMount() {
    utils.getToken('facebookInfo').then(req => JSON.parse(req))
    .then((json) => {
      if(json){
        this.setState({tabBarProfileIcon:json.picture.data.url});
      }
    });
  }

  render(){
    return(
      <Image
        source={{uri:this.state.tabBarProfileIcon}}
        style= {{width:15, height:15,borderRadius:7}}>
      </Image>
    )
  }
}

export default class AppNavigator extends React.Component {
  render() {
    return (
      <FullRoute/>
    )
  }
}

//stacknavigator for auth.
const SignedOut = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header:null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header:null
    }
  },
  Forgot: {
    screen: Forgot,
    navigationOptions: {
      header:null
    }
  }
});

const mainStack =  createStackNavigator({
  Category: {
    screen: Category,
  },
  Detail: {
    screen: Detail,
  }
  }, {
  initialRouteName: 'Category',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

//explore stack routes
const ExploreStack = createStackNavigator({
  Explore:{
    screen:Explore,
  },
  Stack:{
    screen:mainStack,
  }
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

//popular stack routes
const PopularStack = createStackNavigator({
  Popular:{
    screen:Popular,
  },
  Detail: {
    screen: Detail,
  }
  },{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

//bottom tab navigator
const SignedIn = createBottomTabNavigator({
  Explore: {
    screen: ExploreStack,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => <Icon name='search' color={tintColor} size={16}/>,
    })
  },
  Categories: {
    screen: Categories,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => <Icon name='list' color={tintColor} size={16}/>
    })
  },
  Popular: {
    screen: PopularStack,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => <Icon name='fire' color={tintColor} size={16}/>
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => (
        <ImageHandler/>
      )
    })
  },
}, {
  tabBarOptions: {
    activeTintColor: '#F8F8F8',
    inactiveTintColor: '#586589',
    style: {
      backgroundColor: '#171F33',
    },
    labelStyle: {
      fontSize: 12,
      marginBottom:5
    },
  },navigationOptions: ({ navigation }) => ({
      header:null
    })
});

const combinedNavigation = createStackNavigator({
  AppTabNavigator: {
    screen: SignedIn,
  },
  Stack:mainStack
});

const FullRoute = createAppContainer(createSwitchNavigator(
  {
    SignedOut: SignedOut,
    Stack:combinedNavigation
  },
  {
    initialRouteName: 'SignedOut',
  }
));
