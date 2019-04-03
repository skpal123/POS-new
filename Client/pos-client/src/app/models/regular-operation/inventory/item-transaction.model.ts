export class ItemTransaction{
    public Id?:string;
    public TransactionId?:string;
    public Reason?:string;
    public TransactionType?:string;
    public Quantity?:number;
    public UnitCost?:number;
    public UnitSale?:number;
    public DiscountAmount?:number;
    public Vat?:number;
    public Tax?:number;
    public SerialNo?:number;
    public LotNo?:string;
    public TransactionDate?:Date
    public Comments?:string;
    public GrvNo?:string;
    public InvoiceNo?:string;
    public ChalanNo?:string;
    public Item_Id?:string;
    public Location_Id?:string;
    public Supplier_Id?:string;
    public GrvDate?:Date
    public Approver_Id?:string;
    public Ledger_Id?:string;
    public SubLedger_Id?:string;
    public PaymentMode?:number;
}