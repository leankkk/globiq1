connect2Server();


let objetoAEnviar = {
    input: {
      comparacion: "mayor",
      valor: 10,
      categoria: "poblacion"
    },
    pais: "Argentina",
    listaposibles: ["Brasil", "Chile"],
    listadescartados: ["Uruguay"]
  };
  
  
  postEvent("evaluarPregunta", objetoAEnviar, (respuesta) => {
    console.log("Respuesta del backend:", respuesta);
  });
  