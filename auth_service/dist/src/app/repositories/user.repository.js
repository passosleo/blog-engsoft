"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
class UserRepository {
    dbContext;
    constructor(dbContext) {
        this.dbContext = dbContext;
    }
    async findOneById(userId) {
        try {
            const model = await this.dbContext.user.findFirst({ where: { userId } });
            return model ? new user_entity_1.User(model) : null;
        }
        finally {
            await this.dbContext.$disconnect();
        }
    }
    async findOneByEmail(email) {
        try {
            const model = await this.dbContext.user.findFirst({ where: { email } });
            return model ? new user_entity_1.User(model) : null;
        }
        finally {
            await this.dbContext.$disconnect();
        }
    }
    async create(data) {
        try {
            const model = await this.dbContext.user.create({ data });
            return new user_entity_1.User(model);
        }
        finally {
            await this.dbContext.$disconnect();
        }
    }
    async update(userId, data) {
        try {
            const model = await this.dbContext.user.update({
                where: { userId },
                data,
            });
            return new user_entity_1.User(model);
        }
        finally {
            await this.dbContext.$disconnect();
        }
    }
}
exports.UserRepository = UserRepository;
