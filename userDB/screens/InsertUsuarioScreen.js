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

    // Select - cargar usuarios desde la BD
    const cargarUsuarios = useCallback(async () => {
        try {
            setLoading(true);
            const data = await controller.obtenerUsuarios();
            setUsuarios(data);
            console.log(`${data.length} usuarios cargados`);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    //  Inicializar controlador y cargar datos
    useEffect(() => {

        const init = async () => {
            await controller.initialize();
            await cargarUsuarios();
        };

        init();

        // Avisar los cambios automaticos
        controller.addListener(cargarUsuarios);

        return () => {
            controller.removeListener(cargarUsuarios);
        };

    }, [cargarUsuarios]);

    
    // Insert - Agregar nuevo usuario
    const handleAgregar = async () => {
        if (guardando) return;

        try {
            setGuardando(true);
            const usuarioCreado = await controller.crearUsuario(nombre);
            Alert.alert(
                'Usuario Creado',
                `"${usuarioCreado.nombre}" guardado con ID: ${usuarioCreado.id}`
            );
            setNombre('');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setGuardando(false);
        }
    };

    
    //  Renderizar cada usuario
    
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

    // Render UI
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Usuarios</Text>

            {/* Input */}
            <TextInput
                style={styles.input}
                placeholder="Escribe un nombre"
                value={nombre}
                onChangeText={setNombre}
            />

            {/* Botón Agregar */}
            <TouchableOpacity style={styles.addButton} onPress={handleAgregar}>
                <Text style={styles.addButtonText}>
                    {guardando ? 'Guardando...' : 'Agregar Usuario'}
                </Text>
            </TouchableOpacity>

            {/* Cargando */}
            {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={usuarios}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderUsuario}
                    style={{ marginTop: 20 }}
                />
            )}

        </View>
    );
}


//      ESTILOS

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
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

    userItem: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },

    userNumber: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    userNumberText: {
        fontSize: 18,
        fontWeight: 'bold'
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
