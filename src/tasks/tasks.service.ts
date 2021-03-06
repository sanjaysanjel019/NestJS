import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { timer } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto:GetTasksFilterDto): Promise<Task[]> {
    // const tasks = await this.taskRepository.find();
    // console.log("Tasks are:", tasks);
    // return tasks;
    return this.taskRepository.getTask(filterDto);
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status == status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} does not exist`);
    }
    return found;
  }

  async deleteTask(id: number): Promise<void> {
    console.log("Before the execution");
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException("Task with id does not exist");
    }
  }


  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
}
