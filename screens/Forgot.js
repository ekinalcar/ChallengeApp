import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet,TouchableOpacity,ImageBackground,Dimensions,TouchableWithoutFeedback } from 'react-native'

import { Button, Block, Input, Text } from '../components';
import { theme,utils } from '../constants';

const DismissKeyboard = ({children}) =>(
	<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
	 {children}
	</TouchableWithoutFeedback>
);

export default class Forgot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      errors: [],
      loading: false,
    };
  }

  handleReset() {
    const { navigation } = this.props;
    var email = this.state.email;
    const errors = [];

    console.log('email is : ' +email);

    Keyboard.dismiss();
    this.setState({ loading: true });

    if (email == '') {
      errors.push('email');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
			fetch('https://stage.firmasoft.net/meety/functions/member.functions.php', {
        method: 'POST',
  			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  			body: utils.serializeKey({
          'command':'reset',
          email: email,
  			})
  		})
      .then((res) => res.json())
      .then((res) => {
        if(res.result == 1){
          navigation.navigate('Profile');
        }
        else{
          alert('Kullanıcı doğrulanamadı');
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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
					<DismissKeyboard>
						<ImageBackground style={styles.imageTop} source={require('../assets/images/Login/ch_3.png')}>
							<Block flex={false} padding={[75, theme.sizes.base * 2,0]}>
								<Text h2 bold color={theme.colors.white} style={{marginBottom:10}}>Reset Password,</Text>
								<Text size={14} color={theme.colors.white}>we all need some break...</Text>
							</Block>
						</ImageBackground>
					</DismissKeyboard>
	        <Block middle padding={[0, theme.sizes.base * 2]}>
            <Input
              label="E-mail"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              placeholder="E-Mail"
              onChangeText={(text) => this.setState({email: text})}
            />
            <Button style={styles.loginButton} onPress={() => this.handleReset()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Send Link</Text>
              }
            </Button>
            <Text gray bold medium center>Do you remember now?
              <Text onPress={()=>navigation.navigate('Login')} color={theme.colors.purple}> Login</Text>
            </Text>
	        </Block>
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
