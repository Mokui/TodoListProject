module.exports = (sequelize, Sequelize) => {
	const Action = sequelize.define('action', {
    id: {
			type: Sequelize.INTEGER,
			field: 'id',
			primaryKey: true
    },
    description: {
			type: Sequelize.TEXT,
			field: 'description'
	  }

	});

	return Action;
}
