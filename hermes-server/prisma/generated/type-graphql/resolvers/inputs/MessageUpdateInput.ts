import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { GroupUpdateOneRequiredWithoutMessagesInput } from "../inputs/GroupUpdateOneRequiredWithoutMessagesInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";
import { UserUpdateOneRequiredWithoutMessagesInput } from "../inputs/UserUpdateOneRequiredWithoutMessagesInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageUpdateInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  text?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  timestamp?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => GroupUpdateOneRequiredWithoutMessagesInput, {
    nullable: true
  })
  group?: GroupUpdateOneRequiredWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateOneRequiredWithoutMessagesInput, {
    nullable: true
  })
  user?: UserUpdateOneRequiredWithoutMessagesInput | undefined;
}
