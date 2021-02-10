import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageCreateWithoutUserInput } from "../inputs/MessageCreateWithoutUserInput";
import { MessageUpdateWithoutUserInput } from "../inputs/MessageUpdateWithoutUserInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageUpsertWithWhereUniqueWithoutUserInput {
  @TypeGraphQL.Field(_type => MessageWhereUniqueInput, {
    nullable: false
  })
  where!: MessageWhereUniqueInput;

  @TypeGraphQL.Field(_type => MessageUpdateWithoutUserInput, {
    nullable: false
  })
  update!: MessageUpdateWithoutUserInput;

  @TypeGraphQL.Field(_type => MessageCreateWithoutUserInput, {
    nullable: false
  })
  create!: MessageCreateWithoutUserInput;
}
