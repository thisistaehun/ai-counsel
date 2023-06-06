import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator =
  createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  });

export const httpCurrentUser: (
  ...dataOrPipes: unknown[]
) => ParameterDecorator = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user;
  },
);
