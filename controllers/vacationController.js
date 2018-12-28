const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM vacation', (err, vacation) => {
            if (err) {
                res.json(err);
            }
            res.send(vacation);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM vacation WHERE vacation_id='${id}'`, (err, vacation) => {
            if (err) {
                res.json(err);
            }
            res.send(vacation);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            note_date: req.body.note_date,
            emp_id : req.body.emp_id,
            type : req.body.type,
            note : req.body.note,
            fday : req.body.fday,
            lday : req.body.lday
        }
         //console.log(data);
        const sql = `INSERT INTO vacation  VALUES ('${null}','${data.note_date}','${data.emp_id}','${data.type}','${data.note}','${data.fday}','${data.lday}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM vacation', (err, vacation) => {
            if (err) {
                res.json(err);
            }
            res.send(vacation);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            note_date: req.body.note_date,
            emp_id : req.body.emp_id,
            type : req.body.type,
            note : req.body.note,
            fday : req.body.fday,
            lday : req.body.lday,
            id : req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE vacation SET vacation_note_date = '${data.note_date}',vacation_emp_id = '${data.emp_id}',vacation_type = '${data.type}',vacation_note = '${data.note}',vacation_fday_date = '${data.fday}',vacation_lday_date = '${data.lday}' WHERE vacation_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM vacation', (err, vacation) => {
                if (err) {
                    res.json(err);
                }
                res.send(vacation);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM vacation WHERE vacation_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM vacation', (err, vacation) => {
                if (err) {
                    res.json(err);
                }
                res.send(vacation);
            });
        });
    });
}

module.exports = controller;