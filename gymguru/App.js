import ConfirmSignUpScreen from './src/screens/ConfirmSignUpScreen';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import gainGuruLogo from './GymGuru_App_Photos/gainguru-high-resolution-logo-black-on-transparent-background.png';
import coverPhoto from './GymGuru_App_Photos/cover_photo_2.png';
import Svg, { Path } from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogFitnessJourneyScreen from './src/screens/LogFitnessJourneyScreen';
import WorkoutProgramScreen from './src/screens/WorkoutProgramScreen';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import withAuthProtection from './src/withAuthProtection';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';



import config from './aws-exports.js';



import SignUpScreen from './src/screens/SignUpScreen';
import DashboardScreen from './src/screens/DashboardScreen';


const userPoolData = {
  UserPoolId: config.aws_user_pools_id,
  ClientId: config.aws_user_pools_web_client_id,
};

const userPool = new CognitoUserPool(userPoolData);


const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 const handleSignIn = () => {
  if (username === '' && password === '') {
    alert('Please provide a username and password.'); // Missing both username and password
  } else if (username === '') {
    alert('Please provide a username.'); // Missing username only
  } else if (password === '') {
    alert('Please provide a password.'); // Missing password only
  } else {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        AsyncStorage.setItem('idToken', idToken); // Store the token
        setUsername('');
        setPassword('');
        navigation.navigate('Dashboard');
      },
      onFailure: (err) => {
        // Show an error message to the user
        alert('Account not registered or wrong login information.');
        console.error(err);
      },
    });
  }
};


  const handleSignUp = () => {
    setUsername('');
    setPassword('');
    navigation.navigate('SignUp');
  };


  return (
    <LinearGradient colors={['#1D1D1D', '#444444', '#797979']} style={styles.container}>
      <Image style={styles.coverPhoto} source={coverPhoto} />
      <Svg style={styles.wavyPath} viewBox="0 0 1440 320" preserveAspectRatio="none">
        <Path
          d="M0,64L48,69.3C96,75,192,85,288,106.7C384,128,480,160,576,181.3C672,203,768,213,864,202.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          fill="#ffffff"
        />
      </Svg>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={gainGuruLogo} />
        <View style={styles.smallLogoContainer}>
          <Image style={styles.smallLogo} source={gainGuruLogo} />
        </View>
      </View>
      <Text style={styles.welcome}>Welcome to GainGuru!</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={[styles.content, styles.extraPadding]}>
        <Text style={styles.text}>
          Dive into a captivating collection of lifting exercises that evolve
          monthly, expertly designed to align with your goals and propel your
          muscle-building quest forward. Embrace the opportunity and amplify
          your gains with us today!
        </Text>
        <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
        <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Dashboard" component={withAuthProtection(DashboardScreen)} />
        <Stack.Screen name="LogFitnessJourney" component={LogFitnessJourneyScreen} />
        <Stack.Screen name="WorkoutProgram" component={WorkoutProgramScreen}/>
        <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
      );
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f7f7f7',
paddingTop: 80,
paddingHorizontal: 20,
width: 428,
height: 926,
},
coverPhoto: {
position: 'absolute',
top: 0,
left: 0,
width: '110%',
height: '50%',
resizeMode: 'cover',
zIndex: 1,
},
wavyPath: {
position: 'absolute',
top: '50%',
width: '100%',
},
logoContainer: {
zIndex: 2,
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},
logo: {
marginTop: 5,
width: 120,
height: 120,
},
smallLogoContainer: {
position: 'absolute',
bottom: "-115%",
left: '54.5%',
transform: [{ translateX: -15 }],
alignItems: 'center',
justifyContent: 'center',
width: 30,
height: 30,
},
smallLogo: {
width: 30,
height: 30,
},
welcome: {
marginTop: "56%",
textAlign: 'center',
fontFamily: 'Avenir-Roman',
fontSize: 24,
fontWeight: 'bold',
},
content: {
marginTop: 20,
alignItems: 'center',
paddingHorizontal: 30,
},
text: {
textAlign: 'center',
fontFamily: 'Avenir-Roman',
fontSize: 18,
marginBottom: 20,
},
input: {
width: '80%',
height: 44,
paddingHorizontal: 10,
backgroundColor: 'white',
marginBottom: 10,
borderRadius: 22,
elevation: 5,
shadowColor: "#000",
shadowOffset: {
width: 0,
height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,
},
loginButton: {
width: 160,
height: 44,
backgroundColor: '#2E8B57',
justifyContent: 'center',
alignItems: 'center',
marginBottom: 10,
borderRadius: 22,
elevation: 5,
shadowColor: "#000",
shadowOffset: {
width: 0,
height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,
},
loginText: {
fontFamily: 'Avenir-Roman',
color: 'white',
fontSize: 18,
fontWeight: 'bold',
},
signupButton: {
width: 160,
height: 44,
backgroundColor: '#0077c2',
justifyContent: 'center',
alignItems: 'center',
borderRadius: 22,
elevation: 5,
shadowColor: "#000",
shadowOffset: {
width: 0,
height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,
},
extraPadding: {
paddingBottom: 54, // Adjust this value as needed
},
keyboardAvoidingView: {
flex: 1,
justifyContent: 'center',
width: '100%',
},
signupText: {
fontFamily: 'Avenir-Roman',
color: 'white',
fontSize: 18,
fontWeight: 'bold',
},
});
