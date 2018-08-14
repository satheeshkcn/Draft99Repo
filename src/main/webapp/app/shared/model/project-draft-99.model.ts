import { Moment } from 'moment';
import { IDocumentDraft99 } from 'app/shared/model//document-draft-99.model';

export const enum ProjectType {
    PORTFOLIO = 'PORTFOLIO',
    DESIGN = 'DESIGN',
    REQUIREMENT = 'REQUIREMENT'
}

export const enum AccessMode {
    PUBLIC = 'PUBLIC',
    ASSIGNED = 'ASSIGNED',
    CUSTOMER = 'CUSTOMER'
}

export interface IProjectDraft99 {
    id?: number;
    projectName?: string;
    projectDesc?: string;
    userId?: number;
    projectType?: ProjectType;
    accessMode?: AccessMode;
    tags?: string;
    createdDate?: Moment;
    coverPhotoContentType?: string;
    coverPhoto?: any;
    documents?: IDocumentDraft99[];
}

export class ProjectDraft99 implements IProjectDraft99 {
    constructor(
        public id?: number,
        public projectName?: string,
        public projectDesc?: string,
        public userId?: number,
        public projectType?: ProjectType,
        public accessMode?: AccessMode,
        public tags?: string,
        public createdDate?: Moment,
        public coverPhotoContentType?: string,
        public coverPhoto?: any,
        public documents?: IDocumentDraft99[]
    ) {}
}
