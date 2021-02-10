import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MessageWhereInput } from "../../../inputs/MessageWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyMessageArgs {
  @TypeGraphQL.Field(_type => MessageWhereInput, {
    nullable: true
  })
  where?: MessageWhereInput | undefined;
}
