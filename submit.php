<?php 

    include 'dbconnect.php';


    $name = $_POST['name'];
    $design = $_POST['designation'];
    $location = $_POST['location'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $img = $_POST['image'];

    if($img == ""){
        $query = "SELECT image FROM profiledetails";
        $result = $conn->query($query);

        while ($row = $result->fetch_assoc()) {
            $img = $row['image'];        
        }
    }
    
    
    // Insert form data into a table
    // $sql = "INSERT INTO profiledetails (name, designation, location, company, email, image) VALUES ('$name', '$design', '$location', '$company', '$email', '$img')";
    $sql = "UPDATE profiledetails SET 
    name = '$name', 
    designation = '$design', 
    location = '$location', 
    company = '$company', 
    email = '$email', 
    image =  '$img' WHERE id=1";

    mysqli_query($conn, $sql);

    header("Location: ./");
    exit();

?>