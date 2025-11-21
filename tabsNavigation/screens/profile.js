import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function Profile({ navigation }) {
    return(
        <View style={styles.container}>
            <View style={styles.iconRow}>
                <Ionicons name='person-outline' size={28} color='green'/>
                <Text style={styles.title}> Perfil de Usuario </Text>
            </View>

            {/* BOTÓN PARA IR A DETALLES */}
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Detalle')}
            >
                <Text style={styles.btnText}>Detalles de usuario</Text>
        
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconRow: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 10,
    },
    btn: {
        marginTop: 30,
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
