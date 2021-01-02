import { Injectable, Scope } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { NestDataLoader } from 'nestjs-dataloader';
import { Lote } from 'src/shared/models/lote.model';
import { InjectModel } from '@nestjs/mongoose';
import { LoteSchema } from 'src/shared/schemas/lote.schema';
import { BaseFilter } from 'src/shared/models/abstractions/base-filter.model';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class LotesLoader implements NestDataLoader<Types.ObjectId, Lote[]> {

    private readonly loteModel: Model<LoteSchema>;

    public constructor(@InjectModel(LoteSchema.name) loteModel: Model<LoteSchema>) {
        
        this.loteModel = loteModel;
    }

    /** Data loader para consulta dos lotes dos editais. */
    public generateDataLoader(): DataLoader<Types.ObjectId, Lote[], Types.ObjectId> {

        return new DataLoader<Types.ObjectId, Lote[]>(async keys => {

            const lotes = await this.loteModel.aggregate<Lote>([

                // Filtra e agrupa os editals.
                { '$match': { "editalId" : { '$in': keys } } },
                { '$group': { _id: "$editalId", data: { "$addToSet": "$$ROOT" } }  },

                // Obtêm a quantidade padrão de paginação de lotes por edital
                //  e quebra o agrupamento dos lotes.
                { '$project': { data: { '$slice': ["$data", BaseFilter.DEFAULT_LIMIT] } } },
                { '$unwind': '$data' },
                { '$replaceWith': '$data' }
            ])

            // Mapeia os resultados para cada chave.
            return keys.map(
                key => lotes.filter(
                    lote => lote.editalId.toHexString() == key.toHexString()
                )
            );
        });
    }
}