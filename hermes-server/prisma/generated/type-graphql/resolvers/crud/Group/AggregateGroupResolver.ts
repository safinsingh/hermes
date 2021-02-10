import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateGroupArgs } from "./args/AggregateGroupArgs";
import { Group } from "../../../models/Group";
import { AggregateGroup } from "../../outputs/AggregateGroup";

@TypeGraphQL.Resolver(_of => Group)
export class AggregateGroupResolver {
  @TypeGraphQL.Query(_returns => AggregateGroup, {
    nullable: false
  })
  async aggregateGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateGroupArgs): Promise<AggregateGroup> {
    function transformFields(fields: Record<string, any>): Record<string, any> {
      return Object.fromEntries(
        Object.entries(fields)
          // remove __typename and others
          .filter(([key, value]) => !key.startsWith("__"))
          .map<[string, any]>(([key, value]) => {
            if (Object.keys(value).length === 0) {
              return [key, true];
            }
            return [key, transformFields(value)];
          }),
      );
    }

    return ctx.prisma.group.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
