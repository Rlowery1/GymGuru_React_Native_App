import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutProgramScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Program</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WorkoutProgramScreen;
