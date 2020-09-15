import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Suivi } from '../models/suivi.model';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class SuivisService {

  suivis: Suivi[] = [];
  suivisSubject = new Subject<Suivi[]>();

  emitSuivis() {
    this.suivisSubject.next(this.suivis);
  }

  saveSuivis(idReptile: number, newSuivi: Suivi) {
    firebase.database().ref('/suivis/'+idReptile).push(newSuivi);
  }

  getSuivis(idReptile: number) {
    firebase.database().ref('/suivis/'+idReptile)
      .on('value', (data) => {
          this.suivis = data.val() ? data.val() : [];
          this.emitSuivis();
        }
      );
  }

  getShowSuivi(idReptile: number, id) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/suivis/' + idReptile + '/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewSuivi(idReptile: number, newSuivi: Suivi) {
    this.suivis.push(newSuivi);
    this.saveSuivis(idReptile, newSuivi);
    this.emitSuivis();
  }

  removeSuivi(idReptile: number, id) {
    firebase.database().ref('/suivis/' + idReptile + '/' + id).remove();
    this.suivis.splice(id, 1);
    this.emitSuivis();
  }

  removeSuivis(idReptile: number) {
    firebase.database().ref('/suivis/' + idReptile ).remove();
    this.emitSuivis();
  }

  constructor(private route: ActivatedRoute) {
    this.getSuivis(this.route.snapshot.params['id']);
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
}
