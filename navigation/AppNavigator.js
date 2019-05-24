import React from "react";
import {createStackNavigator,createBottomTabNavigator,createSwitchNavigator,createAppContainer} from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome';

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
  Explore: {
    screen: Explore,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => <Icon name='search' color={tintColor} size={12}/>,
    })
  },
  Categories: {
    screen: Categories,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => <Icon name='list' color={tintColor} size={12}/>
    })
  },
  Popular: {
    screen: Popular,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => <Icon name='fire' color={tintColor} size={12}/>
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      tabBarIcon: ({tintColor}) => <Icon name='user' color={tintColor} size={12}/>
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
});

const FullRouteLoggedIn = createAppContainer(createSwitchNavigator(
  {
    SignedIn: SignedIn,
    SignedOut: SignedOut,
    Stack:Stack
  },
  {
    initialRouteName: 'SignedIn'
  }
));

const FullRouteLoggedOut = createAppContainer(createSwitchNavigator(
  {
    SignedIn: SignedIn,
    SignedOut: SignedOut,
    Stack:Stack
  },
  {
    initialRouteName: 'SignedOut'
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
