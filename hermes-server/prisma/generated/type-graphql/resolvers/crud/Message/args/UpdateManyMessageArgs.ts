import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MessageUpdateManyMutationInput } from "../../../inputs/MessageUpdateManyMutationInput";
import { MessageWhereInput } from "../../../inputs/MessageWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyMessageArgs {
  @TypeGraphQL.Field(_type => MessageUpdateManyMutationInput, {
    nullable: false
  })
  data!: MessageUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => MessageWhereInput, {
    nullable: true
  })
  where?: MessageWhereInput | undefined;
}
