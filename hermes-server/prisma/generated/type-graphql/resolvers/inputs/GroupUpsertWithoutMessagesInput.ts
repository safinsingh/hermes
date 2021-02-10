import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupCreateWithoutMessagesInput } from "../inputs/GroupCreateWithoutMessagesInput";
import { GroupUpdateWithoutMessagesInput } from "../inputs/GroupUpdateWithoutMessagesInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupUpsertWithoutMessagesInput {
  @TypeGraphQL.Field(_type => GroupUpdateWithoutMessagesInput, {
    nullable: false
  })
  update!: GroupUpdateWithoutMessagesInput;

  @TypeGraphQL.Field(_type => GroupCreateWithoutMessagesInput, {
    nullable: false
  })
  create!: GroupCreateWithoutMessagesInput;
}
