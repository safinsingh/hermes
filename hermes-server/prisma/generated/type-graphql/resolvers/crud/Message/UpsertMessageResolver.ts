import * as TypeGraphQL from "type-graphql";
import { UpsertMessageArgs } from "./args/UpsertMessageArgs";
import { Message } from "../../../models/Message";

@TypeGraphQL.Resolver(_of => Message)
export class UpsertMessageResolver {
  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: false
  })
  async upsertMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertMessageArgs): Promise<Message> {
    return ctx.prisma.message.upsert(args);
  }
}
