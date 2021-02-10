import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupAvgAggregate } from "../outputs/GroupAvgAggregate";
import { GroupCountAggregate } from "../outputs/GroupCountAggregate";
import { GroupMaxAggregate } from "../outputs/GroupMaxAggregate";
import { GroupMinAggregate } from "../outputs/GroupMinAggregate";
import { GroupSumAggregate } from "../outputs/GroupSumAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class AggregateGroup {
  @TypeGraphQL.Field(_type => GroupCountAggregate, {
    nullable: true
  })
  count!: GroupCountAggregate | null;

  @TypeGraphQL.Field(_type => GroupAvgAggregate, {
    nullable: true
  })
  avg!: GroupAvgAggregate | null;

  @TypeGraphQL.Field(_type => GroupSumAggregate, {
    nullable: true
  })
  sum!: GroupSumAggregate | null;

  @TypeGraphQL.Field(_type => GroupMinAggregate, {
    nullable: true
  })
  min!: GroupMinAggregate | null;

  @TypeGraphQL.Field(_type => GroupMaxAggregate, {
    nullable: true
  })
  max!: GroupMaxAggregate | null;
}
