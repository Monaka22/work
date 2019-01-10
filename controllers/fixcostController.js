const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM fixcost', (err, fixcost) => {
            if (err) {
                res.json(err);
            }
            res.send(fixcost);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM fixcost WHERE fixcost_id='${id}'`, (err, fixcost) => {
            if (err) {
                res.json(err);
            }
            res.send(fixcost);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            title: req.body.title,
            note: req.body.note,
            price: req.body.price,
            branch_id : req.body.branch_id
        }
         //console.log(data);
        const sql = `INSERT INTO fixcost  VALUES ('${null}','${data.title}','${data.price}','${data.note}','${data.branch_id}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM fixcost', (err, fixcost) => {
            if (err) {
                res.json(err);
            }
            res.send(fixcost);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            title: req.body.title,
            note: req.body.note,
            price: req.body.price,
            branch_id : req.body.branch_id,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE fixcost SET fixcost_title = '${data.title}',fixcost_price = '${data.price}',fixcost_note = '${data.note}',branch_id = '${data.branch_id}' WHERE fixcost_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM fixcost', (err, fixcost) => {
                if (err) {
                    res.json(err);
                }
                res.send(fixcost);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM fixcost WHERE fixcost_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM fixcost', (err, fixcost) => {
                if (err) {
                    res.json(err);
                }
                res.send(fixcost);
            });
        });
    });
}

module.exports = controller;