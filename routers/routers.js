const router = require('express').Router();

const branchController = require('../controllers/branchController');
const positionController = require('../controllers/positionController');

router.get('/branch', branchController.list);
router.get('/branch/:id', branchController.listById);
router.post('/branch', branchController.save);
router.put('/branch/:id', branchController.update);
router.post('/branch/:id', branchController.delete);
router.get('/position', positionController.list);
router.get('/position/:id', positionController.listById);
router.post('/position', positionController.save);
router.put('/position/:id', positionController.update);
router.delete('/position/:id', positionController.delete);

module.exports = router;