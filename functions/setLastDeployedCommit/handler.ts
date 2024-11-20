import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { success } from '@libs/utils';
import { projectKeyAuthorizer } from '@libs/utils/http/projectKeyAuthorizer';

import { setLastDeployedCommitInputSchema } from './input.schema';

const setLastDeployedCommit: CustomAPIGatewayProxyHandler<
  typeof setLastDeployedCommitInputSchema,
  // @ts-expect-error types are wrong
  unknown
> = async ({
  body: { stackName, lastDeployedCommit },
  headers: { 'x-api-key': projectKey },
}: {
  body: {
    stackName: string;
    lastDeployedCommit: string;
  };
  headers: { 'x-api-key': string };
}) => {
  await projectKeyAuthorizer(projectKey);
  await Stack.update(
    { projectKey, stackName, lastDeployedCommit },
    { conditions: { attr: 'stackName', exists: true } },
  );

  return success({ message: `Last commit of stack ${stackName} updated` });
};

export const main = applyHttpMiddleware(setLastDeployedCommit, {
  inputSchema: setLastDeployedCommitInputSchema,
});
