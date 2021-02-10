import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupCreateNestedOneWithoutMessagesInput } from "../inputs/GroupCreateNestedOneWithoutMessagesInput";
import { UserCreateNestedOneWithoutMessagesInput } from "../inputs/UserCreateNestedOneWithoutMessagesInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  text!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  timestamp?: Date | undefined;

  @TypeGraphQL.Field(_type => GroupCreateNestedOneWithoutMessagesInput, {
    nullable: false
  })
  group!: GroupCreateNestedOneWithoutMessagesInput;

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutMessagesInput, {
    nullable: false
  })
  user!: UserCreateNestedOneWithoutMessagesInput;
}
