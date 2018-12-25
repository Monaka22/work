const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM position', (err, position) => {
            if (err) {
                res.json(err);
            }
            res.send(position);
        });
    });
};

controller.listById = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM position WHERE position_id='${req.params.id}'`, (err, position) => {
            if (err) {
                res.json(err);
            }
            res.send(position);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            name: req.body.name
        }
        const sql = `INSERT INTO position  VALUES ('${null}','${data.name}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM position', (err, position) => {
            if (err) {
                res.json(err);
            }
            res.send(position);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            name: req.body.name,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE position SET position_name = '${data.name}' WHERE position_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM position', (err, branchs) => {
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
        sql = `DELETE FROM position WHERE position_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM position', (err, position) => {
                if (err) {
                    res.json(err);
                }
                res.send(position);
            });
        });
    });
}

module.exports = controller;