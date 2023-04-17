import * as SQLite from 'expo-sqlite';
import {Button, Text, View} from "react-native";
import {useEffect, useState} from "react";
import styles from "./styles";
import {StatusBar} from "expo-status-bar";

const FollowPage = (
    props: { db: SQLite.WebSQLDatabase; }
) => {
    const db: SQLite.WebSQLDatabase = props.db
    const [isLoading, setLoading]
        = useState(true);
    const [zones, setZones]
        = useState([] as any[]);

    useEffect(() => {
        db.transaction(tx => {
            // @ts-ignore
            tx.executeSql('SELECT * FROM zones', null,
                (txObj, resultSet) => {
                    setZones(resultSet.rows._array);
                },
                (txObj, error) => {
                    console.log(error);
                    return true;
                }
            );
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

    const showZones = () => {
        return zones.map((zone: any, index: number) => {
            return (
                <View key={index} style={styles.testRow}>
                    <Text>{zone.name}</Text>
                    <Button title='Delete' onPress={() => deleteZone(zone.id)}/>
                </View>
            );
        });
    };

    const deleteZone = (id: number) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM names where id = ?', [id],
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

    return (
        <View style={styles.container}>
            {showZones()}
            <StatusBar style="auto"/>
        </View>
    );
}

const dbName = "timeZones.db"

export default FollowPage