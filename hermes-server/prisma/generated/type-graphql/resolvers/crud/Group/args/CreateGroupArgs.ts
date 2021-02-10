import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { GroupCreateInput } from "../../../inputs/GroupCreateInput";

@TypeGraphQL.ArgsType()
export class CreateGroupArgs {
  @TypeGraphQL.Field(_type => GroupCreateInput, {
    nullable: false
  })
  data!: GroupCreateInput;
}
