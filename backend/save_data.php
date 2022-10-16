<?php
require_once "config.php";
require_once "utils.php";
require_once "globals.php";

$inp = load_json_input();

in_array($inp['mode'], ['all', 'checkpoint']) or die();
$mode = $inp['mode'];

$pId = (int) $inp['pId'];
$platformId = $inp['platformId'];
$condition = $inp['condition'];

$rawData = $inp['data'];

$fileName = make_file_name($pId, [$mode, $condition, $platformId]);

if($mode == 'checkpoint') {
	$data = filter_array_in_keys($rawData, $includedKeys);
	$csv = convert_assoc_to_csv($data, $includedKeys);
} elseif($mode == 'all') {
	is_string($rawData) or die();
	$csv = $rawData;
}

save_to_file($csv, $fileName, BASE_DIR);

header('Content-Type: application/json');
header($_SERVER['SERVER_PROTOCOL']." 200 OK");

echo json_encode([
	'success' => true
]);
