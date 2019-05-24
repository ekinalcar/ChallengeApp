import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView,ScrollView, StyleSheet,ImageBackground,Dimensions,TouchableWithoutFeedback } from 'react-native'

import { Button, Block, Input, Text } from '../components';
import { theme,utils } from '../constants';

const DismissKeyboard = ({children}) =>(
	<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
	 {children}
	</TouchableWithoutFeedback>
);

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      errors: [],
      loading: false,
    };
  }

  handleRegister() {
    const { navigation } = this.props;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email;
		var password = this.state.password;
    const errors = [];

    console.log('email is : ' +email+ ' password is : '+password);

    Keyboard.dismiss();
    this.setState({ loading: true });

    if (firstName == '') {
      errors.push('firstName');
    }
    if (lastName == '') {
      errors.push('lastName');
    }
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
          'command':'register',
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
  			})
  		})
      .then((res) => res.json())
      .then((res) => {
        if(res.result == 1){
          navigation.navigate('Profile');
        }
        else{
          alert('Lutfen hatalarimizi gozden gecirelim...');
        }
      }).catch((error) => {
          alert('data', 'Sunucuya bağlanırken bir hata oluştu' + error);
        });
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
				<DismissKeyboard>
					<ImageBackground style={styles.imageTop} source={require('../assets/images/Login/ch_3.png')}>
						<Block flex={false} padding={[75, theme.sizes.base * 2,0]}>
							<Text h2 bold color={theme.colors.white} style={{marginBottom:10}}>Register!</Text>
							<Text size={14} color={theme.colors.white}>to Challenge...</Text>
						</Block>
					</ImageBackground>
				</DismissKeyboard>
				<ScrollView keyboardShouldPersistTaps="always">
	        <Block padding={[0, theme.sizes.base * 2]}>
            <Input
              label="First Name"
              error={hasErrors('firstName')}
              style={[styles.input, hasErrors('firstName')]}
              placeholder="First Name"
              onChangeText={(text) => this.setState({firstName: text})}
            />
            <Input
              label="Last Name"
              error={hasErrors('lastName')}
              style={[styles.input, hasErrors('lastName')]}
              placeholder="Last Name"
              onChangeText={(text) => this.setState({lastName: text})}
            />
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
            <Button style={styles.loginButton} onPress={() => this.handleRegister()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Sign Up!</Text>
              }
            </Button>
						<Block style={{marginBottom:50}}>
	            <Text gray bold medium center>Already have an account?
	              <Text onPress={()=>navigation.navigate('Login')} color={theme.colors.purple}> Login</Text>
	            </Text>
						</Block>
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
  }
})
