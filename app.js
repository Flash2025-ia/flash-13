let nombre = '';
let opcion = '';

setTimeout(() => {
  document.getElementById('pantalla-video').style.display = 'none';
  document.getElementById('pantalla-01').style.display = 'flex';
}, 3000);

function aceptarNombre() {
  nombre = document.getElementById('nombreUsuario').value.trim();
  if (nombre === '') {
    alert('Por favor ingresa tu nombre');
    return;
  }
  document.getElementById('pantalla-01').style.display = 'none';
  document.getElementById('saludo').innerText = `Hola ${nombre}, ¿qué deseas hacer hoy?`;
  document.getElementById('pantalla-02').style.display = 'flex';
}

function seleccionarOpcion(op) {
  opcion = op;
  if (op === 'Taxi' || op === 'Mototaxi') {
    document.getElementById('pantalla-02').style.display = 'none';
    document.getElementById('pantalla-03').style.display = 'flex';
  } else {
    enviarSolicitudConGPS(`Hola, soy ${nombre}. Solicito ${opcion}.`);
  }
}

function solicitarGPS(callback, fallback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        callback(lat, lon);
      },
      error => {
        console.error('Error obteniendo ubicación', error);
        fallback();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    console.error('Geolocalización no soportada');
    fallback();
  }
}

function solicitarGPSDestino() {
  const destino = document.getElementById('destino').value.trim();
  if (destino === '') {
    alert('Por favor ingresa tu destino');
    return;
  }
  enviarSolicitudConGPS(`Hola, soy ${nombre}. Deseo un ${opcion} hacia: ${destino}.`);
}

function enviarSolicitudConGPS(mensajeBase) {
  solicitarGPS(
    (lat, lon) => {
      const linkMaps = `https://maps.google.com/?q=${lat},${lon}`;
      const mensaje = `${mensajeBase} Mi ubicación es: ${linkMaps}`;
      enviarWhatsApp(mensaje);
    },
    () => {
      const mensaje = `${mensajeBase} (No se pudo obtener ubicación)`;
      enviarWhatsApp(mensaje);
    }
  );
}

function enviarWhatsApp(mensaje) {
  const numero = '573204006436'; // Número de destino
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.location.href = url;
}
