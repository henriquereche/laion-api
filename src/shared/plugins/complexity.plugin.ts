import { GraphQLSchemaHost, Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';
import environmentProvider from '../configuration/environment.provider';
import { REQUEST_MAX_COMPLEXITY } from '../constants/environments';

const MAXIMUM_COMPLEXITY = environmentProvider
  .getValue(REQUEST_MAX_COMPLEXITY, false) || 150;

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  requestDidStart(): GraphQLRequestListener {
    const { schema } = this.gqlSchemaHost;

    return {
      didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        if (complexity > Number(MAXIMUM_COMPLEXITY)) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${MAXIMUM_COMPLEXITY}`,
          );
        }
      },
    };
  }
}