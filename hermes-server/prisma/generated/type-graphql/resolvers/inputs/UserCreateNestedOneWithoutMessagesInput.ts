import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserCreateOrConnectWithoutmessagesInput } from "../inputs/UserCreateOrConnectWithoutmessagesInput";
import { UserCreateWithoutMessagesInput } from "../inputs/UserCreateWithoutMessagesInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserCreateNestedOneWithoutMessagesInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutMessagesInput, {
    nullable: true
  })
  create?: UserCreateWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutmessagesInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutmessagesInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;
}
