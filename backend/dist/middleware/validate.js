"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
function validate(schema) {
    return async (req, _res, next) => {
        try {
            if (schema.body) {
                req.body = await schema.body.parseAsync(req.body);
            }
            if (schema.query) {
                const parsedQuery = await schema.query.parseAsync(req.query);
                for (const key of Object.keys(req.query)) {
                    delete req.query[key];
                }
                Object.assign(req.query, parsedQuery);
            }
            if (schema.params) {
                req.params = await schema.params.parseAsync(req.params);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
