import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'MEAN';
	tasks = [];
	singleTask = {};
	constructor(private _httpService: HttpService){
		// this.getTheTasks()
		// this.getJustOneTask(event)
	}
	getTheTasks(){
		let x = this._httpService.getTasks()
		x.subscribe(data =>{
			this.tasks = data['data']
		})
	}
	getJustOneTask(event, id){
		console.log(event)
		console.log(id)
		this._httpService.getOneTask(id).subscribe(data =>{
			console.log(data)
			this.singleTask = data['data']
		})
	}
}
