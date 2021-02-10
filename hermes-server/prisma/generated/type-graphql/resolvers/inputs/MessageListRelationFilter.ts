import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageWhereInput } from "../inputs/MessageWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageListRelationFilter {
  @TypeGraphQL.Field(_type => MessageWhereInput, {
    nullable: true
  })
  every?: MessageWhereInput | undefined;

  @TypeGraphQL.Field(_type => MessageWhereInput, {
    nullable: true
  })
  some?: MessageWhereInput | undefined;

  @TypeGraphQL.Field(_type => MessageWhereInput, {
    nullable: true
  })
  none?: MessageWhereInput | undefined;
}
