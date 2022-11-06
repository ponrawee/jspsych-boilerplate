<?php

function pad_pId($pId) {
	$num = str_pad($pId, 5, '0', STR_PAD_LEFT);
	return $num;
}

function check_bad_path($savePath, $saveDir) {
	$realSaveDir = realpath($saveDir);
	if(substr(realpath(dirname($savePath)), 0, strlen($realSaveDir)) != $realSaveDir) {
		error_log(date("c")." Attempt to write at a bad path\n", 3, BASE_DIR."/error_log.txt");
		die();
	}
}

function filter_array_in_keys($arr, $filters) {
	$newArray = [];
	foreach($arr as $key => $value) {
		if(in_array($key, $filters)) {
			$newArray[$key] = $value;
		}
	};
	return $newArray;
}

function get_datetime() {
	return date('Ymd-Hi');
}

function make_file_name($pId, $dataInFileName, $ext='.csv', $suffix='') {
	$num = pad_pId($pId);
	$l = array_merge([$num], $dataInFileName, [$suffix]);
	$s = implode('_', $l);
	$s = trim($s, '_');
	$s .= $ext;
	return $s;
}

function make_pId_path($pId) {
	$num = pad_pId($pId);
	$pIdPath = implode('/', [BASE_DIR, $num]);
	return $pIdPath;
}

function make_save_dir_path($pId, $mode='data') {
	$saveDir = make_pId_path($pId);
	return $saveDir;
}

function save_to_file($obj, $fileName, $saveDir, $saveMode='a') {	
	$savePath = implode('/', [$saveDir, $fileName]);
	check_bad_path($savePath, $saveDir);
	$outfile = fopen($savePath, $saveMode);
	fwrite($outfile, sprintf($obj));
	fclose($outfile);
}

function load_json_input() {
	$json = @file_get_contents('php://input');
	$obj = json_decode($json, true);
	return $obj;
}

function safe_mkdir($dirPath) {
	return is_dir($dirPath) || mkdir($dirPath, 0777);
}

function convert_assoc_to_csv($obj, $keys) {
	$l = [];
	foreach($keys as $key) {
		if(!isset($obj[$key])) {
			$obj[$key] = '""';
		} else {
			if (is_array($obj[$key])) {
				$obj[$key] = json_encode($obj[$key]);
			}
			$obj[$key] = str_replace('"', '""', $obj[$key]);
			if (!is_numeric($obj[$key])) {
				$obj[$key] = '"'.$obj[$key].'"';
			}
		}
		array_push($l, $obj[$key]);
	}
	return implode(",", $l).PHP_EOL;
}