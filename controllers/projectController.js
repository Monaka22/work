const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM project_manage', (err, project_manage) => {
            if (err) {
                res.json(err);
            }
            res.send(project_manage);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM project_manage WHERE project_id='${id}'`, (err, project_manage) => {
            if (err) {
                res.json(err);
            }
            res.send(project_manage);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            name: req.body.name,
            costomer_name: req.body.costomer_name,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            team_name: req.body.team_name,
            note: req.body.note
        }
        //console.log(data);
        const sql = `INSERT INTO project_manage  VALUES ('${null}','${data.name}','${data.costomer_name}','${data.start_date}','${data.end_date}','${data.team_name}','${data.note}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM project_manage', (err, project_manage) => {
            if (err) {
                res.json(err);
            }
            res.send(project_manage);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            name: req.body.name,
            costomer_name: req.body.costomer_name,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            team_name: req.body.team_name,
            note: req.body.note,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE project_manage SET project_name = '${data.name}',project_costomer_name = '${data.costomer_name}',project_start_date = '${data.start_date}',project_end_date = '${data.end_date}',project_team_name = '${data.team_name}',project_note = '${data.note}' WHERE project_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM project_manage', (err, project_manage) => {
                if (err) {
                    res.json(err);
                }
                res.send(project_manage);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM project_manage WHERE project_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM project_manage', (err, project_manage) => {
                if (err) {
                    res.json(err);
                }
                res.send(project_manage);
            });
        });
    });
}

module.exports = controller;