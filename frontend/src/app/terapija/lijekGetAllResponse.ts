export interface LijekGetAllResponse{
lijekovi:LijekGetAllResponseLijek[]
}

export interface LijekGetAllResponseLijek{
    lijekId: number
    naziv: string
    uputstvo: string

}
