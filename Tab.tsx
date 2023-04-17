import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FollowPage from "./follow";
import ListPage from "./list";
import * as SQLite from "expo-sqlite";
import {StyleSheet, View} from "react-native";

const Tab = createBottomTabNavigator()

const MyTabs = (props: { db: SQLite.WebSQLDatabase; }) => {
    const FollowScreen = () => {
        return (
            <View style={styles.screenContainer}>
                {FollowPage(props)}
            </View>
        );
    }
    const ListScreen = () => {
        return (
            <View style={styles.screenContainer}>
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

const styles = StyleSheet.create({
    screenContainer: {
        width: '100%',
        height: '100%',
    },
});