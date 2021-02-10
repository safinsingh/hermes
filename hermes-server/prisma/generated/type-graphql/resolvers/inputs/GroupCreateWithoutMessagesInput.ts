import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserCreateNestedManyWithoutGroupsInput } from "../inputs/UserCreateNestedManyWithoutGroupsInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupCreateWithoutMessagesInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => UserCreateNestedManyWithoutGroupsInput, {
    nullable: true
  })
  users?: UserCreateNestedManyWithoutGroupsInput | undefined;
}
