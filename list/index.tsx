import * as SQLite from 'expo-sqlite';
import {Button, FlatList, Switch, Text, TextInput, View} from "react-native";
import React, {useCallback, useState} from "react";
import styles from "./styles";
import zonesList from "./zonesList";
import {useFocusEffect} from "@react-navigation/native";

const ListPage = (
    props: { db: SQLite.WebSQLDatabase; }
) => {
    const db: SQLite.WebSQLDatabase = props.db
    const [curName, setCurName]
        = useState<string | undefined>(undefined);
    const [zones, setZones]
        = useState(zonesList)

    const searchZone = () => {
        if (curName === undefined || curName.length === 0) {
            setZones(zonesList);
            return
        }
        let filtered = zonesList.filter(
            function (zone: { id: number, name: string }) {
                return zone.name.includes(curName)
            }
        )
        console.log("filtered: " + filtered.length);
        setZones(filtered);
    }

    return (
        <View style={styles.listContainer}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={curName}
                    placeholder='zone'
                    onChangeText={(str) => {
                        // console.log("onChangeText " + str);
                        setCurName(str);
                    }}
                />
                <View style={styles.searchButton}>
                    <Button title='Search Zone' onPress={searchZone}/>
                </View>
            </View>
            <FlatList
                data={zones}
                renderItem={({item}) =>
                    <ZoneItem
                        db={db}
                        zoneName={item.name}
                        index={item.id}
                    />}
            >
            </FlatList>
        </View>
    )
}

export default ListPage

const ZoneItem = (
    props: {
        db: SQLite.WebSQLDatabase;
        zoneName: string;
        index: number;
    }
) => {
    const name = props.zoneName
    const index = props.index
    const db = props.db

    const [followed, setFollowed]
        = useState(false);

    useFocusEffect(
        useCallback(() => {
                db.transaction(tx => {
                    tx.executeSql('SELECT * FROM zones where id = ?', [index],
                        (txObj, resultSet) => {
                            // console.log(index + " / " + name + ": " + resultSet.rows.length);
                            setFollowed(resultSet.rows.length > 0);
                        },
                        (txObj, error) => {
                            console.log(error);
                            return true;
                        }
                    );
                });
            }, []
        ));

    const unFollowZone = () => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM zones where id = ?', [index],
                (txObj, resultSet) => {
                    setFollowed(false);
                },
                (txObj, error) => {
                    console.log(error);
                    return true;
                }
            );
        });
    }

    const followZone = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT OR IGNORE INTO zones(id, name) VALUES(?, ?)', [index, name],
                (txObj, resultSet) => {
                    console.log('follow success');
                    setFollowed(true);
                },
                (txObj, error) => {
                    console.log(error);
                    return true;
                }
            );
        });
    }

    return (
        <View key={index} style={styles.zoneRow}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{name}</Text>
            </View>
            <View style={styles.switchContainer}>
                <Switch
                    style={styles.switch}
                    value={followed}
                    disabled={false}
                    onValueChange={(value) => {
                        if (value) {
                            console.log("follow " + index + " & " + name);
                            followZone()
                        } else {
                            console.log("unFollow " + index + " & " + name);
                            unFollowZone()
                        }
                    }}
                />
            </View>
        </View>
    )
}