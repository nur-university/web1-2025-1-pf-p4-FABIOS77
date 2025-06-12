document.addEventListener('DOMContentLoaded', () => {
    const panelChat = document.getElementById('panel-chat');
    const btnVentas = document.getElementById('btn-ventas');
    const btnCompras = document.getElementById('btn-compras');
    const seccionConversaciones = document.getElementById('seccion-conversaciones');
    const seccionChat = document.getElementById('seccion-chat');
  
    const listaPublicaciones = document.getElementById('lista-publicaciones');
    const listaConversaciones = document.getElementById('lista-conversaciones');
    const mensajesChat = document.getElementById('mensajes-chat');
    const datosGuardados = localStorage.getItem("chat-pendiente");
  
    
    const publicaciones = [
      { id: 1, titulo: 'PS5 Pro + Mando', img: '../images/images.png' },
      { id: 2, titulo: 'iPhone 14 Nuevo', img: '../images/image2.png' },
      { id: 3, titulo: 'Laptop Gamer ASUS', img: '../images/image3.png' }
    ];
  
    const conversaciones = [
      { id: 'u1', nombre: 'Carlos R.', img: '../images/comprador.png', ultimo: '¿Está disponible?', fecha: '10/06/2025' },
      { id: 'u2', nombre: 'Pepe G.', img: '../images/comprador2.png', ultimo: 'Gracias por responder', fecha: '09/06/2025' }
    ];
  
    const mensajes = [
      { autor: 'otro', texto: 'Hola, ¿sigue disponible?'},
      { autor: 'yo', texto: 'Sí, ¿te interesa?'},
      { autor: 'otro', texto: '¿Aceptas cambios?'},
      { autor: 'yo', texto: 'Depende, ¿qué ofreces?'},
      { autor: 'otro', texto: 'Una Xbox y dinero.'},
      { autor: 'yo', texto: 'Me interesa. ¿Dónde estás?'},
      { autor: 'otro', texto: 'En Santa Cruz.'}
    ];
    
    const publicacionesCompras = [
        { id: 101, titulo: 'PS5 Pro + Mando', img: '../images/images.png' },
        { id: 102, titulo: 'Audífonos Gamer', img: '../images/image11.png' },
        { id: 103, titulo: 'Teclado Mecánico RGB', img: '../images/teclado.png' }
      ];

    const mensajesComprador = [
        { autor: 'yo', texto: 'Hola, ¿aún disponible?', img: '../images/vendedor.png' },
        { autor: 'otro', texto: 'Sí, claro.', img: '../images/comprador3.png' },
        { autor: 'yo', texto: '¿Lo podrías enviar a La Paz?', img: '../images/vendedor.png' },
        { autor: 'otro', texto: 'Sí, envío por FedEx.', img: '../images/comprador3.png' },
        { autor: 'yo', texto: 'Perfecto, me interesa.', img: '../images/vendedor.png' }
      ];
 
    publicaciones.forEach(pub => {
      const li = document.createElement('li');
      li.classList.add('item-publicacion');
      li.dataset.idPublicacion = pub.id;
      li.innerHTML = `
        <img src="${pub.img}" alt="Imagen" class="img-publicacion">
        <span class="titulo-publicacion">${pub.titulo}</span>
      `;
      li.addEventListener('click', () => {
        activarConversaciones(pub);
      });
      listaPublicaciones.appendChild(li);
    });
  

    btnVentas.addEventListener('click', () => {
        marcarActivo(btnVentas);
        window.location.reload();
      });
      
     btnCompras.addEventListener('click', () => {
        marcarActivo(btnCompras);
        cargarModoCompras();
      });
      
      
    function marcarActivo(botonActivo) {
        document.querySelectorAll('.btn-chats').forEach(btn => btn.classList.remove('activa'));
        botonActivo.classList.add('activa');
      }


    function activarConversaciones(publicacion) {
      seccionConversaciones.hidden = false;
      seccionChat.hidden = true;
      panelChat.className = 'con-dos-secciones';
  
      
      document.querySelectorAll('.item-publicacion').forEach(el => el.classList.remove('activa'));
      document.querySelector(`.item-publicacion[data-id-publicacion="${publicacion.id}"]`)?.classList.add('activa');
  
  
      listaConversaciones.innerHTML = '';
      conversaciones.forEach(conv => {
        const li = document.createElement('li');
        li.classList.add('item-conversacion');
        li.dataset.idUsuario = conv.id;
        li.innerHTML = `
          <img src="${conv.img}" alt="Img usuario" class="img-usuario">
          <div class="info-usuario">
            <p class="nombre-usuario">${conv.nombre}</p>
            <p class="ultimo-mensaje">${conv.ultimo}</p>
          </div>
          <span class="fecha-mensaje">${conv.fecha}</span>
        `;
        li.addEventListener('click', () => {
          activarChat(conv, publicacion);
        });
        listaConversaciones.appendChild(li);
      });
    }
  
    
    function activarChat(usuario, publicacion) {
      seccionChat.hidden = false;
      panelChat.className = 'tres-secciones';
  
      
      document.querySelectorAll('.item-conversacion').forEach(el => el.classList.remove('activa'));
      document.querySelector(`.item-conversacion[data-id-usuario="${usuario.id}"]`)?.classList.add('activa');
  
      
      document.querySelector('.titulo-publicacion-chat').textContent = publicacion.titulo;
      document.querySelector('.img-publicacion-chat').src = publicacion.img;
  
      document.querySelector('.nombre-usuario-chat').textContent = usuario.nombre;


      mensajesChat.innerHTML = '';
      mensajes.forEach(m => {
        const div = document.createElement('div');
        div.classList.add('mensaje', m.autor === 'yo' ? 'mensaje-propio' : 'mensaje-otro');
        const imgSrc = m.autor === 'yo' ? '../images/vendedor.png' : usuario.img;
        div.innerHTML = `
            ${m.autor === 'yo' ? '' : `<img src="${imgSrc}" alt="img">`}
            <p class="texto-mensaje">${m.texto}</p>
            ${m.autor === 'yo' ? `<img src="${imgSrc}" alt="img">` : ''}
        `;
        mensajesChat.appendChild(div);
      });
    }
  
    function cargarModoCompras() {
        listaPublicaciones.innerHTML = '';
        publicacionesCompras.forEach(pub => {
          const li = document.createElement('li');
          li.classList.add('item-publicacion');
          li.dataset.idPublicacion = pub.id;
          li.innerHTML = `
            <img src="${pub.img}" alt="Imagen" class="img-publicacion">
            <span class="titulo-publicacion">${pub.titulo}</span>
          `;
          li.addEventListener('click', () => {
            mostrarChatCompras(pub);
          });
          listaPublicaciones.appendChild(li);
        });
      
        
        activarSoloPublicaciones();
      }
      
      function mostrarChatCompras(publicacion) {
        seccionConversaciones.hidden = true;
        seccionChat.hidden = false;
        panelChat.className = 'con-dos-secciones';
      
        document.querySelectorAll('.item-publicacion').forEach(el => el.classList.remove('activa'));
        document.querySelector(`.item-publicacion[data-id-publicacion="${publicacion.id}"]`)?.classList.add('activa');
      
        document.querySelector('.titulo-publicacion-chat').textContent = publicacion.titulo;
        document.querySelector('.img-publicacion-chat').src = publicacion.img;
      
        document.querySelector('.nombre-usuario-chat').textContent = 'Juan R';

        mensajesChat.innerHTML = '';
        mensajesComprador.forEach(m => {
          const div = document.createElement('div');
          div.classList.add('mensaje', m.autor === 'yo' ? 'mensaje-propio' : 'mensaje-otro');
          div.innerHTML = `
            ${m.autor === 'yo' ? '' : `<img src="${m.img}" alt="img">`}
            <p class="texto-mensaje">${m.texto}</p>
            ${m.autor === 'yo' ? `<img src="${m.img}" alt="img">` : ''}
          `;
          mensajesChat.appendChild(div);
        });
      }
      
    
    function activarSoloPublicaciones() {
      seccionConversaciones.hidden = true;
      seccionChat.hidden = true;
      panelChat.className = 'solo-publicaciones';
    }
  
    activarSoloPublicaciones();
    marcarActivo(btnVentas);

    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      localStorage.removeItem("chat-pendiente");
    
      if (datos.modo === "compras") {
        marcarActivo(btnCompras);
        cargarModoCompras();
        setTimeout(() => {
          const ps5 = publicacionesCompras.find(p => p.id === datos.publicacionId);
          if (ps5) mostrarChatCompras(ps5);
        }, 50);
      }
    }
  });
  