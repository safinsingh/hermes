import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupCreateOrConnectWithoutusersInput } from "../inputs/GroupCreateOrConnectWithoutusersInput";
import { GroupCreateWithoutUsersInput } from "../inputs/GroupCreateWithoutUsersInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupCreateNestedManyWithoutUsersInput {
  @TypeGraphQL.Field(_type => [GroupCreateWithoutUsersInput], {
    nullable: true
  })
  create?: GroupCreateWithoutUsersInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupCreateOrConnectWithoutusersInput], {
    nullable: true
  })
  connectOrCreate?: GroupCreateOrConnectWithoutusersInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupWhereUniqueInput], {
    nullable: true
  })
  connect?: GroupWhereUniqueInput[] | undefined;
}
