import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupCreateOrConnectWithoutmessagesInput } from "../inputs/GroupCreateOrConnectWithoutmessagesInput";
import { GroupCreateWithoutMessagesInput } from "../inputs/GroupCreateWithoutMessagesInput";
import { GroupUpdateWithoutMessagesInput } from "../inputs/GroupUpdateWithoutMessagesInput";
import { GroupUpsertWithoutMessagesInput } from "../inputs/GroupUpsertWithoutMessagesInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupUpdateOneRequiredWithoutMessagesInput {
  @TypeGraphQL.Field(_type => GroupCreateWithoutMessagesInput, {
    nullable: true
  })
  create?: GroupCreateWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => GroupCreateOrConnectWithoutmessagesInput, {
    nullable: true
  })
  connectOrCreate?: GroupCreateOrConnectWithoutmessagesInput | undefined;

  @TypeGraphQL.Field(_type => GroupUpsertWithoutMessagesInput, {
    nullable: true
  })
  upsert?: GroupUpsertWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: true
  })
  connect?: GroupWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => GroupUpdateWithoutMessagesInput, {
    nullable: true
  })
  update?: GroupUpdateWithoutMessagesInput | undefined;
}
