function verificarUsuario(usuario) {
  return new Promise((resolve, reject) => { //Promesa verifica si el usuario es "admin"
    if (usuario == "admin") {
      resolve("Acceso concedido");
    } 
    else {
      reject("Acceso denegado");
    }
  });
}
// Usamos .then() y .catch() para manejar la promesa
verificarUsuario("admin")  
  .then(res => console.log(res)) 
  .catch(err => console.error(err));

verificarUsuario("Ivan")
  .then(res => console.log(res))
  .catch(err => console.error(err));
