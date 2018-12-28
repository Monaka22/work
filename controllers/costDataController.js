const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM cost_data', (err, cost_data) => {
            if (err) {
                res.json(err);
            }
            res.send(cost_data);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM cost_data WHERE cost__id='${id}'`, (err, cost_data) => {
            if (err) {
                res.json(err);
            }
            res.send(cost_data);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
           emp_id : req.body.emp_id,
           branch_id : req.body.branch_id,
           fixcost_id : req.body.fixcost_id,
           benefit_id : req.body.benefit_id,
           note : req.body.note
        }
         //console.log(data);
         const sql = `INSERT INTO cost_data  VALUES ('${null}','${data.emp_id}','${data.branch_id}','${data.fixcost_id}','${data.benefit_id}','${data.note}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM cost_data', (err, cost_data) => {
            if (err) {
                res.json(err);
            }
            res.send(cost_data);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            emp_id : req.body.emp_id,
            branch_id : req.body.branch_id,
            fixcost_id : req.body.fixcost_id,
            benefit_id : req.body.benefit_id,
            note : req.body.note,
            id : req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE cost_data SET cost_emp_id = '${data.emp_id}',cost_branch_id = '${data.branch_id}',cost_fixcost_id = '${data.fixcost_id}',cost_benefit_id = '${data.benefit_id}',cost_note = '${data.note}' WHERE cost_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM cost_data', (err, cost_data) => {
                if (err) {
                    res.json(err);
                }
                res.send(cost_data);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM cost_data WHERE cost_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM cost_data', (err, cost_data) => {
                if (err) {
                    res.json(err);
                }
                res.send(cost_data);
            });
        });
    });
}

module.exports = controller;