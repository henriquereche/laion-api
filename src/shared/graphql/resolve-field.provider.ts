import { GraphQLResolveInfo } from "graphql";

export class ResolveFieldProvider {

    /**
     * Obtêm a lista dos campos requisitados no contexto de execução do GraphQL.
     * @param info contexto de execução.
     */
    public static mapFields(info: GraphQLResolveInfo): Array<string> {

        const selections = (info.operation.selectionSet.selections[0] as any);

        return selections.selectionSet.selections.map(
            (field: any) => field.name.value as string
        );
    }

    /**
     * Verifica se o contexto de execução do GraphQL contêm o campo.
     * @param info contexto de execução.
     * @param field nome do campo.
     */
    public static containsField(
        info: GraphQLResolveInfo, 
        field: string
    ) : boolean {

        const fields = ResolveFieldProvider
            .mapFields(info)
            .map(field => field.toLowerCase());

        return fields.includes(field.toLowerCase());
    }
}