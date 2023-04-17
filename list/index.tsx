import * as SQLite from 'expo-sqlite';
import {FlatList, Switch, Text, View} from "react-native";
import {useEffect, useState} from "react";
import styles from "./styles";
import zonesList from "./zonesList";

const ListPage = (
    props: { db: SQLite.WebSQLDatabase; }
) => {
    const db: SQLite.WebSQLDatabase = props.db
    return (
        <View style={styles.container}>
            <FlatList
                data={zonesList}
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

    useEffect(() => {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM zones where id = ?', [index],
                    (txObj, resultSet) => {
                        console.log(index + " / " + name + ": " + resultSet.rows.length);
                        setFollowed(resultSet.rows.length > 0);
                    },
                    (txObj, error) => {
                        console.log(error);
                        return true;
                    }
                );
            });
        }, []
    );

    const unFollowZone = () => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM names where id = ?', [index],
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
            tx.executeSql('INSERT IGNORE INTO zones (id, name) values (?, ?)', [index, name],
                (txObj, resultSet) => {
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
            <Text style={styles.title}>{name}</Text>
            <Switch
                style={styles.switch}
                value={followed}
                disabled={false}
                onValueChange={(value) => {
                    if (value) {
                        console.log("follow " + index + " / " + name);
                        followZone()
                    } else {
                        console.log("unFollow " + index + " / " + name);
                        unFollowZone()
                    }
                }}
            />
        </View>
    )
}