const express = require('express');
const http = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');

http.use(cors());
http.use(express.json());
http.use(bodyparser.urlencoded({extended:true}))

const db = mysql.createPool({
    user:'root',
    host:'localhost',
    password:'Vijay@95',
    database:'vktechnnology',
});

http.get("/getemployees", (req, res) => {
    const sqlSelect = "SELECT * FROM vktechnnology.employees";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

http.post('/create',(req,res)=>{
    const employeename = req.body.employeename;
    const age = req.body.age;
    const gender = req.body.gender;
    const roll = req.body.roll;
    const address = req.body.address;

    db.query(
        "INSERT INTO employees (employeename, age, gender, roll, address) values (?,?,?,?,?)",
        [employeename, age, gender, roll, address],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})

http.delete("/delete/:employeename",(req,res)=>{
    const employeename = req.params.employeename;
    const sqlDelete = "DELETE FROM employees WHERE employeename = ?";

    db.query(sqlDelete, employeename, (err, result)=>{
        if (err) {
            console.log(err);
        }
    });
});

http.put("/update",(req, res)=>{
    const employeename = req.body.employeename;
    const roll = req.body.roll;

    const sqlUpdate = "UPDATE employees SET  roll = ? WHERE employeename = ?";
    db.query(sqlUpdate, [roll,employeename], (err, result) =>{
        if(err) console.log(err);
    })

})

http.listen(3001, ()=>{
    console.log('Conection eastablished successfully');
})