
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Evento } from 'src/models/Evento';
import { Period } from 'src/models/Period';
import { EventService } from '../services/data/event.service';
import {MatCalendar, MatDatepicker, MatDatepickerIntl} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ReportComponent implements OnInit {
  
  constructor(private eventService:EventService) { }

  ngOnInit(): void {
    let date: Date = new Date();
    this.getDaysInMonth(date.getMonth(),date.getFullYear());

  }

  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  selectedDate: Moment;

  displayedColumns: string[] = ['data', 'input1', 'output1', 'input2', 'output2','delete'];

  panelOpenState = false;

  dataSource:Evento[];

  month = new FormControl(moment());



  getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var endDate = '';
    var startDate= date.toLocaleDateString();
    
    while (date.getMonth() === month) {
      endDate= date.toLocaleDateString();
      date.setDate(date.getDate() + 1);
    
    }
    date = new Date(year, month, 1);
    let period = new Period(null,startDate,endDate);
    
    this.eventService.getEvent(period).subscribe(
      resp => {
        var array:Evento[]=[];
        
        while (date.getMonth() === month) {
          var record:Evento = new Evento('','','',date.toLocaleDateString(),'','','','',this.dayOfWeek(date.getDay()));
          resp.forEach(eve=>{
            if(eve.data===date.toLocaleDateString()){
              record = new Evento(  
                  eve.id,
                  eve.idUser,
                  eve.username,
                  eve.data,
                  eve.input1,
                  eve.output1,
                  eve.input2,
                  eve.output2,
                  this.dayOfWeek(date.getDay()));
            }
          })
          array.push(record);
          date.setDate(date.getDate() + 1);
        }

        this.dataSource=array;
      },
      error => {
        var array:Evento[]=[];
        
        while (date.getMonth() === month) {
          var record:Evento = new Evento('','','',date.toLocaleDateString(),'','','','',this.dayOfWeek(date.getDay()));
          array.push(record);
          date.setDate(date.getDate() + 1);
        }

        this.dataSource=array;
    });
  }   
  getDateByString(data: string) {
    var array:string[] = data.split('/');
    return new Date(
      parseInt(array[0]), 
      parseInt(array[1]), 
      parseInt(array[2]) 
    );
  }

  
  selectPeriod(){
    var m:Moment=this.month.value
    this.getDaysInMonth(m.toDate().getMonth(), m.toDate().getFullYear());
  }

  saveReport(){
    var arrayEvent:Evento[]=[];
    this.dataSource.forEach(eve=>{
      if(eve.input1!==""||eve.output1!==""||eve.input2!==""||eve.output2!==""){
        arrayEvent.push(eve);
      }
    })
    this.eventService.save(arrayEvent);
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.month.value;
    ctrlValue.year(normalizedYear.year());
    this.month.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.month.value;
    ctrlValue.month(normalizedMonth.month());
    this.month.setValue(ctrlValue);
    datepicker.close();
  }

  isWeekend(day:string){
    if(day==='Sab'||day==='Dom'){
      return true;
    }
    return false;
  }

  delete(event:Evento){
    
    if(event.id!==null||event.id!==''){
      this.eventService.delete(event.id).subscribe(
        res=>{
          event.input1='';
          event.output1='';
          event.input2='';
          event.output2='';
          console.log("success");
          console.log(res);
        },
        error=>{
          console.log("error");
          console.log(error);
        }
  
      );
    }
    else{
      event.input1='';
      event.output1='';
      event.input2='';
      event.output2='';
    }
  }

  downloadCsv(){
    var arrayEvent:Evento[]=[];
    this.dataSource.forEach(eve=>{
      if(eve.id!==null&&eve.id!==''){
        arrayEvent.push(eve);
      }
    });

    var m:Moment=this.month.value
    this.eventService.downloadCsv(arrayEvent,m);

  }

  dayOfWeek(num:number){
      switch (num) {
        case 0:
          return "Dom";
          break;
        case 1:
          return "Lun";
          break;
        case 2:
          return "Mar";
          break;
        case 3:
          return "Mer";
            break;
        case 4:
          return "Gio";
            break;
        case 5:
          return "Ven";
            break;
        case 6:
          return "Sab";
            break;
        default:
          return "";
          break;
    }
  }

}

