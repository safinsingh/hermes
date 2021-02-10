import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MessageCreateInput } from "../../../inputs/MessageCreateInput";
import { MessageUpdateInput } from "../../../inputs/MessageUpdateInput";
import { MessageWhereUniqueInput } from "../../../inputs/MessageWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertMessageArgs {
  @TypeGraphQL.Field(_type => MessageWhereUniqueInput, {
    nullable: false
  })
  where!: MessageWhereUniqueInput;

  @TypeGraphQL.Field(_type => MessageCreateInput, {
    nullable: false
  })
  create!: MessageCreateInput;

  @TypeGraphQL.Field(_type => MessageUpdateInput, {
    nullable: false
  })
  update!: MessageUpdateInput;
}
