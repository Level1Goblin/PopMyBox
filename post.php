<?php

$whiteCard = htmlspecialchars($_POST['card--white']);
$pinkCard = htmlspecialchars($_POST['card--pink']);
$secondPinkCard = htmlspecialchars($_POST['card--secondPink']);

$sendFields = 'Field6=' . $whiteCard . '&Field4='. $pinkCard .'&Field5=' . $secondPinkCard;

$curl = curl_init('https://level1goblin.wufoo.com/api/v3/forms/z1e8z52q0zyqi6a/entries.json');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_USERPWD, 'ZWO5-BVQD-2QHD-1MJ4:footastic');
curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_USERAGENT, 'Wufoo Sample Code');

curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $sendFields);

$response = curl_exec($curl);
$resultStatus = curl_getinfo($curl);

if($resultStatus['http_code'] == 201) {
    $json = json_decode($response);
    echo json_encode($json, JSON_PRETTY_PRINT);
} else {
    echo 'Call Failed '.print_r($resultStatus);
}
?>
