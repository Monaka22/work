const controller = {};
var formidable = require('formidable');
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
        conn.query(`SELECT * FROM branch WHERE emp_id='${id}'`, (err, emp) => {
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
            var form = new formidable.IncomingForm();
            var newname = Date.now();
            form.parse(req, function (err, fields, files) {

                var oldpath = files.filetoupload.path;
                var fileName = newname.toString() + "." + files.filetoupload.name.split('.').pop();
                var newpath = path.join(__dirname, "../public/file/" + fileName);
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;

                    var data = {
                        name: req.body.name,
                        salary: req.body.salary,
                        address: req.body.address,
                        id_card: fileName,
                        tel: req.body.tel,
                        eContact: req.body.eContact,
                        branch_id: req.body.branch_id
                    }

                    var sql = `INSERT INTO employee  VALUES ('${null}','${data.name}','${data.salary}','${data.address}','${data.id_card}','${data.tel}','${data.eContact}','${data.branch_id}')`;
                    conn.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("1 record inserted");
                    });

                    conn.query('SELECT * FROM employee', (err, emp) => {
                        if (err) {
                            res.json(err);
                        }
                        res.send(emp);
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

        const data = {
            name: req.body.name,
            address: req.body.address,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE branch SET branch_name = '${data.name}',branch_address = '${data.address}' WHERE branch_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM branch', (err, branchs) => {
                if (err) {
                    res.json(err);
                }
                res.send(branchs);
            });
        });
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