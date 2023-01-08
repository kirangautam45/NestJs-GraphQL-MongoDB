import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentToLessonInput } from './assign-students-to-lesson.input';
import { Student } from '../student/student.entity';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  //Get All Information Of Lesson by ID From Service

  @Query((returns) => LessonType)
  async lessonById(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }
  //Get All Information Of All Lesson From Service

  @Query((returns) => [LessonType])
  allLesson() {
    return this.lessonService.getLessons();
  }

  //Create Lesson Use From Service
  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }
  //assign students to lesson
  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentTOLessonInput')
    assignStudentToLessonInput: AssignStudentToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }
  @ResolveField()
  async Student(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
