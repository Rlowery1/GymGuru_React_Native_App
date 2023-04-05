import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import signUpPhoto from '../../GymGuru_App_Photos/Sign_Up_Photo.jpeg';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../screens/UserPool';

function ConfirmSignUpScreen({ route, navigation }) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;
    if (resendButtonDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendButtonDisabled]);

  useEffect(() => {
    if (timer === 0) {
      setResendButtonDisabled(false);
      setTimer(30);
    }
  }, [timer]);

  const { username } = route.params;
  const cognitoUser = new CognitoUser({ Username: username, Pool: UserPool });

  const handleConfirmSignUp = () => {
    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        Alert.alert('Error', 'Invalid verification code.');
        console.error(err);
        return;
      }
      Alert.alert(
        'Success',
        'Account verified successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            },
          },
        ],
        { cancelable: false }
      );
    });
  };

    const handleResendCode = async () => {
    if (!resendButtonDisabled) {
      setResendButtonDisabled(true);
      // Get the username from route.params
      const { username } = route.params;
      try {
        // Pass the username instead of email
        await Auth.resendSignUp(username);
        Alert.alert('Success', 'A new confirmation code has been sent to your email.');
      } catch (error) {
        console.error('Error resending code:', error);
        Alert.alert('Error', 'Failed to resend the confirmation code.');
      }
    }
  };

  return (
    <ImageBackground source={signUpPhoto} style={styles.backgroundImage}>
      <LinearGradient colors={['#1D1D1DAA', '#444444AA', '#797979AA']} style={styles.container}>
        <Text style={styles.title}>Confirm Sign Up</Text>
        <Text style={styles.text}>Please check your email for the confirmation code.</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmation Code"
          onChangeText={(text) => setConfirmationCode(text)}
          value={confirmationCode}
        />
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSignUp}>
          <Text style={styles.buttonText}>Confirm Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[        styles.resendButton,
        resendButtonDisabled ? styles.resendButtonDisabled : null,
      ]}
      onPress={handleResendCode}
      disabled={resendButtonDisabled}
    >
      <Text style={styles.resendButtonText}>
        {resendButtonDisabled ? `Resend Code (${timer}s)` : 'Resend Code'}
      </Text>
    </TouchableOpacity>
  </LinearGradient>
</ImageBackground>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
paddingHorizontal: 20,
},
backgroundImage: {
flex: 1,
resizeMode: 'cover',
},
title: {
fontFamily: 'Avenir-Roman',
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
color: 'white',
},
text: {
fontFamily: 'Avenir-Roman',
fontSize: 18,
color: 'white',
textAlign: 'center',
marginBottom: 20,
},
input: {
width: '100%',
height: 44,
paddingHorizontal: 10,
backgroundColor: 'white',
marginBottom: 10,
borderRadius: 22,
},
confirmButton: {
width: '100%',
height: 44,
backgroundColor: '#2E8B57',
justifyContent: 'center',
alignItems: 'center',
borderRadius: 22,
marginBottom: 10,
},
buttonText: {
fontFamily: 'Avenir-Roman',
color: 'white',
fontSize: 18,
fontWeight: 'bold',
},
resendButton: {
width: '100%',
justifyContent: 'center',
alignItems: 'center',
borderRadius: 22,
marginBottom: 10,
},
resendButtonDisabled: {
opacity: 0.5,
},
resendButtonText: {
fontFamily: 'Avenir-Roman',
color: 'white',
fontSize: 18,
textDecorationLine: 'underline',
},
});

export default ConfirmSignUpScreen;