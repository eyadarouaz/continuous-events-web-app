import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "../../../../core/services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../../../../core/models/user.interface";
import { EditMemberComponent } from './edit-member/edit-member.component';
import { AddMemberComponent } from "./add-member/add-member.component";
import { ToastrService } from "ngx-toastr";

  @Component({
    selector: 'app-manage-members',
    templateUrl: './manage-members.component.html',
    styleUrls: []
  })
  export class ManageMembersComponent implements OnInit {

    users: User[] = [];
    selectedId = 0;
    dataSource = new MatTableDataSource(this.users);
    columns = [
      {
        name: 'id',
        header: 'ID',
        cell: (user: User) => `${user.id}`
      },
      {
        name: 'image',
        header: '',
        cell: (user: User) => `${user.image}`,
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

    constructor(
      private userService: UserService,
      public dialog: MatDialog,public toast: ToastrService
    ) {}

    ngOnInit(): void {
      this.userService.getUsers()
      .subscribe((res: any) => {
        res.data.list.forEach((element: any) => {
        let pic = 'assets/images/default_profile_image.webp'
        if (element.profileImage) {
        pic = `http://localhost:3000/user/${element.id}/profile-photo`;
        }
        this.users.push({ id: element.id, image: pic, username: element.username, 
          email: element.email, joinedOn: new Date(element.createdAt).toLocaleDateString() });
        });
        this.dataSource = new MatTableDataSource(this.users);
      });
    }

    refresh() {
      this.users = []
      this.userService.getUsers()
      .subscribe((res: any) => {
        res.data.list.forEach((element: any) => {
          let pic = 'assets/images/default_profile_image.webp'
          if (element.profileImage) {
            pic = `http://localhost:3000/user/${element.id}/profile-photo`;
          }
          this.users.push({ id: element.id, image: pic, username: element.username, 
          email: element.email, joinedOn: new Date(element.createdAt).toLocaleDateString() });
        });
        this.dataSource = new MatTableDataSource(this.users);
      });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(AddMemberComponent);
        dialogRef.afterClosed().subscribe(() => {
          this.waitRefresh()
        })
    }

    openEditDialog(): void {
        const dialogRef = this.dialog.open(EditMemberComponent, {
          data: { selectedId: this.selectedId, users: this.users }
        });
        dialogRef.afterClosed().subscribe(() => {
          this.waitRefresh()
        })
    }

    deleteUser(id: number) {
      this.userService.deleteUser(id)
      .subscribe(() => {
        this.toast.success('User deleted successfully')
      });
    }

    waitRefresh() {
      setTimeout(() => {
        this.refresh();
     }, 1000);
    }
}