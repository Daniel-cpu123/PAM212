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
    Platform,
    Modal
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();

export default function UsuarioView() {

    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [editNombre, setEditNombre] = useState('');
    const [editId, setEditId] = useState(null);

    // CARGAR USUARIOS
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

    // AGREGAR
    const handleAgregar = async () => {
        if (guardando) return;

        try {
            setGuardando(true);
            await controller.crearUsuario(nombre);
            Alert.alert("Usuario Creado", "El usuario fue agregado correctamente.");
            setNombre('');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setGuardando(false);
        }
    };

    // ABRIR MODAL
    const abrirModal = (usuario) => {
        setEditId(usuario.id);
        setEditNombre(usuario.nombre);
        setModalVisible(true);
    };

    // ACTUALIZAR
    const handleActualizar = async () => {
        try {
            await controller.actualizarUsuario(editId, editNombre);
            Alert.alert("Actualizado", "Usuario actualizado correctamente");
            setModalVisible(false);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    // ELIMINAR
    const handleEliminar = async () => {
        // En WEB: usamos window.confirm porque Alert no soporta botones
        if (Platform.OS === 'web') {
            const confirmado = window.confirm('¿Deseas eliminar este usuario?');
            if (!confirmado) return;

            try {
                await controller.eliminarUsuario(editId);
                Alert.alert("Eliminado", "Usuario eliminado correctamente");
                setModalVisible(false);
            } catch (error) {
                Alert.alert("Error", error.message);
            }
            return;
        }

        // En MÓVIL: usamos Alert con botones
        Alert.alert(
            "Confirmar Eliminación",
            "¿Deseas eliminar este usuario?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await controller.eliminarUsuario(editId);
                            Alert.alert("Eliminado", "Usuario eliminado correctamente");
                            setModalVisible(false);
                        } catch (error) {
                            Alert.alert("Error", error.message);
                        }
                    }
                }
            ]
        );
    };

    // RENDER ITEM
    const renderUsuario = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => abrirModal(item)}
            style={styles.userItem}
        >
            {/* Número de orden (1,2,3...) */}
            <View style={styles.userNumber}>
                <Text style={styles.userNumberText}>{index + 1}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nombre}</Text>
                <Text style={styles.userId}>ID: {item.id}</Text>
            </View>

            <Ionicons name="create-outline" size={22} color="#007AFF" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <Text style={styles.mainTitle}>CRUD DE USUARIOS</Text>
            <Text style={styles.subTitle}>SQLite (iOS/Android) y LocalStorage (Web)</Text>

            {/* FORM AGREGAR */}
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

            {/* LISTA */}
            <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Lista de Usuarios</Text>
                <TouchableOpacity onPress={cargarUsuarios}>
                    <Text style={styles.reloadText}>Recargar</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <FlatList
                    data={usuarios}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderUsuario}
                />
            )}

            {/* =============== MODAL =============== */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        
                        <Text style={styles.modalTitle}>Editar Usuario</Text>

                        <TextInput
                            style={styles.input}
                            value={editNombre}
                            onChangeText={setEditNombre}
                        />

                        {/* BOTÓN GUARDAR */}
                        <TouchableOpacity style={styles.addButton} onPress={handleActualizar}>
                            <Text style={styles.addButtonText}>Guardar Cambios</Text>
                        </TouchableOpacity>

                        {/* BOTÓN ELIMINAR */}
                        <TouchableOpacity style={styles.deleteButton} onPress={handleEliminar}>
                            <Text style={styles.deleteText}>Eliminar Usuario</Text>
                        </TouchableOpacity>

                        {/* CANCELAR */}
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 80 : 50,
        backgroundColor: '#F5F6FA'
    },

    mainTitle: {
        fontSize: 26,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 4
    },

    subTitle: {
        fontSize: 13,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20
    },

    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
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

    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        alignItems: 'center'
    },

    userNumber: {
        width: 40,
        alignItems: 'center'
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

    /* MODAL */
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalBox: {
        backgroundColor: '#fff',
        padding: 20,
        width: '85%',
        borderRadius: 12
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10
    },

    deleteButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FF3B30',
        alignItems: 'center'
    },

    deleteText: {
        color: '#fff',
        fontWeight: 'bold'
    },

    cancelText: {
        marginTop: 15,
        textAlign: 'center',
        color: '#007AFF',
        fontWeight: '600'
    }
});
