import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FollowPage from "./follow";
import ListPage from "./list";
import * as SQLite from "expo-sqlite";
import {View} from "react-native";

const Tab = createBottomTabNavigator()

const MyTabs = (props: { db: SQLite.WebSQLDatabase; }) => {
    const FollowScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {FollowPage(props)}
            </View>
        );
    }
    const ListScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {ListPage(props)}
            </View>
        );
    }
    return (
        <Tab.Navigator>
            <Tab.Screen name="Follow" component={FollowScreen}/>
            <Tab.Screen name="List" component={ListScreen}/>
        </Tab.Navigator>
    );
}

export default MyTabs