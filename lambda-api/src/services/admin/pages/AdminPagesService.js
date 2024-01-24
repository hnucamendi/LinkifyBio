"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestValidationUtils_1 = require("../../../utils/RequestValidationUtils");
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = __importDefault(require("crypto"));
const PageSchema_1 = require("../../../schema/PageSchema");
const CoreUtils_1 = require("../../../utils/CoreUtils");
const s3Client = new client_s3_1.S3Client({ region: 'us-east-1' });
class AdminPagesService {
    createPage(request, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, RequestValidationUtils_1.validateCreatePageRequest)(request);
            const existingPage = yield PageSchema_1.Page.get({ owner, id: request.id });
            if (existingPage) {
                throw new Error("Page already exists.");
            }
            const page = {
                id: request.id,
                owner: owner,
                bioInfo: {
                    name: request.bioInfo.name,
                    imageUrl: request.bioInfo.imageUrl || "",
                    descriptionTitle: request.bioInfo.descriptionTitle,
                },
                links: [],
                socialMediaLinks: [],
                createdAt: new Date().toISOString(),
                verified: false,
            };
            const bio = new PageSchema_1.Page(page);
            try {
                yield bio.save();
                return page;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error saving bio. See logs for more details.");
            }
        });
    }
    checkIfPageIsAvailable(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, CoreUtils_1.validatePageId)(id);
            try {
                const data = yield PageSchema_1.Page.get(id);
                if (data === undefined) {
                    return { available: true };
                }
                return { available: false };
            }
            catch (error) {
                console.log(error);
                throw new Error("Alias not found.");
            }
        });
    }
    updatePageInfo(id, info, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, RequestValidationUtils_1.validateUpdatePageInfoRequest)(info);
            const existingPage = yield PageSchema_1.Page.get({ id, owner });
            if (!existingPage) {
                throw new Error("Page does not exists. Cannot update info.");
            }
            try {
                yield PageSchema_1.Page.update({ id, owner }, { bioInfo: info });
                return info;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error updating Page info. See logs for more details.");
            }
        });
    }
    listPages(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield PageSchema_1.Page.scan({ owner }).exec();
                return response;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error listing Page links. See logs for more details.");
            }
        });
    }
    removePage(id, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield PageSchema_1.Page.delete({ id, owner });
                return true;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error removing page. See logs for more details.");
            }
        });
    }
    uploadProfileImage(owner, pageId, upload) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, CoreUtils_1.validatePageId)(pageId);
            // Check if the file buffer is empty
            if (!upload || !upload.file || !upload.file.data) {
                throw new Error('File is empty');
            }
            const hash = crypto_1.default.createHash('sha512');
            hash.update(`${owner}-${pageId}-${new Date().toISOString()}`);
            const hashedFileName = hash.digest('hex');
            const params = {
                Bucket: process.env.PROFILE_IMAGES_BUCKET_NAME,
                Key: hashedFileName, // Use the hashed file name
                Body: upload.file.data,
            };
            // Uploading files to the bucket
            yield s3Client.send(new client_s3_1.PutObjectCommand(params));
            return {
                imageUrl: `https://${process.env.CDN_DOMAIN_NAME}/${encodeURIComponent(hashedFileName)}`
            };
        });
    }
}
exports.default = AdminPagesService;
