<?php

    $conn=mysqli_connect('sophia.cs.hku.hk', 'xlai', '255511', 'xlai') or die ('Error! '.mysqli_error($conn));

    mysqli_select_db($conn, 'xlai') or die('Error! '. mysqli_error($conn));

	$value = $_POST['newValue'];

	$query = "update attendancelist set attendOrNot = '$value' where id=".$_POST['id'];

	mysqli_query($conn, $query) or die ('Query Error! '.mysqli_error($conn));

	print $value;
?>