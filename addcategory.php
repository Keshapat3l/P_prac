<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "shoppingcart";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if($conn->connect_error)
{
    die("Connection Failed : " . $con->connect_error);
}
?>







<?php include 'connection.php'; ?>
<html>
    <head>
        <title>
            Add Category
        </title>
    </head>
    <body>
        <center>
        <?php

            if(isset($_POST["btnsubmit"]))
            {  

                $ext = pathinfo($_FILES["category_image"]["name"],PATHINFO_EXTENSION);//png
                $newname = time().rand(1111,9999).rand(1111,9999).".".$ext;// 6152376151234.png
                move_uploaded_file($_FILES["category_image"]["tmp_name"], "uploads/".$newname);

                mysqli_query($conn,"SET NAMES 'utf8'");
                $result = mysqli_query($conn,"insert into categories (category_name, category_image) values('".$_POST["txtcategoryname"]."','".$newname."')") or die(mysqli_error($conn));

            if($result==true)
            {
                echo "Successfully Inserted !";
            }
            else
            {
                echo "Error";
            }
            }
        ?>
            <form method="POST" enctype="multipart/form-data">
                <br/>
                <h2>Add Category</h2>
                Category Name :
                <input type="text" name="txtcategoryname" />
                <br/><br/>
                Category Image :
                <input type="file" name="category_image" />
                <label>Choose Picture</label>
                <br/><br/>
                <button type="submit" name="btnsubmit">Submit</button>
            </form>
            <br/><br/>

            <h2>View Category</h2>
            <table border="1">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Category Name</td>
                        <td>Category Image</td>
                    </tr>
                <thead>
                <tbody>
                    <?php
                        $count = 1;
                        $result = mysqli_query($conn, "select * from categories")or die(mysqli_error($conn)); 
                        while($row = mysqli_fetch_assoc($result))
                        {
                    ?>
                        <tr>
                            <td><?php echo $count; $count++; ?></td>
                            <td><?php echo $row["category_name"]; ?></td>
                            <td><a href="uploads/<?php echo $row["category_image"]; ?>" target="_blank"><img src="uploads/<?php echo $row["category_image"]; ?>" class="rounded-circle" height="75" width="75"/></a></td>
                        </tr>
                    <?php        
                        }
                    ?>
                </tbody>    
            </table>
        </center>
        
    </body>
</html>


