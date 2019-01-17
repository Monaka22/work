const controller = {};
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users', (err, user) => {
            if (err) {
                res.json(err);
            }
            res.send(user);
        });
    });
};

controller.listById = (req, res) => {
    id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM users WHERE user_id='${id}'`, (err, user) => {
            if (err) {
                res.json(err);
            }
            res.send(user);
        });
    });
};


controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const data = {
            username: req.body.username,
            password : req.body.password,
            status: req.body.status,
            codename : req.body.codename,
            emp_id : req.body.emp_id
        }
         //console.log(data);
        const sql = `INSERT INTO users  VALUES ('${null}','${data.username}','${data.password}','${data.status}','${data.codename}','${data.emp_id}')`;
        conn.query(sql, function (err, result) {
            console.log("1 record inserted");
        });

        conn.query('SELECT * FROM users', (err, user) => {
            if (err) {
                res.json(err);
            }
            res.send(user);
        });
    });
};

controller.update = (req, res) => {
    req.getConnection((err, conn) => {

        const data = {
            username: req.body.username,
            password : req.body.password,
            status: req.body.status,
            codename : req.body.codename,
            emp_id : req.body.emp_id,
            id: req.params.id
        }
        console.log("update: " + JSON.stringify(data))
        sql = `UPDATE users SET user_username = '${data.username}',user_password = '${data.password}',user_status = '${data.status}',user_codename = '${data.codename}',user_emp_id = '${data.emp_id}' WHERE user_id = '${data.id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            conn.query('SELECT * FROM users', (err, users) => {
                if (err) {
                    res.json(err);
                }
                res.send(users);
            });
        });
    });
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        id = req.params.id;
        console.log(id);
        sql = `DELETE FROM users WHERE user_id='${id}'`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 delete inserted");
            conn.query('SELECT * FROM users', (err, user) => {
                if (err) {
                    res.json(err);
                }
                res.send(user);
            });
        });
    });
}

module.exports = controller;