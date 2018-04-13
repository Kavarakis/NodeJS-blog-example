const Op = (require('../../models').Sequelize).Op;

module.exports = (val, arr) => {

    let regex = {

        getPartial: (value) => {

            let regStr = '.*';
            for (let i = 0; i < value.length; i++) {
                if (value[i] == ' ') continue;
                regStr += '[' + value[i].toLowerCase() + value[i].toUpperCase() + ']' + '.*';
            }
            // let regex = new RegExp(regStr);
            return regStr;
        },
        getComplete: (value) => {

            let regStr = '';
            for (let i = 0; i < value.length; i++) {
                if (value[i] == ' ') continue;
                regStr += '[' + value[i].toLowerCase() + value[i].toUpperCase() + ']';
            }
            // let regex = new RegExp(regStr);
            return regStr;
        }
    };

    var result = {};

    if (val) {
        result.getComplete = regex.getComplete(val);
        result.getPartial = regex.getPartial(val);

        let arr2 = [];
        arr.forEach(e => {
            arr2.push(Object.assign({}, e));
        });
        arr.forEach(element => {
            for (var key in element) {

                element[key] = {
                    [Op.regexp]: result.getComplete
                };
            }
        });
        arr2.forEach(element => {
            for (var key in element) {

                element[key] = {
                    [Op.regexp]: result.getPartial
                };
            }
        });
        result.array = [];
        arr.forEach(el => {
            result.array.push(Object.assign({}, el));
        });
        arr2.forEach(el => {
            result.array.push(Object.assign({}, el));
        });

    } else {
        result.getComplete = null;
        result.getPartial = null;
        result.array = null;
    }
    return result;
};