module.exports = function(app) {
 
    const actions = require('../controller/action.controller.js');
 
    // Create a new action
    app.post('/api/actions', actions.create);
 
    // Retrieve all action
    app.get('/api/actions', actions.findAll);
 
    // Retrieve a single action by Id
    app.get('/api/actions/:actionId', actions.findById);
 
    // Update a action with Id
    app.put('/api/actions', actions.update);
 
    // Delete a action with Id
    app.delete('/api/actions/:actionId', actions.delete);
}