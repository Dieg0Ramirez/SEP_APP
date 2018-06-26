import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcelService } from '../../services/excel/excel.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  rows = [];
  data;
  connection;
  connectionFull;

  showBox: Boolean = false;
  showBtnClose: Boolean = false;
  showBoxBody: Boolean = true;
  iconChevron = 'fa fa-chevron-down';

  titleProcess: Boolean = true;
  titleFinish: Boolean = false;

  iteracion = 0;
  sizeExcel = 0;

  constructor(public excelService: ExcelService) { }

  ngOnInit() {
    // add the the body classes
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');

    this.connection = this.excelService.processRowExcel().subscribe((row: any) => {
      this.rows.push(row);
      this.showBox = true;
      this.showBtnClose = false;

      this.titleProcess = true;
      this.titleFinish = false;

      this.iteracion = row.iteracion;
      this.sizeExcel = row.sizeExcel;

      console.log(row);
    });

    this.connectionFull = this.excelService.processFullExcel().subscribe(data => {
      this.data = data;
      this.showBox = true;
      this.showBtnClose = true;
      this.showBoxBody = true;

      this.titleProcess = false;
      this.titleFinish = true;
      console.log(data);
    });
  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }

  bodyShow() {
    if (this.iconChevron === 'fa fa-chevron-down') {
      this.iconChevron = 'fa fa-chevron-up';
      this.showBoxBody = false;
    } else {
      this.iconChevron = 'fa fa-chevron-down';
      this.showBoxBody = true;
    }
  }

  boxClose() {
    this.showBox = false;
    // this.connection.unsubscribe();
    // this.connectionFull.unsubscribe();
  }


}
