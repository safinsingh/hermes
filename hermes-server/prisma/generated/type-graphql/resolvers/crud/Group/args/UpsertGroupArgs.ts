import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { GroupCreateInput } from "../../../inputs/GroupCreateInput";
import { GroupUpdateInput } from "../../../inputs/GroupUpdateInput";
import { GroupWhereUniqueInput } from "../../../inputs/GroupWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertGroupArgs {
  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: false
  })
  where!: GroupWhereUniqueInput;

  @TypeGraphQL.Field(_type => GroupCreateInput, {
    nullable: false
  })
  create!: GroupCreateInput;

  @TypeGraphQL.Field(_type => GroupUpdateInput, {
    nullable: false
  })
  update!: GroupUpdateInput;
}
