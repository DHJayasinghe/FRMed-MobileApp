import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FRMedApi {
    private baseUrl = "http://192.168.1.101:5001/frmed/api";

    constructor(private http: HttpClient) { }

    getPatientDetails(imageUri) {
        return new Promise(resolve => {
            this.http.post(`${this.baseUrl}/identify`,
                { "FrontalFace": imageUri },
                { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("Error", error);
                    resolve({ code: 500, text: error["message"] });
                });
        });
    }

    registerPatient(imageUri, reg_details: {}) {
        return new Promise(resolve => {
            this.http.post(`${this.baseUrl}/register`,
                {
                    "FrontalFace": imageUri, "Title": reg_details["title"],
                    "FirstName": reg_details["firstName"], "LastName": reg_details["lastName"],
                    "Gender": reg_details["gender"], "CivilStatus": reg_details["civilStatus"]
                },
                { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    console.log("Error", error);
                    resolve({ code: 500, text: error });
                });
        });
    }
}     