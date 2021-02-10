import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupWhereInput } from "../inputs/GroupWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupRelationFilter {
  @TypeGraphQL.Field(_type => GroupWhereInput, {
    nullable: true
  })
  is?: GroupWhereInput | undefined;

  @TypeGraphQL.Field(_type => GroupWhereInput, {
    nullable: true
  })
  isNot?: GroupWhereInput | undefined;
}
