import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Moment } from 'moment';
import { port, server } from 'src/app/app.constants';
import { NotificheComponent } from 'src/app/notifiche/notifiche.component';
import { Evento } from 'src/models/Evento';
import { Period } from 'src/models/Period';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient:HttpClient, private dialog:MatDialog) { }

  getEvent(period:Period) {
    
    var acc="/account"
    if(period.idUser!==null){
      acc = ``;
    }
    const url = `http://${server}:${port}`+ acc +`/event/search`;
    
    return this.httpClient.post<Evento[]>(url ,period,{ responseType: 'json'});
    

  }


  save(array:Evento[]) {
    const url = `http://${server}:${port}/event/service/save`;

    return this.httpClient.post<any>(url ,array,{ responseType: 'json'}).subscribe(
      res=>{
        this.dialog.open(NotificheComponent,{data:{message: res.msg}});
      },
      error=>{
        this.dialog.open(NotificheComponent,{data:{message: error.error.cause}}).updatePosition({
          top: '100px'
        });
        console.log(error);
      }
    );
  }

  delete(eve:string) {
    const url = `http://${server}:${port}/event/service/delete/`+eve;

    return this.httpClient.delete<Evento[]>(url ,{ responseType: 'json'});
  }

  downloadCsv(array:Evento[],m:Moment) {
    const url = `http://${server}:${port}/report/csv/download`;

    return this.httpClient.post<any>(url ,array,{ responseType: 'text' as any}).subscribe(
      res=>{
        this.downloadFile(res,m);
      },
      error=>{
        this.dialog.open(NotificheComponent,{data:{message: error.error.cause}}).updatePosition({
          top: '100px'
        });
        console.log(error);
      }
    );
  }

  downloadFile(data: any,m:Moment) {
    var blob = new Blob([data], { type: 'text/csv' });
    let a = document.createElement("a") 
    const url= window.URL.createObjectURL(blob);
    var month = m.toDate().toLocaleDateString().substring(3,m.toDate().toLocaleDateString().length)
    a.download ='report'+month+'.csv';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  
    

}
