const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM branch_addit', (err, branch_addit) => {
            if (err) {
                res.json(err);
            }
            res.send(branch_addit);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM branch_addit WHERE b_addit_id='${id}'`, (err, branch_addit) => {
            if (err) {
                res.json(err);
            }
            res.send(branch_addit);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            branch_id: req.body.branch_id,
            title: req.body.title,
            price: req.body.price,
            date: req.body.date
        }
         //console.log(data);
        const sql = `INSERT INTO branch_addit  VALUES ('${null}','${data.branch_id}','${data.title}','${data.price}','${data.date}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM branch_addit', (err, branch_addit) => {
            if (err) {
                res.json(err);
            }
            res.send(branch_addit);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            branch_id: req.body.branch_id,
            title: req.body.title,
            price: req.body.price,
            date: req.body.date,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE branch_addit SET branch_id = '${data.branch_id}',b_addit_title = '${data.title}',b_addit_price = '${data.price}',b_addit_date = '${data.date}' WHERE b_addit_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM branch_addit', (err, branch_addit) => {
                if (err) {
                    res.json(err);
                }
                res.send(branch_addit);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM branch_addit WHERE b_addit_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM branch_addit', (err, branch_addit) => {
                if (err) {
                    res.json(err);
                }
                res.send(branch_addit);
            });
        });
    });
}

module.exports = controller;