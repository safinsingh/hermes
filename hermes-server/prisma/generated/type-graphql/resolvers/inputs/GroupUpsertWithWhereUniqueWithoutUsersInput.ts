import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupCreateWithoutUsersInput } from "../inputs/GroupCreateWithoutUsersInput";
import { GroupUpdateWithoutUsersInput } from "../inputs/GroupUpdateWithoutUsersInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupUpsertWithWhereUniqueWithoutUsersInput {
  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: false
  })
  where!: GroupWhereUniqueInput;

  @TypeGraphQL.Field(_type => GroupUpdateWithoutUsersInput, {
    nullable: false
  })
  update!: GroupUpdateWithoutUsersInput;

  @TypeGraphQL.Field(_type => GroupCreateWithoutUsersInput, {
    nullable: false
  })
  create!: GroupCreateWithoutUsersInput;
}
