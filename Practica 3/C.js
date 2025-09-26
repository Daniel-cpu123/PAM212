function simularPeticionAPI() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Datos recibidos correctamente");
    }, 5000); // espera 5 segundos
  });
}


// Función async que espera el resultado de la promesa
async function obtenerDatos() {
    console.log("Espedando datos de la API..");
  const resultado = await simularPeticionAPI(); // Espera la respuesta
  console.log(resultado); // Imprime el resultado
}

// Llamamos a la función async
obtenerDatos()
