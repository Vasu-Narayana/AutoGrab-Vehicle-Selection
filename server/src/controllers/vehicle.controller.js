const MODELS = require('../constants/models');

const submitVehicle = (req, res, next) => {
	try {
		const { make, model, badge } = req.body;

		if (!make || !model || !badge) {
			throw new Error('Make, model and badge are required');
		}

		if (!req.file) {
			throw new Error('Logbook file is required');
		}

		const makeData = MODELS[make];
		if (!makeData) throw new Error('Invalid make selected');

		const modelData = makeData[model];
		if (!modelData) throw new Error('Invalid model for selected make');

		if (!modelData.includes(badge)) {
			throw new Error('Invalid badge for selected model');
		}

		const logbookContent = req.file.buffer.toString('utf-8');

		res.status(200).json({
			success: true,
			data: {
				vehicle: { make, model, badge },
				logbookContent
			}
		});

	} catch (error) {
		next(error);
	}
};

module.exports = { submitVehicle };