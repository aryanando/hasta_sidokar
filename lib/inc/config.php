<?php
ini_set('date.timezone', 'Asia/Jakarta');
ini_set('display_errors', 0);
ini_set('max_execution_time',3600);
define("MAX_UPLOAD_FILE",51200000); //51200000 = 50Mb

define("DBTYPE","mysqli"); // mysql,oci8(for oracle),mssql,postgres,sybase
define("DBHOST","localhost");
define("DBUSER","batubhay_sidokar");
define("DBPASS","Hasta_sidokar@2024");
define("DBNAME","batubhay_sidokar_db");

$conn = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME);
mysqli_query($conn,"SET GLOBAL sql_mode = ''");
mysqli_set_charset($conn, 'utf8');
$db_conf = array(
					"type" 		=> DBTYPE,
					"server" 	=> DBHOST,
					"user" 		=> DBUSER,
					"password" 	=> DBPASS,
					"database" 	=> DBNAME
				);

define("INSTITUTION_CODE","{{institution_code}}");
define("INSTITUTION_NAME","{{institution_name}}");
define("SERVER_NAME","http://akreditasi.kars.or.id"); //Target Server
define('USER_SIKARS', ""); //Ganti dengan username yang digunakan untuk login pada SIKARS http://akreditasi.kars.or.id
define('PASSWORD_SIKARS', ""); //Ganti dengan password yang digunakan untuk login pada SIKARS http://akreditasi.kars.or.id
define("SIGNATURE","DGea for Indonesia");
define("UPLOAD_DIRECTORY","../../uploads");
define("SIDOKAF_UPLOAD_DIRECTORY","../../uploads/sidokars");
define("CAPTCHA",false);//Aktifkan penggunaan Captcha
define("IDLE_TIMEOUT",3600); //Sistem logout otomatis dalam hitungan second atau detik

/** Konfigurasi Indikator Mutu **/
define('INDICATOR_FILLED_DAY', "-7");

/** Konfigurasi Backup Data **/
define("BACKUP_DIR", $_SERVER['DOCUMENT_ROOT'] . "backup/");
define("MYSQLDUMP", "c:/xampp/mysql/bin/mysqldump.exe"); //Kalau di Linux: mysqldump

define("CURRENT_RELEASE_VERSION", "http://sismadak.kars.or.id/upgrade");
?>
