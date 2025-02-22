$(document).ready(function () {
    var map = L.map('map').setView([20, 0], 2); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

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

    function showResults(data) {
        $('#results').show();
        $('#resultList').empty();
        
        data.forEach(function(result) {
            $('#resultList').append('<li>' + result.location + ': ' + result.status + '</li>');
        });
    }

    function updateMap(data) {
        data.forEach(function(result) {
            var statusColor = result.status === 'OK' ? 'green' : 'red';
            L.circleMarker([result.latitude, result.longitude], {
                color: statusColor,
                radius: 10
            }).addTo(map);
        });
    }

    $('#dnsForm').submit(function (event) {
        event.preventDefault();
        var domain = $('#domain').val();
        fetchDNSPropagation(domain);
    });
});
