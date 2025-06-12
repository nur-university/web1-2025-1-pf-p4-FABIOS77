document.addEventListener("DOMContentLoaded", () => {
    const imagenes = [
      "../img/image.png",
      "../img/image1.png",
      "../img/image2.png",
      "../img/image3.png"
    ];
  
    let indiceImagen = 0;
  

    document.getElementById("nombre-producto").textContent = "PS5 pro";
    document.getElementById("precio-producto").textContent = "Bs. 6.000";
    document.getElementById("texto-descripcion").textContent = "PS5 pro recién llegado, con un mando de regalo.";
    document.getElementById("texto-ubicacion").textContent = "Santa Cruz de la Sierra";
    document.getElementById("nombre-anunciante").textContent = "Juan R";
    document.getElementById("texto-estado").textContent = "Nuevo";
    document.getElementById("foto-anunciante").src = "../images/comprador3.png";
  

    function mostrarImagen(src) {
      document.getElementById("imagen-principal").src = src;
    }
  
    if (imagenes.length > 0) {
      mostrarImagen(imagenes[indiceImagen]);
      const mostrarFlechas = imagenes.length > 1;
      document.getElementById("btn-prev").style.display = mostrarFlechas ? "block" : "none";
      document.getElementById("btn-next").style.display = mostrarFlechas ? "block" : "none";
    }
  
    document.getElementById("btn-prev").addEventListener("click", () => {
      indiceImagen = (indiceImagen - 1 + imagenes.length) % imagenes.length;
      mostrarImagen(imagenes[indiceImagen]);
    });
  
    document.getElementById("btn-next").addEventListener("click", () => {
      indiceImagen = (indiceImagen + 1) % imagenes.length;
      mostrarImagen(imagenes[indiceImagen]);
    });

    

    document.getElementById("btn-enviar-mensaje").addEventListener("click", () => {
      const datosChatCompras = {
        modo: "compras",
        publicacionId: 101
      };
    
      localStorage.setItem("chat-pendiente", JSON.stringify(datosChatCompras));
      window.location.href = "chats.html";
    });
    


  });
  