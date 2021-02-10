import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserCreateOrConnectWithoutgroupsInput } from "../inputs/UserCreateOrConnectWithoutgroupsInput";
import { UserCreateWithoutGroupsInput } from "../inputs/UserCreateWithoutGroupsInput";
import { UserScalarWhereInput } from "../inputs/UserScalarWhereInput";
import { UserUpdateManyWithWhereWithoutGroupsInput } from "../inputs/UserUpdateManyWithWhereWithoutGroupsInput";
import { UserUpdateWithWhereUniqueWithoutGroupsInput } from "../inputs/UserUpdateWithWhereUniqueWithoutGroupsInput";
import { UserUpsertWithWhereUniqueWithoutGroupsInput } from "../inputs/UserUpsertWithWhereUniqueWithoutGroupsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpdateManyWithoutGroupsInput {
  @TypeGraphQL.Field(_type => [UserCreateWithoutGroupsInput], {
    nullable: true
  })
  create?: UserCreateWithoutGroupsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserCreateOrConnectWithoutgroupsInput], {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutgroupsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserUpsertWithWhereUniqueWithoutGroupsInput], {
    nullable: true
  })
  upsert?: UserUpsertWithWhereUniqueWithoutGroupsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  connect?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  set?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  disconnect?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  delete?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserUpdateWithWhereUniqueWithoutGroupsInput], {
    nullable: true
  })
  update?: UserUpdateWithWhereUniqueWithoutGroupsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserUpdateManyWithWhereWithoutGroupsInput], {
    nullable: true
  })
  updateMany?: UserUpdateManyWithWhereWithoutGroupsInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserScalarWhereInput], {
    nullable: true
  })
  deleteMany?: UserScalarWhereInput[] | undefined;
}
