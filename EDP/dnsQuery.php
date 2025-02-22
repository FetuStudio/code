<?php
if(isset($_GET['domain'])) {
    $domain = $_GET['domain'];
    
    // Este es un ejemplo simulado de los resultados de la propagación DNS
    // En un proyecto real deberías usar una API de DNS o algún servicio para obtener datos en tiempo real.
    $results = [
        ['location' => 'Estados Unidos', 'status' => 'OK', 'latitude' => 37.0902, 'longitude' => -95.7129],
        ['location' => 'Reino Unido', 'status' => 'OK', 'latitude' => 51.5074, 'longitude' => -0.1278],
        ['location' => 'Brasil', 'status' => 'Falla', 'latitude' => -14.2350, 'longitude' => -51.9253],
        ['location' => 'Australia', 'status' => 'OK', 'latitude' => -25.2744, 'longitude' => 133.7751]
    ];

    // Convertir el array a formato JSON
    echo json_encode($results);
}
?>
