import React, { useState } from 'react';
import config from '../../aws-exports';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Sign_Up_Photo from '../../GymGuru_App_Photos/Sign_Up_Photo.jpeg';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const createUserAccount = async (fullName, email, username, password) => {
    const userPoolData = {
      UserPoolId: config.aws_user_pools_id,
      ClientId: config.aws_user_pools_web_client_id,
    };

    const userPool = new CognitoUserPool(userPoolData);

    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'name', Value: fullName }),
    ];

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        Alert.alert('Error', err.message || JSON.stringify(err));
        return;
      }
      setFullName('');
      setEmail('');
      setUsername('');
      setPassword('');
      Alert.alert('User account created successfully!');

      const cognitoUser = result.user;
      navigation.navigate('ConfirmSignUp', { username: cognitoUser.getUsername() });
    });
  };

  const handleFinish = () => {
    if (fullName === '' || email === '' || username === '' || password === '') {
      let missingFields = [];

      if (fullName === '') missingFields.push('Full Name');
      if (email === '') missingFields.push('Email');
      if (username === '') missingFields.push('Username');
      if (password === '') missingFields.push('Password');

      Alert.alert(
        'Missing Information',
        'Please fill out the following fields: ' + missingFields.join(', ')
      );
    } else {
      createUserAccount(fullName, email, username, password);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={Sign_Up_Photo} style={styles.backgroundImage} resizeMode="cover">
      <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.8)']} style={styles.overlay}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#B3B3B3"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B3B3B3"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#B3B3B3"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
                        style={styles.input}
            placeholder="Password"
            placeholderTextColor="#B3B3B3"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishText}>Finish</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  input: {
    height: 44,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 22,
    borderColor: '#B3B3B3',
    borderWidth: 1,
    color: 'white',
  },
  finishButton: {
    width: 160,
    height: 44,
    backgroundColor: '#2E8B57',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 22,
  },
  finishText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    width: 160,
    height: 44,
    backgroundColor: '#0077c2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  backText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;

