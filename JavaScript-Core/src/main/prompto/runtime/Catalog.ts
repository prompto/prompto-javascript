/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ICatalogInfo<T extends IDeclarationInfo> {
    type: string;
    value: T;
}

export interface IDeclarationInfo {
    name: string;
    dialect: string;
}

export interface IAttributeInfo extends IDeclarationInfo {

}

export interface ICategoryInfo extends IDeclarationInfo {

}

export interface IEnumerationInfo extends IDeclarationInfo {
    symbols: string[]
}

export interface IMethodsInfo extends IDeclarationInfo {
    methods: IMethodInfo[];
}

export interface IMethodInfo extends IDeclarationInfo {
    proto: string;
    eligibleAsMain: boolean;
}

export interface ITestInfo extends IDeclarationInfo {

}

export interface IWidgetInfo extends IDeclarationInfo {

}


export interface IChapters {
    attributes?: ICatalogInfo<IAttributeInfo>[];
    categories?: ICatalogInfo<ICategoryInfo>[];
    enumerations?: ICatalogInfo<IEnumerationInfo>[];
    methods?: ICatalogInfo<IMethodsInfo>[];
    tests?: ICatalogInfo<ITestInfo>[];
    widgets?: ICatalogInfo<IWidgetInfo>[];
}

export interface ICatalog {
    type: string;
    value: IChapters;
}
