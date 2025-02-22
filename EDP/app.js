$(document).ready(function () {
    // Inicializar el mapa de Leaflet
    var map = L.map('map').setView([20, 0], 2); // Vista centrada en el mundo

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Función para obtener resultados de propagación DNS
    function fetchDNSPropagation(domain) {
        $.ajax({
            url: 'dnsQuery.php',
            type: 'GET',
            data: { domain: domain },
            success: function(response) {
                var data = JSON.parse(response);
                showResults(data);
                updateMap(data);
            },
            error: function() {
                alert("Hubo un error al consultar la propagación DNS.");
            }
        });
    }

    // Mostrar los resultados de la propagación
    function showResults(data) {
        $('#results').show();
        $('#resultList').empty();
        
        data.forEach(function(result) {
            $('#resultList').append('<li>' + result.location + ': ' + result.status + '</li>');
        });
    }

    // Actualizar el mapa con las ubicaciones de los servidores DNS
    function updateMap(data) {
        data.forEach(function(result) {
            var statusColor = result.status === 'OK' ? 'green' : 'red';
            L.circleMarker([result.latitude, result.longitude], {
                color: statusColor,
                radius: 10
            }).addTo(map);
        });
    }

    // Enviar formulario
    $('#dnsForm').submit(function (event) {
        event.preventDefault();
        var domain = $('#domain').val();
        fetchDNSPropagation(domain);
    });
});
