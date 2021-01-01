import { Injectable } from "@nestjs/common";
import { MD5 } from "object-hash";
import { Edital } from "src/shared/models/edital.model";
import { ItemLote } from "src/shared/models/item-lote.model";
import { Lote } from "src/shared/models/lote.model";

@Injectable()
export class ReceitaHashProvider {

    /**
     * Calcula o hash MD5 do lote.
     * @param lote lote a ser calculado.
     */
    public computeMD5Lote(lote: Lote): string {

        return MD5({
            editalId: lote.editalId.toHexString(),
            permitePessoaFisica: lote.permitePessoaFisica,
            orgao: lote.orgao.nome,
            numero: lote.numero,
            situacao: lote.situacao.descricao,
            tipo: lote.tipo.descricao,
            valorMinimo: lote.valorMinimo,
            itens: lote.itens.map(item => this.computeMD5ItemLote(item))
        });
    }

    /**
     * Calcula o hash MD5 do item lote.
     * @param itemLote item do lote a ser calculado.
     */
    public computeMD5ItemLote(itemLote: ItemLote) : string {

        return MD5({
            descricao: itemLote.descricao,
            quantidade: itemLote.quantidade,
            unidadeMedida: itemLote.unidadeMedida,
            unidadeArmazenadora: itemLote.unidadeArmazenadora.nome
        });
    }

    /**
     * Calcula o hash MD5 do edital.
     * @param edital edital a ser calculado.
     */
    public computeMD5Edital(edital: Edital) : string {

        return MD5({
            nome: edital.nome,
            codigo: edital.codigo,
            situacao: edital.situacao.descricao,
            permitePessoaFisica: edital.permitePessoaFisica,
            orgao: edital.orgao.nome,
            dataInicioPropostas: edital.dataInicioPropostas,
            dataTerminoPropostas: edital.dataTerminoPropostas,
            dataClassificacao: edital.dataClassificacao,
            contato: edital.codigo
        });
    }
}