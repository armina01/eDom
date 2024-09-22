export interface GetAllPlanIshraneResponse {
    planoviIshrane: GetAllPlanIshraneResponsePlan[];
}

export interface GetAllPlanIshraneResponsePlan {
    planIshraneId: number;
    fileId: number;
    nutricionistaId: number;
    korisnikDomaId: number;
    datumPostavke:Date;
}
