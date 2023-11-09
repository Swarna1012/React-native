import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

const CalculatorButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        backgroundColor: "#ffe5e2",
        borderRadius:40
    },

    buttonText: {
        fontSize: 36
    }
})

export default CalculatorButton;