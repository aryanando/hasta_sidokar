<?php
/**
 * Developed by
 *
 * @author Diyurman Gea <dr.dgea@gmail.com> - Layanan Hosting: www.simpedak.com
 * @version 4.0.0
 * @license: 
 * 
 */
 
$username = "admin@kars.or.id"; //Akun untuk login ke SISMADAK
$password = "admin";
$signature = md5($username.md5($password));

$hoscode = "3173062";//Kode RS
$indicator_id = "1";//Kode Indikator, lihat tabel quality_indicator dan local_quality_indicator
$date   = "2022-05-24";//Tanggal Laporan
$variable_type="N";//N=Numerator; D=Denumerator
$department_id = "1"; //Kode Departemen, lihat tabel master_institution_department
$value = "110"; //Nilai yang mau dikirim

$modules = "imut_nasional";//imut_nasional; imut_lokal

$json[] = ['modules'=>$modules,'indicator_id'=>$indicator_id,'date'=>$date,'department_id'=>$department_id, 'variable_type'=>$variable_type,'value'=>$value];
$data = json_encode($json);
 
/** Lakukan penyimpanan data di Server SIKARS menggunakan Webservice **/
$headers = array(
    'X-HOSCODE: '.$hoscode .'',
    'X-SIKARS-KEY: '.$signature.'',
    'Content-Type: Application/x-www-form-urlencoded'
    );
  
$url = "http://localhost/sidokars-v4/application/ws/ws_imut_simrs.php"; //WebService IMUT
//curl_setopt($ch, CURLOPT_URL, "");
$ch = curl_init($url); 
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);  
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//curl_setopt($ch, CURLOPT_HTTPGET,1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$content = curl_exec($ch);
$err     = curl_error($ch);
curl_close($ch);      

$response = json_decode($content,true);
print_r($response);
?>

