<?php
if (isset($_GET['domain'])) {
    $domain = $_GET['domain'];

    // Realizamos una consulta de tipo CNAME usando dns_get_record()
    $records = dns_get_record($domain, DNS_CNAME);

    // Si no hay registros CNAME, mostramos un mensaje
    if (empty($records)) {
        echo json_encode(['status' => 'No se encontraron registros CNAME para ' . $domain]);
    } else {
        $results = [];
        foreach ($records as $record) {
            $results[] = [
                'cname' => $record['target'],  // El valor de destino del CNAME
                'domain' => $domain
            ];
        }
        
        // Devolvemos los resultados como JSON
        echo json_encode($results);
    }
}
?>
