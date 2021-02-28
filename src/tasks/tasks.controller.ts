import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipes } from './pipes/task-status-validation-pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get() //GET decorator for tasks
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] { //we've added validation pipe to all the get requests
    if (Object.keys(filterDto)) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getTasks();
    }

  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    console.log("Data deleted");
    this.tasksService.deleteTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipes ) status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }


}
