<?php 
    include 'dbconnect.php';

    $query = "SELECT * FROM profiledetails";

    $result = $conn->query($query);

    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Return the data in JSON format
    header('Content-Type: application/json');
    echo json_encode($data);

    // Close the database connection
    $conn->close();


?>