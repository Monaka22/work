const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM benefit', (err, benefit) => {
            if (err) {
                res.json(err);
            }
            res.send(benefit);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM benefit WHERE benefit_id='${id}'`, (err, benefit) => {
            if (err) {
                res.json(err);
            }
            res.send(benefit);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            title: req.body.title,
            price: req.body.price,
            emp_id : req.body.emp_id
        }
         //console.log(data);
        const sql = `INSERT INTO benefit  VALUES ('${null}','${data.title}','${data.price}','${data.emp_id}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM benefit', (err, benefit) => {
            if (err) {
                res.json(err);
            }
            res.send(benefit);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            title: req.body.title,
            price: req.body.price,
            emp_id : req.body.emp_id,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE benefit SET benefit_title = '${data.title}',benefit_price = '${data.price}',benefit_emp_id = '${data.emp_id}' WHERE benefit_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM benefit', (err, benefit) => {
                if (err) {
                    res.json(err);
                }
                res.send(benefit);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM benefit WHERE benefit_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM benefit', (err, benefit) => {
                if (err) {
                    res.json(err);
                }
                res.send(benefit);
            });
        });
    });
}

module.exports = controller;