import React from "react";
import {Text} from "react-native";

export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
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
        return (
            <Text>{this.state.date.toLocaleTimeString("en-US", {timeZone: this.props.timeZone})}</Text>
        );
    }
}