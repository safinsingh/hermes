import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { GroupUpdateManyMutationInput } from "../../../inputs/GroupUpdateManyMutationInput";
import { GroupWhereInput } from "../../../inputs/GroupWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyGroupArgs {
  @TypeGraphQL.Field(_type => GroupUpdateManyMutationInput, {
    nullable: false
  })
  data!: GroupUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => GroupWhereInput, {
    nullable: true
  })
  where?: GroupWhereInput | undefined;
}
