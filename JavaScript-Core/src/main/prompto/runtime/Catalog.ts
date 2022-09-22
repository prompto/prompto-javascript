/* eslint-disable @typescript-eslint/no-empty-interface */
export interface CatalogInfo<T extends DeclarationInfo> {
    type: string;
    value: T;
}

export interface DeclarationInfo {
    name: string;
    dialect: string;
}

export interface AttributeInfo extends DeclarationInfo {

}

export interface CategoryInfo extends DeclarationInfo {

}

export interface EnumerationInfo extends DeclarationInfo {
    symbols: string[]
}

export interface MethodsInfo extends DeclarationInfo {
    methods: MethodInfo[];
}

export interface MethodInfo extends DeclarationInfo {
    proto: string;
    eligibleAsMain: boolean;
}

export interface TestInfo extends DeclarationInfo {

}

export interface WidgetInfo extends DeclarationInfo {

}


export interface Chapters {
    attributes?: CatalogInfo<AttributeInfo>[];
    categories?: CatalogInfo<CategoryInfo>[];
    enumerations?: CatalogInfo<EnumerationInfo>[];
    methods?: CatalogInfo<MethodsInfo>[];
    tests?: CatalogInfo<TestInfo>[];
    widgets?: CatalogInfo<WidgetInfo>[];
}

export interface Catalog {
    type: string;
    value: Chapters;
}
