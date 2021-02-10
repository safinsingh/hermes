import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageScalarWhereInput } from "../inputs/MessageScalarWhereInput";
import { MessageUpdateManyMutationInput } from "../inputs/MessageUpdateManyMutationInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageUpdateManyWithWhereWithoutGroupInput {
  @TypeGraphQL.Field(_type => MessageScalarWhereInput, {
    nullable: false
  })
  where!: MessageScalarWhereInput;

  @TypeGraphQL.Field(_type => MessageUpdateManyMutationInput, {
    nullable: false
  })
  data!: MessageUpdateManyMutationInput;
}
