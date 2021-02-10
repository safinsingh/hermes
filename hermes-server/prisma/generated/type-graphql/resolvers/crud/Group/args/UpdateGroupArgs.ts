import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { GroupUpdateInput } from "../../../inputs/GroupUpdateInput";
import { GroupWhereUniqueInput } from "../../../inputs/GroupWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateGroupArgs {
  @TypeGraphQL.Field(_type => GroupUpdateInput, {
    nullable: false
  })
  data!: GroupUpdateInput;

  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: false
  })
  where!: GroupWhereUniqueInput;
}
