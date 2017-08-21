<?php
// 1.连
$con = mysqli_connect("localhost","root","","eatfan");

// 2.获id

$account = $_GET['account'];
$password = $_GET['password'];

// 3.创建sql数据

if($account==""&&$password=="")return;
if($account!="" && $password!=""){
    $sql="select id from account where count=" .$account." and password=".$password;
}

//执行sql并返回结果
$res=mysqli_query($con, $sql);
if(mysqli_num_rows($res) > 0){
    $row = mysqli_fetch_assoc($res);
    echo $row["id"];
}else{
    echo 0;
    echo $sql;
}