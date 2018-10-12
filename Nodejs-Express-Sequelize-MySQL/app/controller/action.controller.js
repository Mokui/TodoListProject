const db = require('../config/db.config.js');
const Action = db.actions;

// Post a action
exports.create = (req, res) => {
	// Save to MySQL database
	let action = req.body;
	Action.create(action).then(result => {
		// Send created action to client
		res.json(result);
	});
};

// Fetch all actions
exports.findAll = (req, res) => {
	Action.findAll().then(actions => {
	  // Send all actions to Client
	  res.json(actions);
	});
};

// Find a action by Id
exports.findById = (req, res) => {
	Action.findById(req.params.actionId).then(action => {
		res.json(action);
	})
};

// Update a action
exports.update = (req, res) => {
	let action = req.body;
	let id = req.body.id;
	Action.update(action,
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"updated successfully a action with id = " + id});
				   });
};

// Delete a action by Id
exports.delete = (req, res) => {
	const id = req.params.actionId;
	Action.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'deleted successfully a action with id = ' + id});
	});
};
