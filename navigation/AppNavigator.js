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

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps

      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      // We can access our navigation params on the scene's 'route' property
      var thisSceneParams = scene.route.params || {}

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      })

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
      })

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      })

      const slideFromRight = { transform: [{ translateX }] }
      const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
      const slideInFromBottom = { transform: [{ translateY }] }

      return slideInFromBottom
    },
  }
}

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

const SignedIn = createBottomTabNavigator({
  Popular: {
    screen: Popular,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => <Icon name='fire' color={tintColor} size={16}/>
    })
  },
  Explore: {
    screen: Explore,
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
  }
});
const Stack = createStackNavigator({
  Category: {
    screen: Category,
  },
  Detail: {
    screen: Detail,
  }
}, {
  initialRouteName: 'Category',
  transitionConfig
});

const FullRouteLoggedIn = createAppContainer(createSwitchNavigator(
  {
    SignedIn: SignedIn,
    SignedOut: SignedOut,
    Stack:Stack
  },
  {
    initialRouteName: 'SignedIn',
  }
));

const FullRouteLoggedOut = createAppContainer(createSwitchNavigator(
  {
    SignedIn: SignedIn,
    SignedOut: SignedOut,
    Stack:Stack
  },
  {
    initialRouteName: 'SignedOut',
  }
));

export default class AppNavigator extends React.Component {

  render() {
    const {loginData} = this.props;
    if(loginData == 'true'){
      return(
        <FullRouteLoggedIn/>
      )
    }else{
      return(
        <FullRouteLoggedOut/>
      )
    }

  }
}
