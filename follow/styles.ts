import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        margin: 8,
    },
    infoRowName: {
        flex: 1,
    },
    infoRowButton: {
        flex: 1,
    },
    infoRowTime: {
        flex: 2,
    },
    timeColum: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },
});

export default styles