var mongoose = require('mongoose');
var food_mdl = mongoose.model('Food');
  
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// Gets Food
module.exports.get_food = function(req, res) {
    food_mdl.find({}, function (err, food) {
        if (err) return sendJSONresponse(res, 400, err);;
        sendJSONresponse(res, 200, food);
      })
  };

// Gets Food by ID
module.exports.get_food_By_Id = function(req, res) {
    if (req.params.id) {
        
        food_mdl.find({'_id': req.params.id}, function (err, food) {
            if (err) {
                
                return sendJSONresponse(res, 400, err);
            }
            
            return sendJSONresponse(res, 200, food);
          })
        
    }else {
        
        sendJSONresponse(res, 404, {"message": "Id Not Found."})
    }
    
  };
  
// Post Method

module.exports.post_food = function(req, res){
    if (req.body.name) {
        
        if (req.body.date) {
            
            if (req.body.quantity && req.body.quantity >= 1){
                food_mdl.create(req.body ,function(err, obj) {
                    if (err) {
                        
                      sendJSONresponse(res, 400, err);
                      return;
                        
                        

                    } else {
                        
                      sendJSONresponse(res, 201, obj);
                      return;
                        
                        
                    }
                  });
            }else {
                sendJSONresponse(res, 404, {"message": "Quantity is Invalid."});
            }    
        }else {
            sendJSONresponse(res, 404, {"message": "Date is required."});
        }    
    }else {
        sendJSONresponse(res, 404, {"message": "Name is required."});
    }
};



// Deletes food

module.exports.delete_food = function(req, res) {
    if (req.params.id) {
        food_mdl
        
            .findById(req.params.id)
            .exec(function(err, food) {
            
                if (err) {
                    
                    sendJSONresponse(res, 404, err);
                    
                }else {
                    if (food) {
                        if (food.quantity > 1) {
                            food.quantity = food.quantity - 1;
                            food.save(function(err, food) {
                                if (err) {
                                    sendJSONresponse(res, 404, err);
                                }else {
                                    sendJSONresponse(res, 200, food);
                                }
                            });
                        }else{
                            food.remove({"_id": req.params.id}, function(err, result){
                                if(err) {
                                    sendJSONresponse(res, 404, err);
                                    return;
                                }else {
                                    sendJSONresponse(res, 204, null);
                                    return;
                                }
                            });
                            
                        }
                    }else{
                        
                        sendJSONresponse(res, 404, {"message": "Item Not Found"});
                        return;
                        
                    }
                }
            });
    }
    else {
        sendJSONresponse(res, 404, {"message": "No Food Id Found"});
        return;
        
    }
  };



// Puts food


module.exports.put_food = function(req, res) {
    if (req.params.id) {
        food_mdl
            .findById(req.params.id)
            .exec(function(err, food){
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }else {
                    if (food) {
                        food.name = req.body.name;
                        food.date = req.body.date;
                        food.expiry = req.body.expiry;
                        food.left_overs = req.body.left_overs;
                        food.quantity = req.body.quantity;
                        food.save(function(err, food) {
                            if (err) {
                                sendJSONresponse(res, 404, err);
                                return;
                            }else {
                                console.log(food);
                                sendJSONresponse(res, 200, food);
                                return;
                            }
                        });         
                    }else {
                        sendJSONresponse(res, 404, {"message": "Could not update the Item."});
                        return;    
                    }
                }
            });
    }
    else {
        sendJSONresponse(res, 404, {"message": "No Id Found"});
        return;
    }
  };