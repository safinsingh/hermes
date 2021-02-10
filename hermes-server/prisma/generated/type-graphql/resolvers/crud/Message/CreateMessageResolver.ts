import * as TypeGraphQL from "type-graphql";
import { CreateMessageArgs } from "./args/CreateMessageArgs";
import { Message } from "../../../models/Message";

@TypeGraphQL.Resolver(_of => Message)
export class CreateMessageResolver {
  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: false
  })
  async createMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateMessageArgs): Promise<Message> {
    return ctx.prisma.message.create(args);
  }
}
