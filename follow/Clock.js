import React from "react";
import {Text, View} from "react-native";
import styles from "./styles";

export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState((state, props) => ({
            date: new Date(state.date.getTime() + 1000)
        }));
    }

    render() {
        const curDate = this.state.date
        return (
            <View style={styles.timeColum}>
                <Text>{curDate.toLocaleTimeString(
                    "en-us",
                    {
                        weekday: 'long',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour12: false,
                        timeZone: this.props.timeZone})}
                </Text>
            </View>
        );
    }
}