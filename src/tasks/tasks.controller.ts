import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipes } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get() //GET decorator for tasks
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> { //we've added validation pipe to all the get requests
    return this.tasksService.getTasks(filterDto);

  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id',ParseIntPipe) id: number) {
     this.tasksService.deleteTask(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTaskStatus(@Param('id') id: number, @Body('status', TaskStatusValidationPipes ) status: TaskStatus): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }


}
