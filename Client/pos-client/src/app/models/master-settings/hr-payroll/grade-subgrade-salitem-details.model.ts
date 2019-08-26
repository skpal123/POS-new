import { GradeSubGradeSalItem } from "./grade-subgrade-salitem.model";

export class GradeSubGradeSalItemDetails{
    public Grade_Id?:string;
    public SubGrade_Id?:string;
    public GradeName?:string;
    public SubGradeName?:string;
    public GradeSubGradeSalItemList?:GradeSubGradeSalItem[]
}