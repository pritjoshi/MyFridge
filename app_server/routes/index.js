var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

/* GET pages. */
router.get('/', ctrlFood.home_list);
router.get('/food/delete/:id', ctrlFood.delete_food);
router.get('/create_edit/:id', ctrlFood.create);
router.get('create_edit/:id', ctrlFood.load_edit_data);

router.post('/create_edit', ctrlFood.create_item);
router.post('/create_edit/:id', ctrlFood.put_item);

module.exports = router;
