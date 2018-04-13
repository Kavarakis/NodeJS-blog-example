const Op = (require('../../models').Sequelize).Op;

module.exports = (req, specsInclude, specsWhere, additional, model) => {

    const regex = require('./regexHandling')(req.query.value, specsWhere);
/*
additional settings regarding modification of generic findAll query
where attribute modification
*/
    if (!additional) additional = true;

    if (regex.array) {

        return require('./paginationHandling')(req, specsInclude, {
            [Op.and]: [{
                    [Op.or]: regex.array
                },
                additional
            ]
        }, model);
    } else {
        return require('./paginationHandling')(req, specsInclude, additional, model);
    }
};