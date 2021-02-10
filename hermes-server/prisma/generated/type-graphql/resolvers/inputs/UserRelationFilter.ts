import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserWhereInput } from "../inputs/UserWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserRelationFilter {
  @TypeGraphQL.Field(_type => UserWhereInput, {
    nullable: true
  })
  is?: UserWhereInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereInput, {
    nullable: true
  })
  isNot?: UserWhereInput | undefined;
}
