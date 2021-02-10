import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageCreateNestedManyWithoutGroupInput } from "../inputs/MessageCreateNestedManyWithoutGroupInput";
import { UserCreateNestedManyWithoutGroupsInput } from "../inputs/UserCreateNestedManyWithoutGroupsInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => UserCreateNestedManyWithoutGroupsInput, {
    nullable: true
  })
  users?: UserCreateNestedManyWithoutGroupsInput | undefined;

  @TypeGraphQL.Field(_type => MessageCreateNestedManyWithoutGroupInput, {
    nullable: true
  })
  messages?: MessageCreateNestedManyWithoutGroupInput | undefined;
}
