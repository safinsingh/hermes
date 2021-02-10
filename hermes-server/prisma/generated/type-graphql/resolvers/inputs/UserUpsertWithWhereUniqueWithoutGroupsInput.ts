import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserCreateWithoutGroupsInput } from "../inputs/UserCreateWithoutGroupsInput";
import { UserUpdateWithoutGroupsInput } from "../inputs/UserUpdateWithoutGroupsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpsertWithWhereUniqueWithoutGroupsInput {
  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: false
  })
  where!: UserWhereUniqueInput;

  @TypeGraphQL.Field(_type => UserUpdateWithoutGroupsInput, {
    nullable: false
  })
  update!: UserUpdateWithoutGroupsInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutGroupsInput, {
    nullable: false
  })
  create!: UserCreateWithoutGroupsInput;
}
