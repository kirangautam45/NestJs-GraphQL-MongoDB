import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './student.input';
import { identity } from 'rxjs';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}
  //Create User Use From Service
  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createstudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
  //Get All Information Of All Student From Service
  @Query((returns) => [StudentType])
  allStudents() {
    return this.studentService.allStudents();
  }
  //Get All Information Of Student by ID From Service
  @Query((returns) => StudentType)
  studentById(@Args('id') id: string) {
    return this.studentService.getStudentById(id);
  }
}
