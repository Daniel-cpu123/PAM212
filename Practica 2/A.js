const persona = {
    nombre: "Ivan Isay",
    edad: 37,
    direccion: {
        ciudad: "Qro",
        pais: "MX"
    }
};

const {nombre, edad, direccion: {ciudad}} = persona;

console.log(`me llamo ${nombre}, tengo ${edad} años y vivo en ${ciudad}.`);