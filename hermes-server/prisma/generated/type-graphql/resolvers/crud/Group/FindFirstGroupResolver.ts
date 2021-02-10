import * as TypeGraphQL from "type-graphql";
import { FindFirstGroupArgs } from "./args/FindFirstGroupArgs";
import { Group } from "../../../models/Group";

@TypeGraphQL.Resolver(_of => Group)
export class FindFirstGroupResolver {
  @TypeGraphQL.Query(_returns => Group, {
    nullable: true
  })
  async findFirstGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstGroupArgs): Promise<Group | null> {
    return ctx.prisma.group.findFirst(args);
  }
}
