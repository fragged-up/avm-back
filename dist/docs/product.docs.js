"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDocs = exports.getProductQueryStatus = exports.getProductsResponseStatus = exports.getProductOperationStatus = void 0;
exports.getProductOperationStatus = {
    summary: 'Get filtered products',
    description: 'Returns products with applied filters, sorting, and filters metadata.',
};
exports.getProductsResponseStatus = {
    status: 200,
    description: 'Filtered products and filters metadata returned successfully',
    schema: {
        example: {
            products: [
                {
                    id: '123',
                    name: 'Modern Chair',
                    brand: 'Ikea',
                    productPrice: 199,
                    stock: 5,
                    colors: ['Black', 'Red'],
                    material: 'Wood',
                    ratings: 4.5,
                    tags: ['Comfort', 'Office'],
                    isAvailable: true,
                },
            ],
            filtersMeta: {
                priceRanges: [
                    { range: '1-99', count: 4 },
                    { range: '100-199', count: 8 },
                ],
                colors: [
                    { key: 'Black', count: 6 },
                    { key: 'Red', count: 2 },
                ],
                brands: [{ key: 'Ikea', count: 5 }],
                materials: [{ key: 'Wood', count: 3 }],
            },
        },
    },
};
exports.getProductQueryStatus = [
    {
        name: 'category',
        required: false,
        type: String,
        description: 'Product category to filter by (e.g., "sofas", "chairs")',
    },
    {
        name: 'sort',
        required: false,
        type: String,
        enum: [
            'price-asc',
            'price-desc',
            'name',
            'availability',
            'rating',
            'height',
            'depth',
        ],
        description: 'Sort field and direction',
    },
    {
        name: 'priceRanges',
        required: false,
        isArray: true,
        type: String,
        description: 'Array of price ranges (e.g., ["0-99", "100-199"])',
    },
];
exports.ProductDocs = {
    operation: exports.getProductOperationStatus,
    response: exports.getProductsResponseStatus,
    queries: exports.getProductQueryStatus,
    tag: 'proudcts'
};
//# sourceMappingURL=product.docs.js.map