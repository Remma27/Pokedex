/* eslint-disable prettier/prettier */
// In the component where you use the Home component\
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'; // Import the 'Home' component
import DetailsScreen from './DetailsScreen'; // Import the 'DetailsScreen' component

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
