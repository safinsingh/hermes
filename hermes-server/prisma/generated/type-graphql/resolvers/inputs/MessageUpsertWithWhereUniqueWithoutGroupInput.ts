import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageCreateWithoutGroupInput } from "../inputs/MessageCreateWithoutGroupInput";
import { MessageUpdateWithoutGroupInput } from "../inputs/MessageUpdateWithoutGroupInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageUpsertWithWhereUniqueWithoutGroupInput {
  @TypeGraphQL.Field(_type => MessageWhereUniqueInput, {
    nullable: false
  })
  where!: MessageWhereUniqueInput;

  @TypeGraphQL.Field(_type => MessageUpdateWithoutGroupInput, {
    nullable: false
  })
  update!: MessageUpdateWithoutGroupInput;

  @TypeGraphQL.Field(_type => MessageCreateWithoutGroupInput, {
    nullable: false
  })
  create!: MessageCreateWithoutGroupInput;
}
