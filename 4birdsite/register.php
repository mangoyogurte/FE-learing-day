<?php
// 1.连
$con = mysqli_connect("localhost","root","","eatfan");

// 2.获id

$account = $_GET['account'];
$password = $_GET['password'];

// 3.创建sql数据

if($account==""&&$password=="")return;
if($account!="" && $password!=""){
    $sql="INSERT INTO account VALUES ( null,'". $account ."','".$password."')";
}

//执行sql并返回结果(insert返回true、false)
$res=mysqli_query($con, $sql);
if($res){
    echo 1;
}else{
    echo 'error';
    echo $sql;
}