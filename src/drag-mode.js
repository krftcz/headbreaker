const connector = require('./connector')

/**
 * @typedef {TryDisconnection|ForceDisconnection|ForceConnection} DragMode
 */

const TryDisconnection = {

  dragShouldDisconnect(piece, dx, dy) {
    return piece.horizontalConnector.openMovement(piece, dx) && piece.verticalConnector.openMovement(piece, dy);
  }
}

const ForceDisconnection = {

  dragShouldDisconnect(_piece, _dx, _dy) {
    return true;
  }
}

const ForceConnection = {

  dragShouldDisconnect(_piece, _dx, _dy) {
    return false;
  }
}

module.exports = {
  TryDisconnection,
  ForceDisconnection,
  ForceConnection,
}
