import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ButtonComp() {
    return (
        <>
            <TouchableOpacity style={styles.button} onPress={() => alert('Button pressed')}>
                <Text style={styles.buttonText}>Button</Text>
            </TouchableOpacity>
        </>

    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
