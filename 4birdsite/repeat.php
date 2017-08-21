<?php
// 1.连
$con = mysqli_connect("localhost","root","","eatfan");

// 2.获id

$account = $_GET['account'];

// 3.创建sql数据

if($account=="")return;
if($account!=""){
    $sql="select * from account where count=" .$account;
}

//执行sql并返回结果
$res=mysqli_query($con, $sql);
if(mysqli_num_rows($res) > 0){
    echo 0;
}else{
    echo 1;
}