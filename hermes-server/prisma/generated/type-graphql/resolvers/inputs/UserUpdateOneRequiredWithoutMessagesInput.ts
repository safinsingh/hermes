import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserCreateOrConnectWithoutmessagesInput } from "../inputs/UserCreateOrConnectWithoutmessagesInput";
import { UserCreateWithoutMessagesInput } from "../inputs/UserCreateWithoutMessagesInput";
import { UserUpdateWithoutMessagesInput } from "../inputs/UserUpdateWithoutMessagesInput";
import { UserUpsertWithoutMessagesInput } from "../inputs/UserUpsertWithoutMessagesInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpdateOneRequiredWithoutMessagesInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutMessagesInput, {
    nullable: true
  })
  create?: UserCreateWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutmessagesInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutmessagesInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutMessagesInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateWithoutMessagesInput, {
    nullable: true
  })
  update?: UserUpdateWithoutMessagesInput | undefined;
}
