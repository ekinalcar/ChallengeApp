import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView,ScrollView,StyleSheet,TouchableOpacity,ImageBackground,Dimensions,TouchableWithoutFeedback,Alert } from 'react-native'
import { Button, Block, Input, Text } from '../components';
import { theme,utils } from '../constants';
import { Facebook } from 'expo';

const DismissKeyboard = ({children}) =>(
	<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
	 {children}
	</TouchableWithoutFeedback>
);

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      errors: [],
      loading: false,
			userInfo:null,
    };
  }

  handleLogin() {
    const { navigation } = this.props;
    var email = this.state.email;
		var password = this.state.password;
    const errors = [];

    console.log('email is : ' +email+ ' password is : '+password);

    Keyboard.dismiss();
    this.setState({ loading: true });

    if (email == '') {
      errors.push('email');
    }
    if (password == '') {
      errors.push('password');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
			fetch('https://stage.firmasoft.net/meety/functions/member.functions.php', {
        method: 'POST',
  			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  			body: utils.serializeKey({
          'command':'test',
          username: email,
          password: password
  			})
  		})
      .then((res) => res.json())
      .then((res) => {
        if(res.result == 1){
					utils.setToken('access_token','1');
          navigation.navigate('Explore');
        }
        else{
          alert('Kullanıcı doğrulanamadı');
        }
      }).catch((error) => {
          alert('data', 'Sunucuya bağlanırken bir hata oluştu' + error);
        });
    }
  }

	async logIn() {
	  try {

			const { navigation } = this.props;
	    const {type,token} = await Facebook.logInWithReadPermissionsAsync('2307676729290603', {permissions: ['public_profile','email'], behavior: "web"});

	    if (type === 'success') {
	      const response = await fetch(`https://graph.facebook.com/me?fields=id,picture,name,first_name,last_name,email,gender&access_token=${token}`);
				const userInfo = await response.json();
				this.setState({userInfo});

				utils.setToken('facebookInfo',JSON.stringify(userInfo));
				utils.setToken('access_token','1');

				navigation.navigate('Explore');

	    } else {
	     	Alert.alert('hata');
	    }
	  } catch ({ message }) {
	    alert(`Facebook Login Error: ${message}`);
	  }
	}

  render() {
    const { navigation} = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
					<DismissKeyboard>
						<ImageBackground style={styles.imageTop} source={require('../assets/images/Login/ch_3.png')}>
							<Block flex={false} padding={[75, theme.sizes.base * 2,0]}>
								<Text h2 bold color={theme.colors.white} style={{marginBottom:10}}>Welcome Back,</Text>
								<Text size={14} color={theme.colors.white}>Sign in to continue</Text>
							</Block>
						</ImageBackground>
					</DismissKeyboard>
					<ScrollView keyboardShouldPersistTaps="always">
		        <Block middle padding={[0, theme.sizes.base * 2]}>
	            <Input
	              label="E-mail"
	              error={hasErrors('email')}
	              style={[styles.input, hasErrors('email')]}
	              placeholder="E-Mail"
	              onChangeText={(text) => this.setState({email: text})}
	            />
	            <Input
	              secure
	              label="Password"
	              error={hasErrors('password')}
	              style={[styles.input, hasErrors('password')]}
	              placeholder="Password"
	              onChangeText={(text) => this.setState({password: text})}
	            />
	            <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate('Forgot')}>
	              <Text color={theme.colors.purple} paragraph right style={{textDecorationLine:'underline'}}>Forgot your password?</Text>
	            </TouchableOpacity>
	            <Button style={styles.loginButton} onPress={() => this.handleLogin()}>
	              {loading ?
	                <ActivityIndicator size="small" color="white" /> :
	                <Text bold white center>Login</Text>
	              }
	            </Button>
							<Button style={[styles.loginButton,styles.facebook]} onPress={() => this.logIn()}>
	              {loading ?
	                <ActivityIndicator size="small" color="white" /> :
	                <Text bold white center>Facebook Connect</Text>
	              }
	            </Button>
	            <Text gray bold medium center>Don't have an account?
	              <Text onPress={()=>navigation.navigate('Register')} color={theme.colors.purple}> Sign Up</Text>
	            </Text>
		        </Block>
					</ScrollView>
	      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor:theme.colors.gray2,
    borderBottomWidth: 2,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
	imageTop:{
    width: Dimensions.get('window').width,
    height: 280,
		resizeMode:'contain'
	},
  loginButton:{
    marginVertical:30,
    borderRadius:5,
		backgroundColor:theme.colors.purple
  },
	facebook:{
		marginVertical:0,
		marginBottom:30,
		backgroundColor:theme.colors.blue
	}
})
