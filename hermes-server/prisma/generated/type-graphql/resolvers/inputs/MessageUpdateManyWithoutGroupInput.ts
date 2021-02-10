import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageCreateOrConnectWithoutgroupInput } from "../inputs/MessageCreateOrConnectWithoutgroupInput";
import { MessageCreateWithoutGroupInput } from "../inputs/MessageCreateWithoutGroupInput";
import { MessageScalarWhereInput } from "../inputs/MessageScalarWhereInput";
import { MessageUpdateManyWithWhereWithoutGroupInput } from "../inputs/MessageUpdateManyWithWhereWithoutGroupInput";
import { MessageUpdateWithWhereUniqueWithoutGroupInput } from "../inputs/MessageUpdateWithWhereUniqueWithoutGroupInput";
import { MessageUpsertWithWhereUniqueWithoutGroupInput } from "../inputs/MessageUpsertWithWhereUniqueWithoutGroupInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageUpdateManyWithoutGroupInput {
  @TypeGraphQL.Field(_type => [MessageCreateWithoutGroupInput], {
    nullable: true
  })
  create?: MessageCreateWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageCreateOrConnectWithoutgroupInput], {
    nullable: true
  })
  connectOrCreate?: MessageCreateOrConnectWithoutgroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpsertWithWhereUniqueWithoutGroupInput], {
    nullable: true
  })
  upsert?: MessageUpsertWithWhereUniqueWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  connect?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  set?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  disconnect?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  delete?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpdateWithWhereUniqueWithoutGroupInput], {
    nullable: true
  })
  update?: MessageUpdateWithWhereUniqueWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpdateManyWithWhereWithoutGroupInput], {
    nullable: true
  })
  updateMany?: MessageUpdateManyWithWhereWithoutGroupInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageScalarWhereInput], {
    nullable: true
  })
  deleteMany?: MessageScalarWhereInput[] | undefined;
}
