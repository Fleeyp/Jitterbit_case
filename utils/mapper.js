function mapOrderRequest(data) {

    const orderId = data.numeroPedido.split("-")[0];

    return {
        orderId: orderId,
        value: data.valorTotal,
        creationDate: new Date(data.dataCriacao).toISOString(),
        items: data.items.map(item => ({
            productId: Number(item.idItem),
            quantity: item.quantidadeItem,
            price: item.valorItem
        }))
    };
}

export default {
    mapOrderRequest
};