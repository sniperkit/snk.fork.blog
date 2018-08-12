/*
Sniperkit-Bot
- Status: analyzed
*/

function identity(row, emit) {
    emit({ y: row.x });
}

bigquery.defineFunction(
    'identity',
    ['x'],
    [{ 'name': 'y', 'type': 'float' }],
    identity
);