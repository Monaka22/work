const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM position_emp', (err, position_emp) => {
            if (err) {
                res.json(err);
            }
            res.send(position_emp);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM position_emp WHERE emp_position_id='${id}'`, (err, position_emp) => {
            if (err) {
                res.json(err);
            }
            res.send(position_emp);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            emp_id: req.body.emp_id,
            position_id: req.body.position_id
        }
         //console.log(data);
        const sql = `INSERT INTO position_emp  VALUES ('${null}','${data.emp_id}','${data.position_id}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM position_emp', (err, position_emp) => {
            if (err) {
                res.json(err);
            }
            res.send(position_emp);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            emp_id: req.body.emp_id,
            position_id: req.body.position_id,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE position_emp SET emp_id = '${data.emp_id}',position_id = '${data.position_id}' WHERE emp_position_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM position_emp', (err, position_emp) => {
                if (err) {
                    res.json(err);
                }
                res.send(position_emp);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM position_emp WHERE emp_position_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM position_emp', (err, position_emp) => {
                if (err) {
                    res.json(err);
                }
                res.send(position_emp);
            });
        });
    });
}

module.exports = controller;