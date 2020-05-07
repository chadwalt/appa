import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';

//import the different modules
import MainMenu from './components/MainMenu';
import Tasks from '../tasks/views/screens/Main';
import Onboarding from '../onboarding/views/screens/Main';
import Logs from '../logs/controllers/Main';
import Projects from '../projects/controllers/Main';
import Reports from '../reports/controllers/Main';
import Support from '../support/views/screens/Support';
import {fetchEvents} from '../apis/eventApi';

const {Navigator, Screen} = createDrawerNavigator();

const mapStateToProps = state => {
  return {
    onBoarded: state.onboard.onBoarded,
    token: state.token,
    eventCount: state.eventCount,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowConnect: () => {},
  };
};

const HomeScreen = ({navigation, onBoarded, token, eventCount}) => {
  const MainStackScreen = () => {
    useEffect(() => {
      if (token && eventCount === 0) {
        fetchEvents()
          .then(events => {
            // TODO replay events and dispatch actions to update state
            console.log(events);
          })
          .catch(error => {
            // TODO notify user of error
            console.log(error);
          });
      }
    }, []);

    return (
      <Navigator
        screenOptions={{gestureEnabled: true}}
        drawerContent={props => <MainMenu {...props} />}>
        <Screen name="Agenda" component={Tasks} />
        <Screen name="Projects" component={Projects} />
        <Screen name="Logs" component={Logs} />
        <Screen name="Reports" component={Reports} />
        <Screen name="Settings" component={Tasks} />
        <Screen name="Support" component={Support} />
      </Navigator>
    );
  };

  const RootStackScreen = () => {
    if (!onBoarded) {
      return <Onboarding />;
    } else {
      return <MainStackScreen />;
    }
  };

  return (
    <NavigationContainer theme={navigatorTheme}>
      <RootStackScreen />
    </NavigationContainer>
  );
};

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
