import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { UserUpdateManyWithoutGroupsInput } from "../inputs/UserUpdateManyWithoutGroupsInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupUpdateWithoutMessagesInput {
  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateManyWithoutGroupsInput, {
    nullable: true
  })
  users?: UserUpdateManyWithoutGroupsInput | undefined;
}
