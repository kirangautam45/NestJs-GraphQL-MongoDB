import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { FindOperator, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  // Create  Student
  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }
  // get all student
  async allStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }
  //get by Id
  async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  //depend

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    //   return this.studentRepository.find({
    //     where: {
    //       id: {
    //         $in: studentIds as FindOperator<string>,
    //       },
    //     },
    //   });
  }
}
