import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'screens/modal/Modal';
import Home from 'screens/home/Home';
import { COLOR } from 'global/styles';
import Paused from 'screens/paused/Paused';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const defaultOptions = {
  headerLeft: null,
  headerTitle: 'Nudge Me',
  headerStyle: {
    backgroundColor: COLOR.primary,
  },
  headerTintColor: COLOR.background,
};

const defaultTabOption = {
  indicatorStyle: {
    backgroundColor: COLOR.primary,
  },
};

const HomeStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
      sceneContainerStyle={{}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Paused" component={Paused} />
    </Tab.Navigator>
  );
};

export const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={defaultOptions}
      />
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={({ route }) => {
          let { title, headerShown } = route?.params;
          return {
            headerShown: headerShown === false ? false : true,
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: COLOR.primary,
            },
            title: title || 'Nudge Me',
          };
        }}
      />
    </Stack.Navigator>
  );
};
