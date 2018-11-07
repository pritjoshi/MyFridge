var express = require('express');
var router = express.Router();
var food_cmd = require('../controllers/food');
router.get('/food/:id', food_cmd.get_food_By_Id);

router.get('/food', food_cmd.get_food);

router.post('/food', food_cmd.post_food);
router.put('/food/:id', food_cmd.put_food);

router.delete('/food/:id', food_cmd.delete_food);

router.put('/food/:id', food_cmd.put_food);

module.exports = router;