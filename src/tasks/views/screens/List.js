import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AgendaController from '../../controllers/Agenda';
import Agenda from '../components/Agenda';
import Backlog from '../components/Backlog';
import TopBar from '../components/TopBar';
import {Component} from '../../../weos/helpers';
import BacklogController from '../../controllers/Backlog';

export default props => {
  const {navigation} = props;
  //setup tabs for current task list and backlog
  const Tabs = createMaterialTopTabNavigator();

  // const TabNavigation = () => (

  // );

  return (
    <>
      <TopBar navigation={navigation} />
      <Tabs.Navigator screenOptions={{gestureEnabled: false}}>
        <Tabs.Screen
          name="Today"
          component={Component(new AgendaController(), Agenda)}
        />
        <Tabs.Screen
          name="Backlog"
          component={Component(new BacklogController(), Backlog)}
        />
      </Tabs.Navigator>
    </>
  );
};
