class InicioPAM {
    desplegarReglamentoPAM(){
        //la variable contenedor consigue en el DOM al div con id "contenido" y innerHTML lo modifica.
        const contenedor = document.getElementById("contenido");
        contenedor.innerHTML = " <h1>Reglamento</h1><ol><li>Participación activa en clase</li><li>Trabajos en classroom </li><li>Entregas completas</li><li>Respetar tiempos de entrega </li><li>Presentación de trabajo calidad universitaria</li></ol>";
    }

