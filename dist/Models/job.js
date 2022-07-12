"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company'
    },
    remote: {
        type: Boolean,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    closed: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});
// Update the date every time a job entity is created or updated
jobSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
exports.default = (0, mongoose_1.model)('Job', jobSchema);
