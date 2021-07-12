import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/data/user/user.service';
import { User } from 'src/models/User';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UserListComponent implements OnInit {

  userList:User[];
  dataSource= new MatTableDataSource([]);
  columnsToDisplay = ['id','username','name','surname'];
  displayMap: Map<string,string> = new Map( [['id','id'],['username','Username'],['name','Nome'],['surname','Cognome']])
  expandedElement: User | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService:UserService, 
    private dialog:MatDialog, 
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers() {
    this.userService.loadUserList().subscribe(
      resp => {
        this.dataSource=new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log('error');
    });
  }

  deleteUser(id:string){
    this.userService.deleteUser(id).subscribe(
      resp => {
        this.ngOnInit();
      },
      error => {
        console.log('error');
    });
  }

}


