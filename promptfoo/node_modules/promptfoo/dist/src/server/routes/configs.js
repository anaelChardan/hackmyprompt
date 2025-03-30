"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configsRouter = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const express_1 = require("express");
const uuid_1 = require("uuid");
const database_1 = require("../../database");
const tables_1 = require("../../database/tables");
const logger_1 = __importDefault(require("../../logger"));
exports.configsRouter = (0, express_1.Router)();
exports.configsRouter.get('/', async (req, res) => {
    const db = await (0, database_1.getDb)();
    try {
        const type = req.query.type;
        const query = db
            .select({
            id: tables_1.configsTable.id,
            name: tables_1.configsTable.name,
            createdAt: tables_1.configsTable.createdAt,
            updatedAt: tables_1.configsTable.updatedAt,
            type: tables_1.configsTable.type,
        })
            .from(tables_1.configsTable)
            .orderBy(tables_1.configsTable.updatedAt);
        if (type) {
            query.where((0, drizzle_orm_1.eq)(tables_1.configsTable.type, type));
        }
        const configs = await query;
        logger_1.default.info(`Loaded ${configs.length} configs${type ? ` of type ${type}` : ''}`);
        res.json({ configs });
    }
    catch (error) {
        logger_1.default.error(`Error fetching configs: ${error}`);
        res.status(500).json({ error: 'Failed to fetch configs' });
    }
});
exports.configsRouter.post('/', async (req, res) => {
    const db = await (0, database_1.getDb)();
    try {
        const { name, type, config } = req.body;
        const id = (0, uuid_1.v4)();
        const [result] = await db
            .insert(tables_1.configsTable)
            .values({
            id,
            name,
            type,
            config,
        })
            .returning({
            id: tables_1.configsTable.id,
            createdAt: tables_1.configsTable.createdAt,
        });
        logger_1.default.info(`Saved config ${id} of type ${type}`);
        res.json(result);
    }
    catch (error) {
        logger_1.default.error(`Error saving config: ${error}`);
        res.status(500).json({ error: 'Failed to save config' });
    }
});
exports.configsRouter.get('/:type', async (req, res) => {
    const db = await (0, database_1.getDb)();
    try {
        const configs = await db
            .select({
            id: tables_1.configsTable.id,
            name: tables_1.configsTable.name,
            createdAt: tables_1.configsTable.createdAt,
            updatedAt: tables_1.configsTable.updatedAt,
        })
            .from(tables_1.configsTable)
            .where((0, drizzle_orm_1.eq)(tables_1.configsTable.type, req.params.type))
            .orderBy(tables_1.configsTable.updatedAt);
        logger_1.default.info(`Loaded ${configs.length} configs of type ${req.params.type}`);
        res.json({ configs });
    }
    catch (error) {
        logger_1.default.error(`Error fetching configs: ${error}`);
        res.status(500).json({ error: 'Failed to fetch configs' });
    }
});
exports.configsRouter.get('/:type/:id', async (req, res) => {
    const db = await (0, database_1.getDb)();
    try {
        const config = await db
            .select()
            .from(tables_1.configsTable)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(tables_1.configsTable.type, req.params.type), (0, drizzle_orm_1.eq)(tables_1.configsTable.id, req.params.id)))
            .limit(1);
        logger_1.default.info(`Loaded config ${req.params.id} of type ${req.params.type}`);
        if (!config.length) {
            res.status(404).json({ error: 'Config not found' });
            return;
        }
        res.json(config[0]);
    }
    catch (error) {
        logger_1.default.error(`Error fetching config: ${error}`);
        res.status(500).json({ error: 'Failed to fetch config' });
    }
});
//# sourceMappingURL=configs.js.map