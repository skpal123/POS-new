import { ItemTransaction } from "./item-transaction.model";

export class GroupItem{
    public Id?:string
    public TransactionId?:string
    public TransactionType?:string
    public Quantity?:number
    public TotalAmount?:number
    public Vat?:number
    public Tax?:number
    public DiscountRate?:number
    public DiscountAmount?:number
    public NetPaidAmount?:number
    public Group_Id?:string;
    public PaymentMode?:number;
    public Ledger_Id?:string;
    public LedgerId?:string;
    public SubLedger_Id?:string;
    public SubLedgerId?:string;
    public ItemTransactionList?:ItemTransaction[];
}