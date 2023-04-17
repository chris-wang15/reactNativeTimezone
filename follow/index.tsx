import * as SQLite from 'expo-sqlite';
import {Button, Text, View} from "react-native";
import React, {useCallback, useState} from "react";
import styles from "./styles";
import {StatusBar} from "expo-status-bar";
import {useFocusEffect} from "@react-navigation/native";
import {Clock} from "./Clock";

const FollowPage = (
    props: { db: SQLite.WebSQLDatabase; }
) => {
    const db: SQLite.WebSQLDatabase = props.db
    const [isLoading, setLoading]
        = useState(true);
    const [zones, setZones]
        = useState([] as any[]);

    useFocusEffect(
        useCallback(
            () => {
                db.transaction(tx => {
                    console.log("follow sql start");
                    tx.executeSql('SELECT * FROM zones', [],
                        (txObj, resultSet) => {
                            console.log("sql result: " + resultSet.rows._array.length);
                            setZones(resultSet.rows._array);
                        },
                        (txObj, error) => {
                            console.warn(error);
                            return true;
                        }
                    );
                });

                setLoading(false)
            }, []));

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const showZones = () => {
        return zones.map((zone: any, index: number) => {
            return (
                <View key={index} style={styles.infoRow}>
                    <View style={styles.infoRowName}>
                        <Text>{zone.name}</Text>
                    </View>
                    <View style={styles.infoRowTime}>
                        <Clock style={styles.infoRowTime} timeZone={zone.name}/>
                    </View>
                    <View style={styles.infoRowButton}>
                        <Button title='Delete' onPress={() => deleteZone(zone.id)}/>
                    </View>
                </View>
            );
        });
    };

    const deleteZone = (id: number) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM zones where id = ?', [id],
                (txObj, resultSet) => {
                    let existingNames: any[] = [...zones].filter(zone => zone.id !== id);
                    setZones(existingNames);
                },
                (txObj, error) => {
                    console.log(error);
                    return true;
                }
            );
        });
    }

    const searchLine = () => {

    }

    return (
        <View style={styles.container}>
            {showZones()}
            <StatusBar style="auto"/>
        </View>
    );
}

const dbName = "timeZones.db"

export default FollowPage