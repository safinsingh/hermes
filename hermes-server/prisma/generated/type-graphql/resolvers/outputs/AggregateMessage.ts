import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageAvgAggregate } from "../outputs/MessageAvgAggregate";
import { MessageCountAggregate } from "../outputs/MessageCountAggregate";
import { MessageMaxAggregate } from "../outputs/MessageMaxAggregate";
import { MessageMinAggregate } from "../outputs/MessageMinAggregate";
import { MessageSumAggregate } from "../outputs/MessageSumAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class AggregateMessage {
  @TypeGraphQL.Field(_type => MessageCountAggregate, {
    nullable: true
  })
  count!: MessageCountAggregate | null;

  @TypeGraphQL.Field(_type => MessageAvgAggregate, {
    nullable: true
  })
  avg!: MessageAvgAggregate | null;

  @TypeGraphQL.Field(_type => MessageSumAggregate, {
    nullable: true
  })
  sum!: MessageSumAggregate | null;

  @TypeGraphQL.Field(_type => MessageMinAggregate, {
    nullable: true
  })
  min!: MessageMinAggregate | null;

  @TypeGraphQL.Field(_type => MessageMaxAggregate, {
    nullable: true
  })
  max!: MessageMaxAggregate | null;
}
