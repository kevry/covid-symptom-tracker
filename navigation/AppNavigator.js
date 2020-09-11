import { createAppContainer } from 'react-navigation'
import { createStackNavigator, TransitionPresets  } from 'react-navigation-stack';

import LoginPage from '../screens/LoginPage'
import MainPage from '../screens/MainPage'
import SymptomSurvey from '../screens/SymptomSurvey'
import CovidStats from '../screens/CovidStats'

const AppNavigator = createStackNavigator({
  Welcome: LoginPage,
  Home: MainPage,
  'Daily Symptom Survey': SymptomSurvey,
  'COVID-19 Statistics':CovidStats
}, {
  defaultNavigationOptions: {...TransitionPresets.SlideFromRightIOS},
  headerMode: 'float'
}
);

export default createAppContainer(AppNavigator);