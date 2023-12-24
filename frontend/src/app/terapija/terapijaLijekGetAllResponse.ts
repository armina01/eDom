import {LijekGetAllResponseLijek} from "./lijekGetAllResponse";
import {TerapijaGetAllResponseTerapija} from "./TerapijaGetAllResponse";

export interface TerapijaLijekGetAllResponse{
  terapijeLijekovi:TerapijaLijekGetAllResponseTerapijaLijek[]
}

export interface TerapijaLijekGetAllResponseTerapijaLijek{
   terapijaLijekId:number,
   terapijaId:number,
   lijekId:number,
   lijek:LijekGetAllResponseLijek,
   terapija:TerapijaGetAllResponseTerapija
}
