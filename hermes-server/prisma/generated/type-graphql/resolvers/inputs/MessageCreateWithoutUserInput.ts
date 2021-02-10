import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupCreateNestedOneWithoutMessagesInput } from "../inputs/GroupCreateNestedOneWithoutMessagesInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageCreateWithoutUserInput {
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
}
