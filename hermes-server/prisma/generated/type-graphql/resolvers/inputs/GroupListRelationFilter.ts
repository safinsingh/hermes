import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupWhereInput } from "../inputs/GroupWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupListRelationFilter {
  @TypeGraphQL.Field(_type => GroupWhereInput, {
    nullable: true
  })
  every?: GroupWhereInput | undefined;

  @TypeGraphQL.Field(_type => GroupWhereInput, {
    nullable: true
  })
  some?: GroupWhereInput | undefined;

  @TypeGraphQL.Field(_type => GroupWhereInput, {
    nullable: true
  })
  none?: GroupWhereInput | undefined;
}
