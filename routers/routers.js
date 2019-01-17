const router = require('express').Router();
const session = require('express-session');

const branchController = require('../controllers/branchController');
const positionController = require('../controllers/positionController');
const empController = require('../controllers/empController');
const fixcostController = require('../controllers/fixcostController');
const benefitController = require('../controllers/benefitController');
const costDataController = require('../controllers/costDataController');
const vacationController = require('../controllers/vacationController');
const positionEmpController = require('../controllers/positionEmpController');
const branchAdditController = require('../controllers/branchAdditController');
const projectController = require('../controllers/projectController');
const teamController = require('../controllers/teamController');
const projectAdditController = require('../controllers/projectAdditController');
const userController = require('../controllers/userController');
const notfound = require('../controllers/404notfond');
const checkAuth = require('../middleware/check_auth');
router.use(session({
    secret: 'HRproject',
    cookie: {
        maxAge: 3600000
    },
    resave: true,
    saveUninitialized: false
}));

router.get('/branch', checkAuth, branchController.list);
router.get('/branch/:id', checkAuth, branchController.listById);
router.post('/branch', checkAuth, branchController.save);
router.put('/branch/:id', checkAuth, branchController.update);
router.delete('/branch/:id', checkAuth, branchController.delete);
router.get('/position', checkAuth, positionController.list);
router.get('/position/:id', checkAuth, positionController.listById);
router.post('/position', checkAuth, positionController.save);
router.put('/position/:id', checkAuth, positionController.update);
router.delete('/position/:id', checkAuth, positionController.delete);
router.get('/emp', checkAuth, empController.list);
router.get('/emp/:id', checkAuth, empController.listById);
router.post('/emp', checkAuth, empController.save);
router.put('/emp/:id', checkAuth, empController.update);
router.delete('/emp/:id', checkAuth, empController.delete);
router.get('/fixcost', checkAuth, fixcostController.list);
router.get('/fixcost/:id', checkAuth, fixcostController.listById);
router.post('/fixcost', checkAuth, fixcostController.save);
router.put('/fixcost/:id', checkAuth, fixcostController.update);
router.delete('/fixcost/:id', checkAuth, fixcostController.delete);
router.get('/benefit', checkAuth, benefitController.list);
router.get('/benefit/:id', checkAuth, benefitController.listById);
router.post('/benefit', checkAuth, benefitController.save);
router.put('/benefit/:id', checkAuth, benefitController.update);
router.delete('/benefit/:id', checkAuth, benefitController.delete);
router.get('/costData', checkAuth, costDataController.list);
router.get('/costData/:id', checkAuth, costDataController.listById);
router.post('/costData', checkAuth, costDataController.save);
router.put('/costData/:id', checkAuth, costDataController.update);
router.delete('/costData/:id', checkAuth, costDataController.delete);
router.get('/vacation', checkAuth, vacationController.list);
router.get('/vacation/:id', checkAuth, vacationController.listById);
router.post('/vacation', checkAuth, vacationController.save);
router.put('/vacation/:id', checkAuth, vacationController.update);
router.delete('/vacation/:id', checkAuth, vacationController.delete);
router.get('/positionEmp', checkAuth, positionEmpController.list);
router.get('/positionEmp/:id', checkAuth, positionEmpController.listById);
router.post('/positionEmp', checkAuth, positionEmpController.save);
router.put('/positionEmp/:id', checkAuth, positionEmpController.update);
router.delete('/positionEmp/:id', checkAuth, positionEmpController.delete);
router.get('/branchAddit', checkAuth, branchAdditController.list);
router.get('/branchAddit/:id', checkAuth, branchAdditController.listById);
router.post('/branchAddit', checkAuth, branchAdditController.save);
router.put('/branchAddit/:id', checkAuth, branchAdditController.update);
router.delete('/branchAddit/:id', checkAuth, branchAdditController.delete);
router.get('/project', checkAuth, projectController.list);
router.get('/project/:id', checkAuth, projectController.listById);
router.post('/project', checkAuth, projectController.save);
router.put('/project/:id', checkAuth, projectController.update);
router.delete('/project/:id', checkAuth, projectController.delete);
router.get('/team', checkAuth, teamController.list);
router.get('/team/:id', checkAuth, teamController.listById);
router.post('/team', checkAuth, teamController.save);
router.put('/team/:id', checkAuth, teamController.update);
router.delete('/team/:id', checkAuth, teamController.delete);
router.get('/projectAddit', checkAuth, projectAdditController.list);
router.get('/projectAddit/:id', checkAuth, projectAdditController.listById);
router.post('/projectAddit', checkAuth, projectAdditController.save);
router.put('/projectAddit/:id', checkAuth, projectAdditController.update);
router.delete('/projectAddit/:id', checkAuth, projectAdditController.delete);
router.get('/user', checkAuth, userController.list);
router.get('/user/:id', checkAuth, userController.listById);
router.post('/user', checkAuth, userController.save);
router.put('/user/:id', checkAuth, userController.update);
router.delete('/user/:id', checkAuth, userController.delete);



router.get('/notfound',notfound.list);



router.post('/login', function (req, res) {

    if (req.body.username == "admin" && req.body.password == "qwerty") {
        req.session.username = req.body.username;
        req.session.isLoggedIn = true;
        res.end("Can use API. : " +req.session.username);
    } else {
        res.send("Invalid username and password");
    }
});
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.end("Logout complete")
});


module.exports = router;