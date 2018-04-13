module.exports = (req, specsInclude, specsWhere, model) => {

    var obj = {
        page: null,
        limit: null,
        pages: null,
        promise: null,
        count: null,
        getAll: null,
        offset: null
    };

    if (req.query.page && req.query.limit) {

        obj.page = Number(req.query.page);
        obj.limit = Number(req.query.limit);

        obj.promise = model.count({
            where: specsWhere
        }).then((result) => {

            if (result == 0) {
                var e = new Error('No results found');
                e.name = 'SearchError';
                throw e;
            } else obj.count = result;

            obj.pages = Math.ceil(Number(result) / Number(req.query.limit));
            try {

                if (isNaN(obj.page) || isNaN(obj.limit) || obj.limit <= 0 || obj.page <= 0 || !Number.isInteger(obj.page) || !Number.isInteger(obj.limit)) {

                    e = new Error('Not valid request query');
                    e.name = 'QueryError';
                    throw e;
                }
                if (obj.page != null && obj.limit != null) {
                    obj.offset = ((obj.page-1) * obj.limit);
                }
                if (obj.pages < obj.page) {
                    e = new Error('Not valid request query');
                    e.name = 'QueryError';
                    throw e;
                }
            } catch (err) {
                if (err.name == 'SearchError') throw err;
                obj.err = err;
                obj.page = null;
                obj.limit = null;
            }
            if (obj.page != null && obj.limit != null) {

                obj.getAll = model.findAll({
                    include: specsInclude,
                    where: specsWhere,
                    limit: obj.limit,
                    offset: obj.offset
                });
            }
        }).catch((err) => {
            obj.err = err;
            obj.page = null;
            obj.limit = null;
        });
    }
    obj.getAll = model.findAll({
        include: specsInclude,
        where: specsWhere,
        limit: obj.limit,
        offset: obj.offset
    });
    return obj;
};