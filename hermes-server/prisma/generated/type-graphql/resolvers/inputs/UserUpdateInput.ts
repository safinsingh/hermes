import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupUpdateManyWithoutUsersInput } from "../inputs/GroupUpdateManyWithoutUsersInput";
import { MessageUpdateManyWithoutUserInput } from "../inputs/MessageUpdateManyWithoutUserInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpdateInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  email?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  password?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => MessageUpdateManyWithoutUserInput, {
    nullable: true
  })
  messages?: MessageUpdateManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => GroupUpdateManyWithoutUsersInput, {
    nullable: true
  })
  groups?: GroupUpdateManyWithoutUsersInput | undefined;
}
