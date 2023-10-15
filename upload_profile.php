<?php

if(is_array($_FILES)) {
    if(isset($_FILES['userImage']['tmp_name']) && is_uploaded_file($_FILES['userImage']['tmp_name'])) {
        $sourcePath = $_FILES['userImage']['tmp_name'];
        $targetPath = "img/".$_FILES['userImage']['name'];
        if(move_uploaded_file($sourcePath,$targetPath)) {
            
            echo $_FILES['userImage']['name'];
            exit();
        }
    }
}


//the above function will delete the required image from your folder.

if(is_array($_FILES)) {
  if(isset($_REQUEST['remove_image'])){
      $img = $_REQUEST['remove_image'];
      $imgpath = 'img/'.$img;
      unlink( $imgpath );
  }
}

?>