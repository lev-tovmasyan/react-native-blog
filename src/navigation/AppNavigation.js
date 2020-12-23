import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from "@expo/vector-icons";
import MainScreen from "../screens/MainScreen/MainScreen";
import PostScreen from "../screens/PostScreen/PostScreen";
import AboutScreen from "../screens/AboutScreen/AboutScreen";
import CreateScreen from "../screens/CreateScreen/CreateScreen";
import { THEME } from "../styles/theme";
import AppHeaderIcon from "../components/AppHeaderIcon";


const navigatorDefaultOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR,
    },
    headerTintColor: "white",
  },
}

const MainNavigationOptions = (navigation, headerTitle, main) => ({
  headerTitle,
  headerRight: () => {
    if(!main) return null
    return (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="Take photo"
          iconName="ios-camera"
          onPress={() => navigation.navigate('Create')}
        />
      </HeaderButtons>
    );
  },
  headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Toggle Drawer"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      );
    },
})

const postNavigationOptions = (navigation) => {
  const postDate = new Date(navigation.getParam("date")).toLocaleDateString();
  const booked = navigation.getParam("booked")
  const toggleHandler = navigation.getParam("toggleHandler")
  const iconName = booked ? 'ios-star' : 'ios-star-outline'

  return {
    headerTitle: `Post at ${postDate}`,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="favorites"
            iconName={iconName}
            onPress={() => toggleHandler()}
          />
        </HeaderButtons>
      );
    },
  };
}

const PostNavigator = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: ({navigation}) => MainNavigationOptions(navigation, 'Home', true)
    },

    Post: {
      screen: PostScreen,
      navigationOptions: ({navigation}) => postNavigationOptions(navigation)
    },
  },
  navigatorDefaultOptions
);


const BookedNavigator = createStackNavigator({
  Booked: {
    screen: (props) => <MainScreen {...props} booked />,
    navigationOptions: ({navigation}) => MainNavigationOptions(navigation, 'Favorites', false)
  },
  Post: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => postNavigationOptions(navigation)
  },
},
navigatorDefaultOptions
)

const BottomNavigator = createBottomTabNavigator({
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: 'All',
      tabBarIcon: info => <Ionicons name='ios-albums' size={25} color={info.tintColor} />
    }
  },
  Booked: {
    screen: BookedNavigator,
    navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.tintColor} />
    }
  }
},
{
  tabBarOptions: {
    style: {
      backgroundColor: THEME.MAIN_COLOR,
    },
    activeTintColor: "white",
  }
})

const AboutNavigator = createStackNavigator({
  About: {
    screen: AboutScreen,
    navigationOptions: ({navigation}) => MainNavigationOptions(navigation, 'About')
  },
},
navigatorDefaultOptions
)

const CreateNavigator = createStackNavigator({
  Create: {
    screen: CreateScreen,
    navigationOptions: ({navigation}) => MainNavigationOptions(navigation, 'Create')
  }
},
navigatorDefaultOptions
)

const MainNavigator = createDrawerNavigator({
  PostTabs: {
    screen: BottomNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: <Ionicons name='home' size={24} />
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      drawerLabel: 'About',
      drawerIcon: <Ionicons name="information-circle" size={24} />
    }
  },
  Create: {
    screen: CreateNavigator,
    navigationOptions: {
      drawerLabel: 'Create',
      drawerIcon: <Ionicons name='camera' size={24} />
    }
  }
},
{
  contentOptions: {
    activeTintColor: THEME.MAIN_COLOR,
  }
})

export const AppNavigation = createAppContainer(MainNavigator);
