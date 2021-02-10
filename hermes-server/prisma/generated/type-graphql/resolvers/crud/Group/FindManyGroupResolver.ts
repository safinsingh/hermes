import * as TypeGraphQL from "type-graphql";
import { FindManyGroupArgs } from "./args/FindManyGroupArgs";
import { Group } from "../../../models/Group";

@TypeGraphQL.Resolver(_of => Group)
export class FindManyGroupResolver {
  @TypeGraphQL.Query(_returns => [Group], {
    nullable: false
  })
  async groups(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyGroupArgs): Promise<Group[]> {
    return ctx.prisma.group.findMany(args);
  }
}
