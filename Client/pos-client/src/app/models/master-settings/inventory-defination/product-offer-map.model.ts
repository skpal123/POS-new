import { MultiSelectDropdown } from "../../common/multiselect.dropdown.model";
export class ProductOfferMap{
    public Id ?:string
    public Offer_Id?:string
    public Product_Id ?:string
    public ProductName ?:string
    public FreeProduct_Id ?:string
    public FreeProductList?:MultiSelectDropdown[]
    public ProductList?:MultiSelectDropdown[]
    public DiscountRate ?:number
    public BundleSize?:number
    public IsOneToMany?:boolean;
    public IsManyToOne?:boolean;
    public ViewFreeProduct?:string;
}