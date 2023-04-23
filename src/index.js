const { inject } = require("@vercel/analytics");

module.exports = function (context, options) {
	inject();
	return;
};
