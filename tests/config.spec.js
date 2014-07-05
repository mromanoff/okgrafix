describe('Configuration setup', function () {
    it('should load local configurations', function (next) {
        var config = require('../config')();
        expect(config.model).toBe('local');
        next();
    });

    it('should load staging configurations', function (next) {
        var config = require('../config')('staging');
        expect(config.model).toBe('staging');
        next();
    });

    it('should load production configurations', function (next) {
        var config = require('../config')('production');
        expect(config.model).toBe('production');
        next();
    });
});