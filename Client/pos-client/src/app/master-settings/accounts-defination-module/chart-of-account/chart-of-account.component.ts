import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOfAccountTree } from '../../../models/master-settings/account-defination/chart-of-account-tree.model';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ChartOfaccount } from '../../../models/master-settings/account-defination/chart-of-account.model';
import { AccountDetails } from '../../../models/master-settings/account-defination/account-details.model';
import { Subledger } from '../../../models/master-settings/account-defination/subledger.model';
import { MatDialog } from '@angular/material';
import { AddSubledgerComponent } from '../add-subledger/add-subledger.component';
@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css']
})
export class ChartOfAccountComponent implements OnInit {
  chartOfAccountTreeList:ChartOfAccountTree[]=[];
  accountDetails:AccountDetails;
  account:ChartOfaccount={AccountType:"0",};
  subledger:Subledger={Id:null,Description:null,SublederCode:null,AccountId:null}
  Status:string="add";
  isFound:boolean=false;
  IsSubledgerEnable:boolean=false;
  constructor(private _accountDeninationService:AccountDefinationService,
    private _service:AccountDefinationService,
    private matDialog:MatDialog,
  private _alertBoxService:AlertBoxService){}
  ngOnInit(){
    debugger
    this.getChartOfaccountTreeList();
  }
  getChartOfaccountTreeList(){
    this._service.getChartOfAccountListForTree().subscribe(response=>{
      this.accountDetails=response.json();
      this.chartOfAccountTreeList=this.accountDetails.AccountParentChildRelationInfoList;
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
  selectedNode(selectedNode:ChartOfAccountTree){
    console.log(selectedNode)
    if(this.Status=="add"){
      var AutoAccountCode;
      this.account.Id=null;
      this._service.getMaxAccidByGroupIdAndLevelId(selectedNode.ChildGroupId,selectedNode.ChildLevelId+1).subscribe(response=>{
        let maxAccid=response.json();
        let newAccid=maxAccid+1;
        let newlevel=selectedNode.ChildLevelId+1;
        this.account.LevelId=newlevel;
        this.account.AccId=newAccid;
        this.account.GroupId=selectedNode.ChildGroupId
        AutoAccountCode=selectedNode.ChildGroupId+"0"+newlevel+"00"+newAccid.toString();
        this.account.AutoAccountCode=AutoAccountCode;
        this.account.ManualAccountCode=AutoAccountCode;
        this.account.AccountDescription=null;
        this.account.ParentAccountId=selectedNode.AccountId;
      },error=>{
        let message=error.json();
        var dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBoxService.openDialog(dialogData);
      })
    }
    else{
      this.account.Id=selectedNode.AccountId;
      this.account.ManualAccountCode=selectedNode.ManualAccountCode;
      this.account.AutoAccountCode=selectedNode.AutoAccountCode;
      this.account.AccountDescription=selectedNode.AccountDescription;
      if(selectedNode.IsLeaf){
        this.IsSubledgerEnable=true;
        this.subledger.AccountId=selectedNode.AccountId;
      }
      else{
        this.IsSubledgerEnable=false;
      }
    }
  }
  createChartOfAccount(){
    if(this.account.Id==null){
      this._service.CreateChartOfAccount(this.account).subscribe(response=>{
        let result=response.json();
        if(result){
          var dialogData=new DialogData();
          dialogData.message="Chart of account create succesfully";
          this._alertBoxService.openDialog(dialogData);
          this.getChartOfaccountTreeList();
        }
      },error=>{
        let message=error.json();
        var dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBoxService.openDialog(dialogData);
      })
    }
    else{
      this._service.UpdateChartOfAccount(this.account).subscribe(response=>{
        let result=response.json();
        if(result){
          var dialogData=new DialogData();
          dialogData.message="Chart of account updated succesfully";
          this._alertBoxService.openDialog(dialogData);
          this.getChartOfaccountTreeList();
        }
      },error=>{
        let message=error.json();
        var dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBoxService.openDialog(dialogData);
      })
    }
  }
  addSubleder(){
      const dialogRef=this.matDialog.open(AddSubledgerComponent,{
        disableClose:true,
        data:this.subledger,
        height:window.screen.height*.6+'px',
        width:window.screen.width*.6+'px'
      });
  }
}

