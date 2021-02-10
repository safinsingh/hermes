import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MessageCreateInput } from "../../../inputs/MessageCreateInput";

@TypeGraphQL.ArgsType()
export class CreateMessageArgs {
  @TypeGraphQL.Field(_type => MessageCreateInput, {
    nullable: false
  })
  data!: MessageCreateInput;
}
