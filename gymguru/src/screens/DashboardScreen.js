import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Menu, Provider } from 'react-native-paper';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
      <ImageBackground
        source={require('../../GymGuru_App_Photos/Dashboard_photo_2.jpeg')}
        style={styles.container}
      >
        <Appbar.Header style={styles.header}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
          >
            <Menu.Item onPress={() => {}} title="Dashboard" />
            <Menu.Item onPress={() => {}} title="My Account" />
            <Menu.Item onPress={() => {}} title="My Fitness Journey" />
            <Menu.Item onPress={() => {}} title="My Workout Programs" />
            {/* Add more menu options here */}
          </Menu>
        </Appbar.Header>

        <Text style={styles.welcomeText}>
          Hey {'{user_name}'}, Welcome to GymGuru, your go-to workout app! Click the side menu on the left of your
          screen for more info!
        </Text>
        <Text style={styles.subtitle}>The Guru Dashboard</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statText}>Workouts Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statText}>Current Streak</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LogFitnessJourney')}
        >
          <Text style={styles.buttonText}>Log My Fitness Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WorkoutProgram')}
        >
          <Text style={styles.buttonText}>My Workout Program</Text>
        </TouchableOpacity>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Workout History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent:
    'center',
    paddingHorizontal: 20,
},
header: {
backgroundColor: 'transparent',
elevation: 0,
},
title: {
fontSize: 42,
fontWeight: 'bold',
color: 'grey',
fontFamily: 'Avenir-Roman',
},
welcomeText: {
fontSize: 18,
fontFamily: 'Avenir-Roman',
textAlign: 'justify',
marginBottom: 10,
color: 'white',
},
subtitle: {
fontSize: 24,
fontWeight: 'bold',
color: 'white',
textAlign: 'center',
marginTop: 10,
fontFamily: 'Avenir-Roman',
},
statsContainer: {
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
marginVertical: 20,
},
statBox: {
backgroundColor: '#444444',
padding: 15,
borderRadius: 10,
},
statNumber: {
fontSize: 24,
color: 'white',
fontWeight: 'bold',
textAlign: 'center',
fontFamily: 'Avenir-Roman',
},
statText: {
fontSize: 16,
color: 'white',
textAlign: 'center',
fontFamily: 'Avenir-Roman',
},
button: {
backgroundColor: '#2E8B57',
borderRadius: 25,
paddingHorizontal: 20,
paddingVertical: 10,
alignSelf: 'center',
marginBottom: 20,
},
buttonText: {
fontSize: 18,
fontWeight: 'bold',
color: 'white',
fontFamily: 'Avenir-Roman',
textAlign: 'center',
},
menuContainer: {
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
marginTop: 20,
},
menuButton: {
backgroundColor: '#0077c2',
borderRadius: 25,
paddingHorizontal: 20,
paddingVertical: 10,
width: '30%',
alignItems: 'center',
marginBottom: 20,
},
menuText: {
fontSize: 14,
fontWeight: 'bold',
color: 'white',
fontFamily: 'Avenir-Roman',
},
backButton: {
backgroundColor: '#0077c2',
borderRadius: 25,
paddingHorizontal: 20,
paddingVertical: 10,
alignSelf: 'center',
marginBottom: 40, // Modified the marginBottom to move the button slightly lower
},
backButtonText: {
fontSize: 18,
fontWeight: 'bold',
color: 'white',
fontFamily: 'Avenir-Roman',
textAlign: 'center',
},
});

export default DashboardScreen;
