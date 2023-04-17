import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {useEffect, useState} from "react";

export default function App() {
    const db = SQLite.openDatabase(dbName)
    const [isLoading, setLoading]
        = useState(true);
    const [zones, setZones]
        = useState([] as any);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS zones (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
        });

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

    const addName = (zoneName: string) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO zones (name) values (?)', [zoneName],
                (txObj, resultSet) => {
                    let existingZones: any[] = [...zones];
                    existingZones.push({id: resultSet.insertId, name: zoneName});
                    setZones(existingZones);
                },
                (txObj, error) => {
                    console.log(error);
                    return true;
                }
            );
        });
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    testRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        margin: 8,
    },
});

const dbName = "timeZones.db"
