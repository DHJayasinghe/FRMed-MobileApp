import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class FRMedApi {
    private baseUrl = "http://192.168.1.3:5001/frec/api";

    constructor(private http: HttpClient) { }

    getPatientDetails(imageUri) {
        return new Promise(resolve => {
            this.http.post(`${this.baseUrl}/identify`,
                { "FrontalFace": imageUri },
                { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                .subscribe(data => {
                    console.log("POST Request is successful ", data);
                    console.log(data['FullName']);
                    resolve({ code: 200, data: data });
                }, error => {
                    console.log("Error", error);
                    resolve({ code: 500, data: error });
                });
        })
    }
}     