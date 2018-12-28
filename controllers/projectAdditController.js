const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM additcost_project', (err, additcost_project) => {
            if (err) {
                res.json(err);
            }
            res.send(additcost_project);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM additcost_project WHERE addticost__id='${id}'`, (err, additcost_project) => {
            if (err) {
                res.json(err);
            }
            res.send(additcost_project);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            title: req.body.title,
            date: req.body.date,
            price: req.body.price,
            project_id: req.body.project_id,
            note: req.body.note
        }
        //console.log(data);
        const sql = `INSERT INTO additcost_project  VALUES ('${null}','${data.title}','${data.date}','${data.price}','${data.project_id}','${data.note}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM additcost_project', (err, additcost_project) => {
            if (err) {
                res.json(err);
            }
            res.send(additcost_project);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            title: req.body.title,
            date: req.body.date,
            price: req.body.price,
            project_id: req.body.project_id,
            note: req.body.note,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE additcost_project SET additcost_title = '${data.title}',additcost_date = '${data.date}',additcost_price = '${data.price}',additcost_project_id = '${data.project_id}',additcost_note = '${data.note}' WHERE additcost_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM additcost_project', (err, additcost_project) => {
                if (err) {
                    res.json(err);
                }
                res.send(additcost_project);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM additcost_project WHERE additcost_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM additcost_project', (err, additcost_project) => {
                if (err) {
                    res.json(err);
                }
                res.send(additcost_project);
            });
        });
    });
}

module.exports = controller;