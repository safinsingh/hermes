import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupScalarWhereInput } from "../inputs/GroupScalarWhereInput";
import { GroupUpdateManyMutationInput } from "../inputs/GroupUpdateManyMutationInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupUpdateManyWithWhereWithoutUsersInput {
  @TypeGraphQL.Field(_type => GroupScalarWhereInput, {
    nullable: false
  })
  where!: GroupScalarWhereInput;

  @TypeGraphQL.Field(_type => GroupUpdateManyMutationInput, {
    nullable: false
  })
  data!: GroupUpdateManyMutationInput;
}
