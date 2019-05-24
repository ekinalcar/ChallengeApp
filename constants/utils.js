import {AsyncStorage } from 'react-native'

const serializeKey = (data) => {
	var formBody = [];
	for (var property in data) {
	  var encodedKey = encodeURIComponent(property);
	  var encodedValue = encodeURIComponent(data[property]);
	  formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	return formBody;
}

async function getToken(){
	var access_token = await AsyncStorage.getItem('access_token');
	//console.log('buradayiz : ' +  access_token);
	if(access_token !== null){
		return true;
	}
	return false;
}

async function setToken(token){
 AsyncStorage.setItem('access_token',token);
}

async function removeToken(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}

export {
	getToken,
  serializeKey,
	setToken,
	removeToken
};
