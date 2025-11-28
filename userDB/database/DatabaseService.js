import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
    constructor() {
        this.db = null;
        this.storageKey = 'usuarios';
    }

    async initialize() {
        if (Platform.OS === 'web') {
            console.log('Usando LocalStorage');
        } else {
            console.log('Usando SQLite en móvil');
            this.db = await SQLite.openDatabaseAsync('miapp.db');

            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);
        }
    }

    //     OBTENER TODOS
    async getAll() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } else {
            return await this.db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC');
        }
    }

    //        AGREGAR
    async add(nombre) {
        if (Platform.OS === 'web') {

            const usuarios = await this.getAll();

            const nuevoUsuario = {
                id: Date.now(),
                nombre,
                fecha_creacion: new Date().toISOString()
            };

            usuarios.unshift(nuevoUsuario);
            localStorage.setItem(this.storageKey, JSON.stringify(usuarios));

            return nuevoUsuario;

        } else {

            const result = await this.db.runAsync(
                'INSERT INTO usuarios(nombre) VALUES(?)',
                nombre
            );

            return {
                id: result.lastInsertRowId,
                nombre,
                fecha_creacion: new Date().toISOString()
            };
        }
    }

    //       ACTUALIZAR
    async update(id, nuevoNombre) {
        if (Platform.OS === 'web') {

            const usuarios = await this.getAll();

            const nuevos = usuarios.map(u => {
                if (Number(u.id) === Number(id)) {
                    return { ...u, nombre: nuevoNombre };
                }
                return u;
            });

            localStorage.setItem(this.storageKey, JSON.stringify(nuevos));
            return true;

        } else {

            await this.db.runAsync(
                'UPDATE usuarios SET nombre = ? WHERE id = ?',
                [nuevoNombre, id]
            );
            return true;
        }
    }

    //        ELIMINAR
    async delete(id) {
        if (Platform.OS === 'web') {

            let usuarios = await this.getAll();

            // Se convierte a número porque LocalStorage guarda ID como string
            usuarios = usuarios.filter(u => Number(u.id) !== Number(id));

            localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
            return true;

        } else {

            await this.db.runAsync('DELETE FROM usuarios WHERE id = ?', id);
            return true;
        }
    }
}

export default new DatabaseService();
