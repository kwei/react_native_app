import { AsyncStorage } from 'react-native';

export class MyStorage{

	constructor(key) {
	    this.key = key;
	}

	// get value by key
	Load(key) {
		const value = AsyncStorage.getItem(key);
		if(value != null) {
			return value;
		}else {
			return false;
		}
	}

	Save(key, value) {
        AsyncStorage.setItem(key, value);
	}

}