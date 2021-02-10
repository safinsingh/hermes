import * as TypeGraphQL from "type-graphql";
import { UpdateManyGroupArgs } from "./args/UpdateManyGroupArgs";
import { Group } from "../../../models/Group";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";

@TypeGraphQL.Resolver(_of => Group)
export class UpdateManyGroupResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyGroupArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.group.updateMany(args);
  }
}
