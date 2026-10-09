"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const requireAuth_1 = require("../../middleware/requireAuth");
const roleGuard_1 = require("../../middleware/roleGuard");
const validate_1 = require("../../middleware/validate");
const admin_schema_1 = require("./admin.schema");
exports.adminRouter = (0, express_1.Router)();
// Strictly restricted to superadmin role
exports.adminRouter.use(requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['superadmin']));
exports.adminRouter.get('/', admin_controller_1.AdminController.list);
exports.adminRouter.post('/', (0, validate_1.validate)({ body: admin_schema_1.createAdminSchema }), admin_controller_1.AdminController.create);
exports.adminRouter.patch('/:id', (0, validate_1.validate)({ body: admin_schema_1.updateAdminSchema }), admin_controller_1.AdminController.update);
exports.adminRouter.delete('/:id', admin_controller_1.AdminController.delete);
