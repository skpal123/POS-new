import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOfAccountTree } from '../../../models/master-settings/account-defination/chart-of-account-tree.model';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FixedAssetDefinationService } from '../../../services/master-settings/fixed-asset-defination.service';
@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css']
})
export class ChartOfAccountComponent implements OnInit {
  chartOfAccountTreeList:ChartOfAccountTree[]=[];
  isFound:boolean=false;
  constructor(private _accountDeninationService:AccountDefinationService,
    private _service:FixedAssetDefinationService,
  private _alertBoxService:AlertBoxService){}
  ngOnInit(){
    debugger
    this.getChartOfaccountTreeList();
  }
  getChartOfaccountTreeList(){
    this._service.getChartOfAccountListForTree().subscribe(response=>{
      this.chartOfAccountTreeList=response.json();
    },error=>{
      var dialogData=new DialogData();
      dialogData.message=error.json().message;
      this._alertBoxService.openDialog(dialogData);
    })
  }
  expandAllChildNode(node:ChartOfAccountTree){
    this.isFound=false;
    var position= this.chartOfAccountTreeList.findIndex(fea=>fea.AccountId==node.AccountId);
    if(position!=-1){
      this.isFound=true;
      if(this.chartOfAccountTreeList[position].IsClicked){
        this.chartOfAccountTreeList[position].IsClicked=false;
        this.chartOfAccountTreeList[position].Children.forEach((a,b,array)=>{
          a.Status=true
        })
       }
       else{
        this.chartOfAccountTreeList[position].IsClicked=true;
        this.chartOfAccountTreeList[position].Children.forEach((a,b,array)=>{
          a.Status=false
        })
       }
    }
    else{
      this.chartOfAccountTreeList.forEach((chartOfAcc,index,array)=>{
        let position=chartOfAcc.Children.findIndex(fea=>fea.AccountId==node.AccountId);
        if(position!=-1){
          this.isFound=true;
          if(chartOfAcc.Children[position].IsClicked){
            chartOfAcc.Children[position].IsClicked=false;
            chartOfAcc.Children[position].Children.forEach((a,b,array)=>{
            a.Status=true
            if(a.Children!=null){
              this.changeStatus(a.Children,true);
            }
          })
        }
        else{
          chartOfAcc.Children[position].IsClicked=true;
          chartOfAcc.Children[position].Children.forEach((a,b,array)=>{
          a.Status=false
           if(a.Children!=null){
            this.changeStatus(a.Children,false);
           }
         })
        }
       }
       else{
          this.findChildPosition(chartOfAcc.Children,node)
       }
      })
    }
  }
  findChildPosition(trees:ChartOfAccountTree[],node:ChartOfAccountTree){
    trees.forEach((coa,index,array)=>{
      let position=coa.Children.findIndex(fea=>fea.AccountId==node.AccountId);
      if(position!=-1){
          this.isFound=true;
          if(coa.Children[position].IsClicked){
            coa.Children[position].IsClicked=false;
            coa.Children[position].Children.forEach((a,b,array)=>{
            a.Status=true
            if(a.Children!=null){
              this.changeStatus(a.Children,true)
            }
          })
        }
        else{
          coa.Children[position].IsClicked=true;
          coa.Children[position].Children.forEach((a,b,array)=>{
          a.Status=false
          if(a.Children!=null){
            this.changeStatus(a.Children,false)
          }
        })
        }
      }
      else{
        this.findChildPosition(coa.Children,node)
      }
    })
  }
  changeStatus(tree:ChartOfAccountTree[],status){
    tree.forEach((a,index,array)=>{
      a.Status=status;
      if(a.Children!=null){
        this.changeStatus(a.Children,status);
      }
    })
  }
}

