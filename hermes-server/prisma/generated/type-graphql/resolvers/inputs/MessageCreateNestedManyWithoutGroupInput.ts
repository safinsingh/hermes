import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageCreateOrConnectWithoutgroupInput } from "../inputs/MessageCreateOrConnectWithoutgroupInput";
import { MessageCreateWithoutGroupInput } from "../inputs/MessageCreateWithoutGroupInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageCreateNestedManyWithoutGroupInput {
  @TypeGraphQL.Field(_type => [MessageCreateWithoutGroupInput], {
    nullable: true
  })
  create?: MessageCreateWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageCreateOrConnectWithoutgroupInput], {
    nullable: true
  })
  connectOrCreate?: MessageCreateOrConnectWithoutgroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  connect?: MessageWhereUniqueInput[] | undefined;
}
