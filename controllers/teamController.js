const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM team', (err, team) => {
            if (err) {
                res.json(err);
            }
            res.send(team);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM team WHERE team_id='${id}'`, (err, team) => {
            if (err) {
                res.json(err);
            }
            res.send(team);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            pj_id: req.body.pj_id,
            emp_id : req.body.emp_id,
            date_start: req.body.date_start,
            date_end : req.body.date_end
        }
         //console.log(data);
        const sql = `INSERT INTO team  VALUES ('${null}','${data.pj_id}','${data.emp_id}','${data.date_start}','${data.date_end}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM team', (err, team) => {
            if (err) {
                res.json(err);
            }
            res.send(team);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            pj_id: req.body.pj_id,
            emp_id : req.body.emp_id,
            date_start: req.body.date_start,
            date_end : req.body.date_end,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE team SET team_pj_id = '${data.pj_id}',team_emp_id = '${data.emp_id}',emp_date_start = '${data.date_start}',emp_date_end = '${data.date_end}' WHERE team_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM team', (err, team) => {
                if (err) {
                    res.json(err);
                }
                res.send(team);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM team WHERE team_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM team', (err, team) => {
                if (err) {
                    res.json(err);
                }
                res.send(team);
            });
        });
    });
}

module.exports = controller;