import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Task} from './models/task';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService 
{
  createDb()
  {
    const tasks = [
      {id:11, title:'DDD', description:'...', priority:true},
      {id:12, title: 'Edddd', description: '...', priority:true},
      {id:13, title: 'hhhhhh', description: '...', priority:false},
      {id:14, title: 'Ddmdjm', description: '...', priority:true}
    ];
    return{tasks};
  
  }
 

  genId(tasks: Task[]): number
  {
    return tasks.length > 0 ? Math.max(...tasks.map(Task => Task.id)) + 1 : 11;
  }

  constructor() { }
}
