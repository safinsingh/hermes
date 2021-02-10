import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserCreateOrConnectWithoutgroupsInput } from "../inputs/UserCreateOrConnectWithoutgroupsInput";
import { UserCreateWithoutGroupsInput } from "../inputs/UserCreateWithoutGroupsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserCreateNestedManyWithoutGroupsInput {
  @TypeGraphQL.Field(_type => [UserCreateWithoutGroupsInput], {
    nullable: true
  })
  create?: UserCreateWithoutGroupsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserCreateOrConnectWithoutgroupsInput], {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutgroupsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  connect?: UserWhereUniqueInput[] | undefined;
}
