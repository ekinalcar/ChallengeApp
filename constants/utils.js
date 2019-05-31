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

async function getToken(tokenName){
	var value = await AsyncStorage.getItem(tokenName);
	if(value !== null || value !== undefined){
		return value;
	}
	return false;
}

async function setToken(tokenName,token){
	AsyncStorage.setItem(tokenName,token);
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
