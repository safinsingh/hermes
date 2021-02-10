import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateMessageArgs } from "./args/AggregateMessageArgs";
import { CreateMessageArgs } from "./args/CreateMessageArgs";
import { DeleteManyMessageArgs } from "./args/DeleteManyMessageArgs";
import { DeleteMessageArgs } from "./args/DeleteMessageArgs";
import { FindFirstMessageArgs } from "./args/FindFirstMessageArgs";
import { FindManyMessageArgs } from "./args/FindManyMessageArgs";
import { FindUniqueMessageArgs } from "./args/FindUniqueMessageArgs";
import { UpdateManyMessageArgs } from "./args/UpdateManyMessageArgs";
import { UpdateMessageArgs } from "./args/UpdateMessageArgs";
import { UpsertMessageArgs } from "./args/UpsertMessageArgs";
import { Message } from "../../../models/Message";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateMessage } from "../../outputs/AggregateMessage";

@TypeGraphQL.Resolver(_of => Message)
export class MessageCrudResolver {
  @TypeGraphQL.Query(_returns => Message, {
    nullable: true
  })
  async message(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueMessageArgs): Promise<Message | null> {
    return ctx.prisma.message.findUnique(args);
  }

  @TypeGraphQL.Query(_returns => Message, {
    nullable: true
  })
  async findFirstMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstMessageArgs): Promise<Message | null> {
    return ctx.prisma.message.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Message], {
    nullable: false
  })
  async messages(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyMessageArgs): Promise<Message[]> {
    return ctx.prisma.message.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: false
  })
  async createMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateMessageArgs): Promise<Message> {
    return ctx.prisma.message.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: true
  })
  async deleteMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteMessageArgs): Promise<Message | null> {
    return ctx.prisma.message.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: true
  })
  async updateMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateMessageArgs): Promise<Message | null> {
    return ctx.prisma.message.update(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyMessageArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.message.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyMessageArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.message.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: false
  })
  async upsertMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertMessageArgs): Promise<Message> {
    return ctx.prisma.message.upsert(args);
  }

  @TypeGraphQL.Query(_returns => AggregateMessage, {
    nullable: false
  })
  async aggregateMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateMessageArgs): Promise<AggregateMessage> {
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

    return ctx.prisma.message.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
