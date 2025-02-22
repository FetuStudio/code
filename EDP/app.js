$(document).ready(function () {
    // Inicializar el mapa de Leaflet
    var map = L.map('map').setView([20, 0], 2); // Vista centrada en el mundo

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Función para obtener resultados de la propagación DNS
    function fetchDNSPropagation(domain) {
        $.ajax({
            url: 'dnsQuery.php',
            type: 'GET',
            data: { domain: domain },
            success: function(response) {
                var data = JSON.parse(response);
                showResults(data);
            },
            error: function() {
                alert("Hubo un error al consultar los registros DNS.");
            }
        });
    }

    // Mostrar los resultados de la consulta CNAME
    function showResults(data) {
        $('#results').show();
        $('#resultList').empty();
        
        if (data.status) {
            $('#resultList').append('<li>' + data.status + '</li>');
        } else {
            data.forEach(function(result) {
                $('#resultList').append('<li>' + result.domain + ' tiene un CNAME que apunta a: ' + result.cname + '</li>');
            });
        }
    }

    // Enviar formulario
    $('#dnsForm').submit(function (event) {
        event.preventDefault();
        var domain = $('#domain').val();
        fetchDNSPropagation(domain);
    });
});
