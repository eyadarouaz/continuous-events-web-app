import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "src/app/core/services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../../../../core/models/user.interface";
import { EditMemberComponent } from './edit-member/edit-member.component';
import { AddMemberComponent } from "./add-member/add-member.component";

  @Component({
    selector: 'app-manage-members',
    templateUrl: './manage-members.component.html',
    styleUrls: []
  })
  export class ManageMembersComponent implements OnInit {
    constructor(private userService: UserService,
      public dialog: MatDialog,) {}

  users: User[] = [];
  selectedId: number = 0;
  dataSource = new MatTableDataSource(this.users);
  columns = [
    {
      name: 'id',
      header: 'ID',
      cell: (user: User) => `${user.id}`
    },
    {
      name: 'username',
      header: 'Username',
      cell: (user: User) => `${user.username}`,
    },
    {
      name: 'email',
      header: 'Email Address',
      cell: (user: User) => `${user.email}`,
    },
    {
      name: 'joinedOn',
      header: 'Joined On',
      cell: (user: User) => `${user.joinedOn}`,
    },
    {
      name: 'actions',
      header: 'Actions',
      cell: () => '',
    },
  ]
  displayedColumns = this.columns.map(c => c.name);

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((res: any) => {
        if (res.statusCode) {
          res.data.list.forEach((element: any) => {
            this.users.push({ id: element.id, username: element.username, email: element.email, joinedOn: element.createdAt });
          });
          this.dataSource = new MatTableDataSource(this.users);
        }
      });
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(AddMemberComponent);
    }

    openEditDialog(): void {
        const dialogRef = this.dialog.open(EditMemberComponent, {
          data: { selectedId: this.selectedId }
        });
    }

    deleteUser(id: number) {
    this.userService.deleteUser(id)
        .subscribe((res: any) => {
        if (res.statusCode) {
        //   this.toast.success('User deleted successfully')
        }
        })
    }
}