import { Field, ID, ObjectType } from '@nestjs/graphql';
import { type } from 'os';

@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
