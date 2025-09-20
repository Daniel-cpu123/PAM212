const personas = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Luis", edad: 30 },
    { nombre: "Maria", edad: 28 }
];

const nombreLuis = personas.find(persona => persona.nombre == "Luis").nombre; //Imprimir nada mas el nombre de Luis
console.log(nombreLuis);

const nombrePersonas = personas.forEach(persona => { // Imprimir todos los nombres
    console.log(persona.nombre);
});

const edadesSuma = personas.reduce((total, persona) => total + persona.edad, 0); 
console.log(edadesSuma);


