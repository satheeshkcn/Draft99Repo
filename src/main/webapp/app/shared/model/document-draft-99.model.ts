export const enum DocType {
    FLOORPLAN = 'FLOORPLAN',
    FLOORPLAN3D = 'FLOORPLAN3D',
    ELEVATION = 'ELEVATION',
    ELEVATION3D = 'ELEVATION3D'
}

export const enum DocFormat {
    PDF = 'PDF',
    JPEG = 'JPEG',
    PNG = 'PNG'
}

export interface IDocumentDraft99 {
    id?: number;
    docName?: string;
    docDesc?: string;
    documentContentType?: string;
    document?: any;
    doctype?: DocType;
    docFormat?: DocFormat;
    projectId?: number;
}

export class DocumentDraft99 implements IDocumentDraft99 {
    constructor(
        public id?: number,
        public docName?: string,
        public docDesc?: string,
        public documentContentType?: string,
        public document?: any,
        public doctype?: DocType,
        public docFormat?: DocFormat,
        public projectId?: number
    ) {}
}
