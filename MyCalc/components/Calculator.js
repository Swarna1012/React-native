import React,{useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import CalculatorButton from "./CalculatorButton";

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const clearInput= () =>{
        setInput('');
        setResult('');
    };

    const handleButtonPress = (value) => {
        setInput(input+value);
        //setResult(result);
    };

    const calculateResult = () => {
        try {
            const expression = input.replace(/[^-()\d/*+.]/g, '');
            const calc_result = evalExpression(expression);
            setInput(calc_result);
            setResult(calc_result.toString());
        } catch(error) {
            setInput('')
            setResult('Error');
        }
    };

    const remove_value = (value) => {
        setInput(input.slice(0,-1));
        setResult(result.slice(0,-1));
    }

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '(', ')', '+',
        '.', 'D', 'C', '='
    ];

    const evalExpression = () => {
        const operations = [
            { regex: /(\d+)\/(\d+)/g, fn: (match, a, b) => parseInt(a) / parseInt(b)},
            { regex: /(\d+)\*(\d+)/g, fn: (match, a, b) => parseInt(a) * parseInt(b)},
            { regex: /(\d+)\+(\d+)/g, fn: (match, a, b) => parseInt(a) + parseInt(b)},
            { regex: /(\d+)\-(\d+)/g, fn: (match, a, b) => parseInt(a) - parseInt(b)},
        ];

        while(expression.includes('(')){
            expression = expression.replace(/\(([^()]+)\)/g, (_, innerExpression) => {
                return evalExpression(innerExpression);
            });

            operations.forEach(({regex,fn}) => {
                expression = expression.replace(regex,fn);
            });

            return expression;
        };

    }

    return(
        <View style={styles.container }>
            <Text style={styles.input}>{input}</Text>
            <Text style={styles.result}>{result}</Text>
            <View style={styles.buttonContainer}>
                {buttons.map((button,index) => (
                    <CalculatorButton
                        key={index}
                        title= {button}
                        onPress={() => {
                            if(button === 'C'){
                                clearInput();
                            } else if(button === '='){
                                calculateResult();
                            } else if(button === 'D'){
                                remove_value(button);
                            }else {
                                handleButtonPress(button);
                            }
                        }}
                    />
                ))}
            </View>
        </View>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    input: {
        fontSize: 50,
        color: "#e0b3a7",
        
        
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        bottom: 50,
        padding: 12
    },
    result: {
        fontSize: 70
    }
}
)

export default Calculator;