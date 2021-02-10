import * as TypeGraphQL from "type-graphql";
import { FindManyMessageArgs } from "./args/FindManyMessageArgs";
import { Message } from "../../../models/Message";

@TypeGraphQL.Resolver(_of => Message)
export class FindManyMessageResolver {
  @TypeGraphQL.Query(_returns => [Message], {
    nullable: false
  })
  async messages(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyMessageArgs): Promise<Message[]> {
    return ctx.prisma.message.findMany(args);
  }
}
