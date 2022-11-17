Views:-
(Student)

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
    <h3>Student List</h3>
    <button type="button" onclick="window.location.href='/addstudent'">Add New Student</button>
    <button type="button" onclick="window.location.href='/logout'">Logout</button>
    <table border="1">
        <thead>
            <tr>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Student Class</th>
                <th>Student Semester</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <% if(students.length == 0){%>
                <tr>
                    <td colspan="5">No Students Found</td>
                </tr>
            <% } %>
            <% for(var i=0; i<students.length; i++) { %>
                <tr>
                    <td><%= students[i].name %></td>
                    <td><%= students[i].email %></td>
                    <td><%= students[i].class %></td>
                    <td><%= students[i].semester %></td>
                    <td>
                        <a href="/updatestudent/<%= students[i]._id %>">Update</a>
                        <a href="/deletestudent/<%= students[i]._id %>">Delete</a>
                    </td>
                </tr>
            <% } %>
        </tbody>
    </table>
</body>
</html>

(login):-

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
    <h3>Login</h3>
    <form action="/login" method="POST">
        <input type="email" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Password">
        <input type="submit" value="Login">
        <a href="/register">Register</a>
    </form>
</body>
</html>

(register):-

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
    <h3>Register</h3>
    <form action="/register" method="POST">
        <input type="text" name="name" placeholder="Name">
        <input type="email" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Password">
        <input type="submit" value="Register">
        <a href="/login">Login</a>
    </form>
</body>
</html>

(addstudent):-

<!-- Form to add new student -->
<html>
<head>
    <title>Add Student</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- add student on form submit -->
    <script>
        $(document).ready(function(){
            $("#addstudent").submit(function(event){
                event.preventDefault();
                var student = {
                    name: $("#name").val(),
                    email: $("#email").val(),
                    class: $("#class").val(),
                    semester: $("#semester").val()
                }
                $.ajax({
                    url: "/students",
                    type: "POST",
                    data: student,
                    success: function(result){
                        window.location.href = "/students";
                    }
                });
            });
        });
    </script>
</head>
<body>
    <h3>Add New Student</h3>
    <form id="addstudent">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name..">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Your email..">
        <label for="class">Class</label>
        <input type="text" id="class" name="class" placeholder="Your class..">
        <label for="semester">Semester</label>
        <input type="text" id="semester" name="semester" placeholder="Your semester..">
        <input type="submit" value="Submit">
    </form>
</body>
</html>

(updatestudent):-

<!-- student update form -->
<html>
<head>
    <title>Update Student</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- update student on form submit -->
    <script>
        $(document).ready(function(){
            $("#updatestudent").submit(function(event){
                event.preventDefault();
                var student = {
                    name: $("#name").val(),
                    email: $("#email").val(),
                    class: $("#class").val(),
                    semester: $("#semester").val()
                }
                $.ajax({
                    url: "/students/<%= student._id %>",
                    type: "PUT",
                    data: student,
                    success: function(result){
                        window.location.href = "/students";
                    }
                });
            });
        });
    </script>
</head>
<body>
    <h3>Update Student</h3>
    <form id="updatestudent">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value="<%= student.name %>">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" value="<%= student.email %>">
        <label for="class">Class</label>
        <input type="text" id="class" name="class" value="<%= student.class %>">
        <label for="semester">Semester</label>
        <input type="text" id="semester" name="semester" value="<%= student.semester %>">
        <input type="submit" value="Update">
    </form>
</body>
</html>

(deletestudent):-

<!--student delete confirmation-->
<html>
<head>
    <title>Delete Student</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- delete student on form submit -->
    <script>
        $(document).ready(function(){
            $("#deletestudent").submit(function(event){
                event.preventDefault();
                $.ajax({
                    url: "/students/<%= student._id %>",
                    type: "DELETE",
                    success: function(result){
                        window.location.href = "/students";
                    }
                });
            });
        });
    </script>
</head>
<body>
    <h3>Delete Student</h3>
    <form id="deletestudent">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value="<%= student.name %>" readonly>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" value="<%= student.email %>" readonly>
        <label for="class">Class</label>
        <input type="text" id="class" name="class" value="<%= student.class %>" readonly>
        <label for="semester">Semester</label>
        <input type="text" id="semester" name="semester" value="<%= student.semester %>" readonly>
        <input type="submit" value="Delete">
    </form>
</body>
</html>
