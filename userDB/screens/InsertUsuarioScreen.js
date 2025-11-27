import { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Platform
} from 'react-native';

import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();

export default function UsuarioView() {

    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);

    const cargarUsuarios = useCallback(async () => {
        try {
            setLoading(true);
            const data = await controller.obtenerUsuarios();
            setUsuarios(data);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            await controller.initialize();
            await cargarUsuarios();
        };

        init();

        controller.addListener(cargarUsuarios);
        return () => controller.removeListener(cargarUsuarios);

    }, [cargarUsuarios]);

    const handleAgregar = async () => {
        if (guardando) return;

        try {
            setGuardando(true);
            const usuarioCreado = await controller.crearUsuario(nombre);
            Alert.alert('Usuario Creado', `"${usuarioCreado.nombre}" guardado con ID: ${usuarioCreado.id}`);
            setNombre('');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setGuardando(false);
        }
    };

    const renderUsuario = ({ item, index }) => (
        <View style={styles.userItem}>
            <View style={styles.userNumber}>
                <Text style={styles.userNumberText}>{index + 1}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nombre}</Text>
                <Text style={styles.userId}>ID: {item.id}</Text>

                <Text style={styles.userDate}>
                    {new Date(item.fechaCreacion).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            {/* ======= TÍTULO PRINCIPAL ======= */}
            <Text style={styles.mainTitle}>INSERT & SELECT</Text>
            <Text style={styles.subTitle}>iOS (SQLite)</Text>

            {/* ======= TARJETA INSERTAR USUARIO ======= */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Insertar Usuario</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Escribe el nombre del usuario"
                    value={nombre}
                    onChangeText={setNombre}
                />

                <TouchableOpacity style={styles.addButton} onPress={handleAgregar}>
                    <Text style={styles.addButtonText}>
                        {guardando ? 'Guardando...' : 'Agregar Usuario'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* ======= LISTA DE USUARIOS ======= */}
            <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Lista de Usuarios</Text>

                <TouchableOpacity onPress={cargarUsuarios}>
                    <Text style={styles.reloadText}>Recargar</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={usuarios}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderUsuario}
                    style={{ marginTop: 10 }}
                />
            )}

        </View>
    );
}


// =================== ESTILOS ===================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 80 : 50,  
        backgroundColor: '#F5F6FA'
    },

    mainTitle: {
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 4
    },

    subTitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20
    },

    /* Tarjeta */
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 20
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },

    addButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center'
    },

    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },

    /* Lista */
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    reloadText: {
        color: '#007AFF',
        fontWeight: '600'
    },

    userItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2
    },

    userNumber: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    userNumberText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF'
    },

    userInfo: {
        flex: 1
    },

    userName: {
        fontSize: 18,
        fontWeight: '600'
    },

    userId: {
        color: '#555'
    },

    userDate: {
        color: '#888',
        marginTop: 4,
        fontStyle: 'italic'
    }
});
