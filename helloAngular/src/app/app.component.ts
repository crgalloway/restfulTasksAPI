import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'MEAN';
	tasks = [];
	singleTask = {};
	newTask: any;
	editTask: any;
	showEdit = false;
	constructor(private _httpService: HttpService){
	}
	ngOnInit(){
		this.newTask = {title:"", description:""}
		this.editTask = {title:"", description:""}
	}
	getTheTasks(){
		let x = this._httpService.getTasks()
		x.subscribe(data =>{
			this.tasks = data['data']
		})
	}
	getJustOneTask(id){
		this._httpService.getOneTask(id).subscribe(data =>{
			this.singleTask = data['data']
		})
	}
	onSubmit(){
		this._httpService.createTask(this.newTask).subscribe()
		this.newTask = { title: "", description: "" }
	}
	deleteMe(id){
		this._httpService.deleteTask(id).subscribe()
	}
	editMe(id){
		this._httpService.getOneTask(id).subscribe(data =>{
			console.log(data)
			this.editTask = data['data']
			this.showEdit = true
		})
	}
	submitEdit(id){
		console.log('Got to components')
		console.log(id)
		this._httpService.editTask(id, this.editTask).subscribe()
		this.editTask = { title: "", description: "" }
		this.showEdit = false
	}
}
