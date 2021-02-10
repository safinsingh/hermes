import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MessageUpdateInput } from "../../../inputs/MessageUpdateInput";
import { MessageWhereUniqueInput } from "../../../inputs/MessageWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateMessageArgs {
  @TypeGraphQL.Field(_type => MessageUpdateInput, {
    nullable: false
  })
  data!: MessageUpdateInput;

  @TypeGraphQL.Field(_type => MessageWhereUniqueInput, {
    nullable: false
  })
  where!: MessageWhereUniqueInput;
}
