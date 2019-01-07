const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM branch', (err, branchs) => {
            if (err) {
                res.json(err);
            }
            res.send(branchs);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM branch WHERE branch_id='${id}'`, (err, branchs) => {
            if (err) {
                res.json(err);
            }
            res.send(branchs);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            name: req.body.name,
            address: req.body.address
        }
         //console.log(data);
         const sql = `INSERT INTO branch  VALUES ('${null}','${data.name}','${data.address}')`;
         conn.query(sql, function (err, result) {
             console.log("1 record inserted");
         });

         conn.query('SELECT * FROM branch', (err, branchs) => {
             if (err) {
                 res.json(err);
             }
             res.send(branchs);
         });
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
        sql = `DELETE FROM branch WHERE branch_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM branch', (err, branchs) => {
                if (err) {
                    res.json(err);
                }
                res.send(branchs);
            });
        });
    });
}

module.exports = controller;
