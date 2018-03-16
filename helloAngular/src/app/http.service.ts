import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

	constructor(private _http: HttpClient) {
	}
	getTasks(){
		return this._http.get('/tasks');
	}
	getOneTask(id){
		return this._http.get('/tasks/'+id);
	}
	createTask(newTask){
		return this._http.post('/tasks', newTask);
	}
	deleteTask(id){
		return this._http.delete('/tasks/'+id);
	}
	editTask(id, editTask){
		console.log("Got to service")
		console.log(id)
		console.log(editTask)
		return this._http.put('/tasks/'+id, editTask);
	}
}