const controller = {};
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, '../public/file/')));

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM employee', (err, emp) => {
            if (err) {
                res.json(err);
            }
            res.send(emp);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM employee WHERE emp_id='${id}'`, (err, emp) => {
            if (err) {
                res.json(err);
            }
            res.send(emp);
        });
    });
};

controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        try {
            const form = new formidable.IncomingForm();
            const newname = Date.now();
            form.parse(req, function (err, fields, files) {

                const oldpath = files.filetoupload.path;
                const fileName = newname.toString() + "." + files.filetoupload.name.split('.').pop();
                const newpath = path.join(__dirname, "../public/file/" + fileName);
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;

                    const data = {
                        name: fields.name,
                        salary: fields.salary,
                        address: fields.address,
                        id_card: fileName,
                        tel: fields.tel,
                        eContact: fields.eContact,
                        branch_id: fields.branch_id
                    }
                    console.log(data);
                    const sql = `INSERT INTO employee  VALUES ('${null}','${data.name}','${data.salary}','${data.address}','${data.id_card}','${data.tel}','${data.eContact}','${data.branch_id}')`;
                    conn.query(sql, function (err, result) {
                        console.log("1 record inserted");
                    });

                    conn.query('SELECT * FROM employee', (err, branchs) => {
                        if (err) {
                            res.json(err);
                        }
                        res.send(branchs);
                    });

                });

            });
        } catch (err) {
            console.log("err : " + err);
            res.json(err);
        }
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {
        try {

            const form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                const data = {
                    id: req.params.id,
                    name: fields.name,
                    salary: fields.salary,
                    address: fields.address,
                    tel: fields.tel,
                    eContact: fields.eContact,
                    branch_id: fields.branch_id
                }
                sql = `SELECT emp_id_card FROM employee WHERE emp_id = '${data.id}'`;
                conn.query(sql, function (err, result) {
                    if (err) throw err;
                     const idcard = JSON.parse(JSON.stringify(result[0]));
                    const id_card = idcard.emp_id_card;
                    if (files.filetoupload.size != 0) {
                        const oldpath = files.filetoupload.path;
                        const newpath = path.join(__dirname, "../public/file/"+id_card);
        
                        fs.rename(oldpath, newpath, function (err) {
                            if (err) throw err;
                            console.log("Update file successfully");
                        });
                    }
                  });
            
                console.log("update: " + JSON.stringify(data));
                sql = `UPDATE employee SET emp_name= '${data.name}',
                   emp_salary = '${data.salary}', 
                   emp_address = '${data.address}', 
                   emp_tel = '${data.tel}',
                   emer_con = '${data.eContact}',
                   emp_branch_id = '${data.branch_id}' where emp_id='${data.id}'`;
    
                   conn.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                    conn.query('SELECT * FROM employee', (err, emp) => {
                        if (err) {
                            res.json(err);
                        }
                        res.send(emp);
                    });
                });
            });
    
    
        } catch (err) {
            throw err;
        }
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM employee WHERE emp_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM employee', (err, emp) => {
                if (err) {
                    res.json(err);
                }
                res.send(emp);
            });
        });
    });
}


module.exports = controller;