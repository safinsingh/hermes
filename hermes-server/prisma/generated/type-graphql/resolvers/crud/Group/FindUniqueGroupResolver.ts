import * as TypeGraphQL from "type-graphql";
import { FindUniqueGroupArgs } from "./args/FindUniqueGroupArgs";
import { Group } from "../../../models/Group";

@TypeGraphQL.Resolver(_of => Group)
export class FindUniqueGroupResolver {
  @TypeGraphQL.Query(_returns => Group, {
    nullable: true
  })
  async group(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueGroupArgs): Promise<Group | null> {
    return ctx.prisma.group.findUnique(args);
  }
}
