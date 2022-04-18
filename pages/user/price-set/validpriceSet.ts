
export class ValidPriceSet {
    id:string;
    projectName: string;
    UnitId: string;
        
    
    fromDate: String;
    toDate: String;
    price: number;
    

    constructor(id?:string, projectName?:string, UnitId?:string, fromDate?:String, toDate?:String, price?:number) { 
        this.id=id;
        this.projectName=projectName;
        this.UnitId=UnitId;
        this.fromDate=fromDate;
        this.toDate=toDate;
        this.price=price;

    }
}
