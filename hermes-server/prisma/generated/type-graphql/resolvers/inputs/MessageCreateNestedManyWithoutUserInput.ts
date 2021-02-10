import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageCreateOrConnectWithoutuserInput } from "../inputs/MessageCreateOrConnectWithoutuserInput";
import { MessageCreateWithoutUserInput } from "../inputs/MessageCreateWithoutUserInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageCreateNestedManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [MessageCreateWithoutUserInput], {
    nullable: true
  })
  create?: MessageCreateWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageCreateOrConnectWithoutuserInput], {
    nullable: true
  })
  connectOrCreate?: MessageCreateOrConnectWithoutuserInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  connect?: MessageWhereUniqueInput[] | undefined;
}
