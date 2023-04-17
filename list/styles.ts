import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    zoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        margin: 8,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    switch: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles