import {StyleSheet, Text, View} from 'react-native';
import * as SQLite from 'expo-sqlite';
import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import MyTabs from "./Tab";

export default function App() {
    const db = SQLite.openDatabase(dbName)
    const [isLoading, setLoading]
        = useState(true);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS zones (id INTEGER, name TEXT, PRIMARY KEY(id))')
        });
        setLoading(false)
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // <View style={styles.container}>
    //     {showTabs(zones)}
    //     <StatusBar style="auto"/>
    // </View>
    return (
        <NavigationContainer>
            <MyTabs db={db} ></MyTabs>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const dbName = "timeZones.db"
