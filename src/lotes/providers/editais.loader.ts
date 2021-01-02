import { Edital } from "src/shared/models/edital.model";
import { NestDataLoader } from 'nestjs-dataloader';
import { Injectable, Scope } from "@nestjs/common";
import { Model, Types } from 'mongoose';
import { EditalSchema } from 'src/shared/schemas/edital.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class EditaisLoader implements NestDataLoader<Types.ObjectId, Edital> {

    private readonly editalModel: Model<EditalSchema>;

    public constructor(@InjectModel(EditalSchema.name) editalModel: Model<EditalSchema>) {

        this.editalModel = editalModel;
    }

    /** Data loader para consulta de editais dos lotes. */
    public generateDataLoader(): DataLoader<Types.ObjectId, Edital, Types.ObjectId> {

        return new DataLoader<Types.ObjectId, Edital>(async keys => {

            // Consulta a lista de editais.
            const editais = await this.editalModel.find({ _id: { '$in': keys } });

            // Mapeia os resultados para cada chave.
            return keys.map(
                key => editais.find(
                    edital => edital._id.toString() == key.toHexString()
                )
            );
        });
    }
}