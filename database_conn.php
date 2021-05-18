<?php

    $cleardb_url = parse_url(getenv("mysql://b560e0773ab690:0f3d34db@eu-cdbr-west-01.cleardb.com/heroku_81de4425bb3a4cc?reconnect=true"));
    $cleardb_server = "eu-cdbr-west-01.cleardb.com";
    $cleardb_username = "b560e0773ab690";
    $cleardb_password = "0f3d34db";
    $cleardb_db = "heroku_81de4425bb3a4cc";
    $active_group = 'default';
    $query_builder = TRUE;

    $conn = mysqli_connect($cleardb_server, $cleardb_username, $cleardb_password, "heroku_81de4425bb3a4cc");
    if($conn->connect_error){
        die("Failed to connect with MySQL: " . $conn -> connect_error);
    }
    else{
        echo "E bine!\n";
    }

//  $str = "SELECT * FROM information WHERE year = 2020 AND month = 5;";
//  $data = $conn->query($str);

//  $rows = $data->fetch_all(MYSQLI_ASSOC)[24]; 
//  echo "\n";
//  echo $rows['id'].' '.$rows['judet'].' '.$rows['total_someri'].' '.$rows['total_femei'].' '.$rows['total_barbati'].' '.$rows['indemnizati'].' '.$rows['neindemnizati'].' '.$rows['rata_somaj']
//             .' '.$rows['rata_somaj_femei'].' '.$rows['rata_somaj_barbati'].' '.$rows['total_urban'].' '.$rows['femei_urban'].' '.$rows['barbati_urban'].' '.$rows['total_rural'].' '.$rows['femei_rural'].' '.$rows['barbati_rural'].' '.$rows['fara_studii'].' '.$rows['invatamant_primar'].' '.$rows['invatamant_gimnazial'].' '.$rows['invatamant_liceal'].' '.$rows['invatamant_post'].' '.$rows['invatamant_profesional'].' '.$rows[
//             'invatamant_universitar'].' '.$rows['sub_25'].' '.$rows['25_29'].' '.$rows['30_39'].' '.$rows['40_49'].' '.$rows['50_55'].' '.$rows['peste_55'].' '.$rows['month'].' '.$rows['year'];

?>