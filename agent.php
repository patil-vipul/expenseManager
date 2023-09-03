<?php

if(!isset($_POST)){
    exit();
}
if($_POST["action"]=="getData"){
    $data = file_get_contents('userData.json');
    echo $data;
    exit();
}
if($_POST["action"]=="setData"){
    echo "In set data";
    file_put_contents('userData.json', json_encode($_POST["data"]));
    echo "DONE";
}else{
    echo "Elsing";
}

?>