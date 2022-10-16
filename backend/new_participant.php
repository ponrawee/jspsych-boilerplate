<?php
require_once __DIR__."/config.php";

$lastIdFilePath = BASE_DIR."/meta/last_id.txt";
$lastIdString = @file_get_contents($lastIdFilePath);

if($lastIdString === false) {
	$pId = 0;
} else {
	$pId = (int)$lastIdString;
	$pId += 1;
}

$r = ['pId' => $pId];

file_put_contents($lastIdFilePath, $pId);

header("Content-Type: application/json; charset=UTF-8");

echo json_encode($r);