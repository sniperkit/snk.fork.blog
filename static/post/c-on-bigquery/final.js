/*
Sniperkit-Bot
- Status: analyzed
*/

function sum(row, emit) {
    const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
    const env = {
        'abortStackOverflow': _ => { throw new Error('overflow'); },
        'table': new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
        'tableBase': 0,
        'memory': memory,
        'memoryBase': 1024,
        'STACKTOP': 0,
        'STACK_MAX': memory.buffer.byteLength,
    };
    const imports = { env };

    const bytes = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 139, 128, 128, 128, 0, 2, 96, 1, 127, 0, 96, 2, 127, 127, 1, 127, 2, 254, 128, 128, 128, 0, 7, 3, 101, 110, 118, 8, 83, 84, 65, 67, 75, 84, 79, 80, 3, 127, 0, 3, 101, 110, 118, 9, 83, 84, 65, 67, 75, 95, 77, 65, 88, 3, 127, 0, 3, 101, 110, 118, 18, 97, 98, 111, 114, 116, 83, 116, 97, 99, 107, 79, 118, 101, 114, 102, 108, 111, 119, 0, 0, 3, 101, 110, 118, 6, 109, 101, 109, 111, 114, 121, 2, 1, 128, 2, 128, 2, 3, 101, 110, 118, 5, 116, 97, 98, 108, 101, 1, 112, 1, 0, 0, 3, 101, 110, 118, 10, 109, 101, 109, 111, 114, 121, 66, 97, 115, 101, 3, 127, 0, 3, 101, 110, 118, 9, 116, 97, 98, 108, 101, 66, 97, 115, 101, 3, 127, 0, 3, 130, 128, 128, 128, 0, 1, 1, 6, 147, 128, 128, 128, 0, 3, 127, 1, 35, 0, 11, 127, 1, 35, 1, 11, 125, 1, 67, 0, 0, 0, 0, 11, 7, 136, 128, 128, 128, 0, 1, 4, 95, 115, 117, 109, 0, 1, 9, 129, 128, 128, 128, 0, 0, 10, 196, 128, 128, 128, 0, 1, 190, 128, 128, 128, 0, 1, 7, 127, 2, 64, 35, 4, 33, 8, 35, 4, 65, 16, 106, 36, 4, 35, 4, 35, 5, 78, 4, 64, 65, 16, 16, 0, 11, 32, 0, 33, 2, 32, 1, 33, 3, 32, 2, 33, 4, 32, 3, 33, 5, 32, 4, 32, 5, 106, 33, 6, 32, 8, 36, 4, 32, 6, 15, 0, 11, 0, 11]);

    WebAssembly.instantiate(bytes, imports).then(wa => {
        const exports = wa.instance.exports;
        const sum = exports._sum;
        emit({ s: sum(row.x, row.y) });
    });
}

bigquery.defineFunction(
    'sum',
    ['x', 'y'],
    [{ 'name': 's', 'type': 'integer' }],
    sum
);