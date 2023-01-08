import { Field, InputType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class AssignStudentToLessonInput {
  @IsUUID()
  @Field((type) => ID)
  lessonId: string;

  @IsUUID('all', { each: true })
  @Field((type) => [ID])
  studentIds: string[];
}
