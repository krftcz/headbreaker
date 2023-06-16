const canvasWidth = 1140;
const canvasHeight = 650;
const pieceWidth = 65;
const pieceHeight = 65;
const gap = 5;

const horizontalPiecesCount = 10;
const verticalPiecesCount = 5;

const shuffler = (pieces) => {
    //pieces = pieces.sort(() => Math.random() - 0.5);

    const piecesPerRow = Math.floor((canvasWidth + gap) / (pieceWidth + gap));
    const piecesPerColumn = Math.floor((canvasHeight + gap) / (pieceHeight + gap));

    const offsetX = (canvasWidth - (piecesPerRow * (pieceWidth + gap) - gap)) + 20;
    const offsetY = (canvasHeight - (piecesPerColumn * (pieceHeight + gap) - gap)) + 20;

    let x = offsetX;
    let y = offsetY;

    const sortedPieces = [];

    for (let i = 0; i < 50; i++) {
        const piece = {x, y};
        sortedPieces.push(piece);

        if ((x + pieceWidth + gap) <= canvasWidth && y <= offsetY) {
            x += pieceWidth + gap;
        } else if (x >= (canvasWidth - pieceWidth) && (y + pieceHeight + gap) <= (canvasHeight - offsetY)) {
            y += pieceHeight + gap;
        } else if ((x - pieceWidth - gap) >= offsetX && y >= (canvasHeight - pieceHeight - offsetY)) {
            x -= pieceWidth + gap;
        } else if (x <= offsetX && (y - pieceHeight - gap) >= offsetY) {
            y -= pieceHeight + gap;
        }
    }
    sortedPieces[46] = {x: 115, y: 115};
    sortedPieces[47] = {x: 1025, y: 115};
    sortedPieces[48] = {x: 1025, y: 535};
    sortedPieces[49] = {x: 115, y: 535};

    return sortedPieces;
};

const image = new Image();
image.src = 'static/japan.jpg';

image.onload = () => {
    const canvas = new headbreaker.Canvas('puzzle', {
        width: canvasWidth,
        height: canvasHeight,
        image,
        preventOffstageDrag: true,
        fixed: true,
        painter: new headbreaker.painters.Konva(),
        outline: new headbreaker.outline.Rounded()
    });

    canvas.adjustImagesToPuzzleHeight();

    canvas.autogenerate({
        horizontalPiecesCount,
        verticalPiecesCount
    });
    // canvas._puzzle.dragMode = DisconnectInvalid;
    canvas.puzzle.dragMode = headbreaker.dragMode.ForceConnection;
    canvas._puzzle.dragMode = headbreaker.dragMode.ForceConnection;


    canvas.onConnect((_piece, figure, _target, targetFigure) => {
        figure.shape.stroke('#349e49');
        figure.shape.strokeWidth(10);
        targetFigure.shape.stroke('#349e49');
        targetFigure.shape.strokeWidth(10);
        canvas.redraw();

        setTimeout(() => {
            // restore border colors
            // later
            figure.shape.stroke('black');
            targetFigure.shape.stroke('black');
            figure.shape.strokeWidth(1);
            targetFigure.shape.strokeWidth(1);
            canvas.redraw();
        }, 500);
    });

    canvas.puzzle.shuffleWith(shuffler);

    canvas.draw();

    canvas.attachSolvedValidator();

    canvas.onValid(() => {
        console.log('done');
    });
};
