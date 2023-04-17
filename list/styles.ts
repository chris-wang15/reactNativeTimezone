import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        flexDirection: 'column'
    },
    searchContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
    },
    searchInput: {
        flex: 2,
        marginEnd: 8,
    },
    searchButton: {
        flex: 1,
        marginEnd: 8,
    },
    zoneRow: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 8,
    },
    titleContainer: {
        flex: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchContainer: {
        flex: 1,
    },
    switch: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles