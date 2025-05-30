"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
let ProductsRepository = class ProductsRepository {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async findAll(query, limit, offset) {
        const mongoQuery = this.buildFindAllQuery(query);
        const find = this.productModel.find(mongoQuery).lean();
        if (limit !== undefined) {
            find.limit(limit);
        }
        if (offset !== undefined) {
            find.skip(offset);
        }
        return find.exec();
    }
    async findOptionsByCategory(category) {
        const brands = await this.productModel.distinct('brand', { category });
        const colors = await this.productModel.distinct('colors', { category });
        const materials = await this.productModel.distinct('material', { category });
        return { brands, colors, materials };
    }
    async findById(id) {
        return this.productModel.findOne({ id }).lean().exec();
    }
    async findByCategory(category) {
        return this.productModel.find({ category }).lean().exec();
    }
    async findByPriceRange(min, max) {
        return this.productModel.find({ productPrice: { $gte: min, $lte: max } }).lean().exec();
    }
    async findByBrand(brand) {
        return this.productModel.find({ brand }).lean().exec();
    }
    async aggregateProducts(pipeline) {
        return this.productModel.aggregate(pipeline).exec();
    }
    async updateMany(filter, update) {
        return this.productModel.updateMany(filter, update).exec();
    }
    buildFindAllQuery(query) {
        const { category, priceRanges, colors, brands, materials } = query;
        const mongoQuery = {};
        if (category) {
            mongoQuery.category = category;
        }
        if (priceRanges?.length) {
            mongoQuery.$or = priceRanges.map((range) => {
                const [min, max] = range.split('-').map(Number);
                return { productPrice: { $gte: min, $lte: max } };
            });
        }
        if (colors?.length) {
            mongoQuery.colors = { $in: colors };
        }
        if (brands?.length) {
            mongoQuery.brand = { $in: brands };
        }
        if (materials?.length) {
            mongoQuery.material = { $in: materials };
        }
        return mongoQuery;
    }
    async countAll(filter = {}) {
        return this.productModel.countDocuments(filter).exec();
    }
    async findMany(filter, skip, limit, sort = {}) {
        return this.productModel.find(filter).skip(skip).limit(limit).sort(sort).exec();
    }
    async count(filter) {
        return this.productModel.countDocuments(filter).exec();
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map