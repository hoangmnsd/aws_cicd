import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './../../shared/service/data.service';
import { SortService } from './../../shared/service/sort.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  Student = [];
  search_Student = [];
  Student_Add;
  Student_Edit;
  EditUserId;

  api_student;
  api_search_student;
  api_user;
  api_score;

  // pagination's properties
  pageItems: any[];
  count = 0;
  index = 0;
  pageSize = 5;

  constructor(private _dateService: DataService,
    private _router: Router,
    private _sortService: SortService) {
    this.EditUserId = 0;
    this.api_student = 'student';
    this.api_search_student = 'searchstudent';
    this.api_user = 'user';
    this.api_score = 'score';
    this.Student_Add = {};
    this.Student_Edit = {};
  }

  ngOnInit() {
    this.loadStudent();
  }

  // Load All Student
  loadStudent() {
    this._dateService.GetAll(this.api_student).toPromise().then((result) => {
      this.Student = result;
      this._sortService.getSortedData(this.Student, { sortColumn: 'Name', sortDirection: 'asc' });
      this.count = this.Student.length;
      this.pageItems = this.Student.slice(0, this.pageSize);
    });
  }

  // Add Student
  ClickAdd() {
    this.Student_Add = {};
  }
  AddSaveForm() {
    this.Student_Add.Avarage = this.round(((+this.Student_Add.Toan) + (+this.Student_Add.Ly) + (+this.Student_Add.Hoa)) / 3, 1);
    if (this.Student_Add.Avarage >= 8) {
      this.Student_Add.Rank = 'Excellent';
    } else if (this.Student_Add.Avarage <= 5) {
      this.Student_Add.Rank = 'Bad';
    } else {
      this.Student_Add.Rank = 'Good';
    }
    this._dateService.Post(this.api_student + '/' + this.api_user, this.Student_Add).toPromise().then((result) => {
      this._dateService.Post(this.api_student + '/' + this.api_score, this.Student_Add).toPromise().then((result1) => {
        alert('Add Success !');
        location.reload();
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  // Edit Student
  Edit(userId: number) {
    this.EditUserId = userId;
    this._dateService.GetbyID(this.api_student, userId).toPromise().then((result) => {
      this.Student_Edit = result[0];
    }, error => {
      console.log(error);
    });
  }
  EditSaveForm() {
    let update_user = true;
    let update_score = true;
    this.Student_Edit.Avarage = this.round(((+this.Student_Edit.Toan) + (+this.Student_Edit.Ly) + (+this.Student_Edit.Hoa)) / 3, 1);
    if (this.Student_Edit.Avarage >= 8) {
      this.Student_Edit.Rank = 'Excellent';
    } else if (this.Student_Edit.Avarage <= 5) {
      this.Student_Edit.Rank = 'Bad';
    } else {
      this.Student_Edit.Rank = 'Good';
    }
    this._dateService.Update(this.api_student + '/' + this.EditUserId + '/' + this.api_user, this.Student_Edit)
      .toPromise().then((result) => {
      }, error => {
        update_user = false;
        console.log(error);
    });
    this._dateService.Update(this.api_student + '/' + this.EditUserId + '/' + this.api_score, this.Student_Edit)
      .toPromise().then((result1) => {
      }, error => {
        update_score = false;
        console.log(error);
    });
    if (update_user && update_score) {
      alert('Edit Success !');
      location.reload();
    } else {
      alert('Edit Fail !');
      location.reload();
    }
  }

  // Delete Student
  Delete(userId: number) {
    if (confirm('Do you want delete this Student?')) {
      this._dateService.Delete(this.api_student + '/' + userId + '/' + this.api_user).toPromise().then((result) => {
        this._dateService.Delete(this.api_student + '/' + userId + '/' + this.api_score).toPromise().then((result1) => {
          alert('Delete Success !');
          location.reload();
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }
  }

  // Round
  round(number, precision) {
    var shift = (number, precision, reverseShift) => {
      if (reverseShift) {
        precision = -precision;
      }
      var numArray = ('' + number).split('e');
      return +(numArray[0] + 'e' + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
  }

  // Search
  search(condition: any, value: string) {
    let table = '';
    let searchBy = '';
    if (condition === '0' || condition === '1' || condition === '2') {
      table = 'user';
    } else {
      table = 'score';
    }
    switch (condition) {
      case '0': {
        searchBy = 'Name';
        break;
      }
      case '1': {
        searchBy = 'DateOfBird';
        break;
      }
      case '2': {
        searchBy = 'Address';
        break;
      }
      case '3': {
        searchBy = 'Toan';
        break;
      }
      case '4': {
        searchBy = 'Ly';
        break;
      }
      case '5': {
        searchBy = 'Hoa';
        break;
      }
      case '6': {
        searchBy = 'Avarage';
        break;
      }
      default: {
        searchBy = 'Rank';
        break;
      }
    }
    if (value === '') {
      this.loadStudent();
    } else {
      this._dateService.GetAll(this.api_search_student + '/' + table + '/' + searchBy + '/' + value).toPromise().then((result) => {
        this.Student = result;
        this._sortService.getSortedData(this.Student, { sortColumn: 'Name', sortDirection: 'asc' });
        this.count = this.Student.length;
        this.pageItems = this.Student.slice(0, this.pageSize);
      });
    }
  }

  // Pagination
  onPageChanged(pageIndex) {
    this.pageItems = this.Student.slice(pageIndex, pageIndex + this.pageSize);
    this.index = pageIndex;
  }

  // sort
  onSorted($event) {
    const unSortedData = this._sortService.getSortedData(this.Student, $event);
    // reset page data when sorting
    this.count = unSortedData.length;
    this.pageItems = unSortedData.slice(this.index, this.index + this.pageSize);
  }

}
