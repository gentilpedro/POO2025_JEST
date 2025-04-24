// src/produto.test.ts

import { Produto } from "../src/Produto";

describe('Classe Produto', () => {
    let produto: Produto;

    beforeEach(() => {
        produto = new Produto('Camiseta', 25.99, 50);
    });

    describe('Produto', () => {

        test.todo('o nome do produto deve possuir pelo menos 3 caracteres na sua criação através do construtor');
        test.todo('o preço do produto deve ser maior que zero na sua criação através do construtor');
        test.todo('o estoque do produto deve ser maior ou igual a zero na sua criação através do construtor');
        test.todo('o preço promocional deve ser nulo na sua criação através do construtor');

        test('deve criar um produto com nome, preço e estoque corretos', () => {
            expect(produto.nome).toBe('Camiseta');
            expect(produto.preco).toBe(25.99);
            expect(produto.estoque).toBe(50);
        });
    }

    )

    describe('método definirPrecoPromocional', () => {
        test('deve definir o preço promocional se for menor que o preço original e não negativo', () => {
            produto.definirPrecoPromocional(20.00);
            expect(produto.precoPromocional).toBe(20.00);
        });

        test('não deve definir o preço promocional se for maior ou igual ao preço original', () => {
            produto.definirPrecoPromocional(30.00);
            expect(produto.precoPromocional).toBeNull();

            produto.definirPrecoPromocional(25.99);
            expect(produto.precoPromocional).toBeNull();
        });
        test('não deve definir o preço promocional se for negativo', () => {
            produto.definirPrecoPromocional(-10.00);
            expect(produto.precoPromocional).toBeNull();
        });
    });

    describe('método obterPrecoFinal', () => {
        beforeEach(() => {
            produto.preco = 29.99; // Define um preço original para os testes
        });

        test('deve retornar o preço promocional se estiver definido', () => {
            produto.definirPrecoPromocional(19.99);
            expect(produto.obterPrecoFinal()).toBe(19.99);
        });

        test('deve retornar o preço original se o preço promocional não estiver definido', () => {
            expect(produto.obterPrecoFinal()).toBe(29.99);
        });
    });


    describe('método vender', () => {
        test('deve realizar a venda e atualizar o estoque corretamente', () => {
            // Montar cenário
            produto.estoque = 10;

            // Executar método
            produto.vender(3);

            // Realizar asserção correta
            expect(produto.estoque).toBe(7);
        });
    });

    test('deve retornar "Quantidade inválida." se a quantidade vendida for zero ou negativa', () => {
        produto.estoque = 50;

        const mensagemZero = produto.vender(0);
        const mensagemNegativa = produto.vender(-5);

        expect(produto.estoque).toBe(50); // estoque deve continuar o mesmo
        expect(mensagemZero).toBe('Quantidade inválida.');
        expect(mensagemNegativa).toBe('Quantidade inválida.');
    });

    test('deve retornar "Quantidade inválida." se a quantidade adicionada for negativa', () => {
        produto.estoque = 50;

        const mensagem = produto.adicionarEstoque(-10);

        expect(produto.estoque).toBe(50); // o estoque não deve mudar
        expect(mensagem).toBe('Quantidade inválida.');
    });
});